/**
 * Module: NeuralField
 * Context: See DESIGN.md §5 — motif reuse (ported as-is from ishgospel-web).
 *
 * Animated background: a drifting neural particle network over a faint moving
 * grid, plus a soft accent glow. Colours are read from CSS variables
 * (--field-grid / --field-line / --field-node / --field-glow) so it adapts to
 * light/dark automatically; a MutationObserver re-reads them on theme change.
 *
 * Performance + a11y:
 *   - particle count scales with width (lighter on phones)
 *   - DPR capped at 2; canvas resizes via ResizeObserver
 *   - pauses the RAF loop when scrolled off-screen (IntersectionObserver)
 *   - honours prefers-reduced-motion (renders one static frame, no loop)
 *
 * Exports:
 *   NeuralField — absolutely-positioned client canvas; place inside a relative parent
 */

"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; vx: number; vy: number; gold: boolean };

export function NeuralField({ className = "" }: { className?: string }) {
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
    let pts: Pt[] = [];
    let raf = 0;
    let running = true;
    let t = 0;

    const colors = { grid: "", line: "", node: "", glow: "", gold: "#a68a4c" };
    const readColors = () => {
      const s = getComputedStyle(canvas);
      colors.grid = s.getPropertyValue("--field-grid").trim() || "rgba(0,0,0,0.05)";
      colors.line = s.getPropertyValue("--field-line").trim() || "rgba(0,82,255,0.3)";
      colors.node = s.getPropertyValue("--field-node").trim() || "rgba(0,82,255,0.55)";
      colors.glow = s.getPropertyValue("--field-glow").trim() || "rgba(0,82,255,0.08)";
      colors.gold = s.getPropertyValue("--gold").trim() || "#a68a4c";
    };

    const seed = () => {
      const count = Math.max(24, Math.min(70, Math.round(w / 18)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        gold: Math.random() < 0.18,
      }));
    };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(
        w / 2,
        h * 0.32,
        0,
        w / 2,
        h * 0.32,
        Math.max(w, h) * 0.6,
      );
      glow.addColorStop(0, colors.glow);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const off = (t * 0.16) % 44;
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.grid;
      for (let gx = off; gx < w; gx += 44) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = off; gy < h; gy += 44) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.globalAlpha = 1 - d / 130;
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.gold ? 2.1 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? colors.gold : colors.node;
        ctx.fill();
      }
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
