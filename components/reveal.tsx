/**
 * Module: Reveal
 * Context: See DESIGN.md §6 — the one shared scroll-reveal, no per-section
 * one-offs.
 *
 * Wraps children in the standard entrance: opacity 0→1 + translateY 16px→0,
 * 500ms, cubic-bezier(0.16,1,0.3,1). `delay` staggers siblings (60ms steps).
 * prefers-reduced-motion is handled entirely in CSS (`motion-reduce:`
 * variants force the element visible with no transition) — a static
 * fallback, not a slower animation.
 *
 * `immediate` is for content that is already in the viewport on load (the
 * hero). The scroll variant server-renders at opacity-0 and only becomes
 * visible once the bundle has downloaded, hydrated and the observer has
 * fired — which makes an above-the-fold heading an LCP candidate gated on
 * JavaScript. `immediate` instead paints at full opacity and animates
 * transform only, via CSS, so first paint is complete and LCP is unaffected.
 * Use it for anything above the fold; use the default everywhere else.
 *
 * Exports:
 *   Reveal — client wrapper div
 */

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  // Painted opaque from the server; only the transform animates, so this
  // never delays the first contentful paint of whatever it wraps.
  if (immediate) {
    return (
      <div
        style={{ animationDelay: `${delay}ms` }}
        className={`animate-[reveal-rise_500ms_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
