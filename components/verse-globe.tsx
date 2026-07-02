/**
 * Module: VerseGlobe
 * Context: See DESIGN.md §5 — the signature motif. The system is blue, the
 * man is gold.
 *
 * A rotating wireframe world: points on a Fibonacci sphere connected to their
 * nearest 3D neighbors (adjacency computed once — the wireframe is stable while
 * the sphere turns, ~1 rev/60s). Simple perspective projection; far-hemisphere
 * points fade, which alone reads as 3D. In front, a minimal gold line-art
 * figure — drawn in the same canvas — with faint threads to the nearest front
 * nodes: the world turns, the man is still.
 *
 * Performance + a11y (same contract as NeuralField):
 *   - point count scales with width (lighter on phones)
 *   - DPR capped at 2; canvas resizes via ResizeObserver
 *   - pauses the RAF loop when scrolled off-screen (IntersectionObserver)
 *   - honours prefers-reduced-motion (renders one static frame, no loop)
 *   - colors re-read from CSS variables on theme change (MutationObserver)
 *
 * Exports:
 *   VerseGlobe — absolutely-positioned client canvas; place inside a relative parent
 */

"use client";

import { useEffect, useRef } from "react";

type P3 = { x: number; y: number; z: number; gold: boolean };
type Projected = { sx: number; sy: number; a: number; s: number; z: number; gold: boolean };

const TILT = -0.4; // radians, baked into base coordinates at seed time
const FOCAL = 3; // perspective focal length, in sphere-radius units

export function VerseGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let t = reduced ? 480 : 0; // static frame shows a pleasing angle
    let pts: P3[] = [];
    let edges: Array<[number, number]> = [];

    const colors = { line: "", node: "", glow: "", gold: "#a68a4c" };
    const readColors = () => {
      const s = getComputedStyle(canvas);
      colors.line = s.getPropertyValue("--field-line").trim() || "rgba(0,82,255,0.3)";
      colors.node = s.getPropertyValue("--field-node").trim() || "rgba(0,82,255,0.55)";
      colors.glow = s.getPropertyValue("--field-glow").trim() || "rgba(0,82,255,0.08)";
      colors.gold = s.getPropertyValue("--gold").trim() || "#a68a4c";
    };

    const seed = () => {
      const count = w < 420 ? 120 : 220;
      const golden = Math.PI * (3 - Math.sqrt(5));
      const ct = Math.cos(TILT);
      const st = Math.sin(TILT);

      pts = Array.from({ length: count }, (_, i) => {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const th = golden * i;
        const x = Math.cos(th) * r;
        const z = Math.sin(th) * r;
        // Bake the axis tilt (X rotation) so the per-frame spin is Y-only.
        return { x, y: y * ct - z * st, z: y * st + z * ct, gold: Math.random() < 0.18 };
      });

      // Stable wireframe: connect each point to its 3 nearest 3D neighbors,
      // computed once — O(n²) at seed, cheap per frame.
      edges = [];
      const seen = new Set<number>();
      for (let i = 0; i < pts.length; i++) {
        const near: Array<{ j: number; d: number }> = [];
        for (let j = 0; j < pts.length; j++) {
          if (i === j) continue;
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          near.push({ j, d: dx * dx + dy * dy + dz * dz });
        }
        near.sort((a, b) => a.d - b.d);
        for (let k = 0; k < 3; k++) {
          const j = near[k].j;
          const key = i < j ? i * pts.length + j : j * pts.length + i;
          if (!seen.has(key)) {
            seen.add(key);
            edges.push([i, j]);
          }
        }
      }
    };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawMan = (proj: Projected[], cx: number, cy: number, R: number) => {
      const feetY = cy + R * 1.06;
      const H = R * 0.34;
      const headR = H * 0.14;
      const shoulderY = feetY - H * 0.68;
      const hipY = feetY - H * 0.34;
      const handX = cx + H * 0.32;
      const handY = shoulderY - H * 0.42;

      // Threads first (behind the figure): hand to the 3 nearest front nodes.
      const front = proj
        .filter((p) => p.z > 0.15 && p.sy < shoulderY)
        .map((p) => ({ p, d: (p.sx - handX) ** 2 + (p.sy - handY) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = colors.gold;
      for (const { p } of front) {
        ctx.globalAlpha = 0.22;
        ctx.beginPath();
        ctx.moveTo(handX, handY);
        ctx.lineTo(p.sx, p.sy);
        ctx.stroke();
      }

      // Minimal line-art figure: head + torso + limbs. Abstract geometry,
      // no face, no detail (DESIGN.md §5).
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = colors.gold;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(cx, feetY - H + headR, headR, 0, Math.PI * 2); // head
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, feetY - H + headR * 2 + 1); // torso
      ctx.lineTo(cx, hipY);
      ctx.moveTo(cx, hipY); // legs
      ctx.lineTo(cx - H * 0.14, feetY);
      ctx.moveTo(cx, hipY);
      ctx.lineTo(cx + H * 0.14, feetY);
      ctx.moveTo(cx, shoulderY); // arm, at rest
      ctx.lineTo(cx - H * 0.24, hipY - H * 0.04);
      ctx.moveTo(cx, shoulderY); // arm, raised toward the world
      ctx.lineTo(handX, handY);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h * 0.46;

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      glow.addColorStop(0, colors.glow);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const A = t * 0.0018; // ~1 revolution per minute at 60fps
      const cosA = Math.cos(A);
      const sinA = Math.sin(A);

      const proj: Projected[] = pts.map((p) => {
        const x = p.x * cosA + p.z * sinA;
        const z = -p.x * sinA + p.z * cosA;
        const s = FOCAL / (FOCAL - z);
        return {
          sx: cx + x * R * s,
          sy: cy + p.y * R * s,
          a: 0.18 + (0.82 * (z + 1)) / 2,
          s,
          z,
          gold: p.gold,
        };
      });

      ctx.lineWidth = 0.6;
      ctx.strokeStyle = colors.line;
      for (const [i, j] of edges) {
        const a = proj[i];
        const b = proj[j];
        ctx.globalAlpha = Math.min(a.a, b.a) * 0.7;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      for (const p of proj) {
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, (p.gold ? 2.1 : 1.5) * p.s, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? colors.gold : colors.node;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      drawMan(proj, cx, cy, R);
    };

    const loop = () => {
      if (!running) return;
      t += 1;
      draw();
      raf = requestAnimationFrame(loop);
    };

    readColors();
    resize();
    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      readColors();
      resize();
      if (reduced) draw();
    });
    ro.observe(parent);

    const mo = new MutationObserver(() => {
      readColors();
      if (reduced) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) raf = requestAnimationFrame(loop);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );
    io.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
