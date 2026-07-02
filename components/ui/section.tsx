/**
 * Module: Section
 * Context: See DESIGN.md §7 — layout & spacing (ported from ishgospel-web).
 *
 * Thin layout primitive: centers content at the site max width with the
 * standard horizontal padding. Optional `id` for anchor links.
 *
 * Exports:
 *   Section — wrapper element
 */

import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}
