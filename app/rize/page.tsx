/**
 * Module: IshRize Coming Soon Page
 * Context: See DESIGN.md §10 + implementation_plan.md Phase 3 — one calm
 * screen at rize.ishverse.com (via middleware subdomain rewrite).
 *
 * Exports:
 *   metadata — page SEO metadata
 *   default  — RizeComingSoon
 */

import type { Metadata } from "next";
import { NeuralField } from "@/components/neural-field";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "IshRize — Coming soon",
  description: "A structured system for academic discipline. Part of the Ish ecosystem.",
  alternates: { canonical: "https://rize.ishverse.com" },
  robots: { index: false },
};

export default function RizeComingSoon() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <NeuralField />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
          {siteConfig.name}
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
          ISH<span className="font-normal text-fg-secondary">RIZE</span>
        </h1>
        <p className="mt-2 text-sm font-medium text-gold-text">Coming soon</p>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-fg-secondary">
          A structured system for academic discipline. Same philosophy as IshGospel. Same design
          rigor. A different domain.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=IshRize%20waitlist`}
            className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[14px] font-medium text-accent-on transition-colors hover:bg-accent-dark"
          >
            Notify me
          </a>
          <a
            href="https://ishverse.com"
            className="inline-flex items-center gap-2 rounded-[10px] border border-divider bg-glass-bg px-5 py-3 text-[14px] text-fg-secondary transition-colors hover:text-fg"
          >
            Meet IshVerse
          </a>
        </div>
      </div>
    </main>
  );
}
