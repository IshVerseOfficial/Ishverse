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
 * Exports:
 *   Reveal — client wrapper div
 */

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
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
  }, []);

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
