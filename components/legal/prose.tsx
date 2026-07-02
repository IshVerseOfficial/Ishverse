/**
 * Module: LegalProse
 * Context: See DESIGN.md §10 — legal pages: max-w-prose, generous line
 * height, H2 anchors, "Last updated" date.
 *
 * Typographic primitives for /privacy and /terms. Tailwind v4 has no
 * typography plugin here, so prose styling is explicit components instead
 * of descendant selectors.
 *
 * Exports:
 *   LegalPage — full page shell (header, titled prose column, footer)
 *   H2, H3    — anchored section headings
 *   P, UL     — body paragraph and list
 */

import type { ReactNode } from "react";
import { SiteHeader } from "../site-header";
import { SiteFooter } from "../site-footer";
import { Section } from "../ui/section";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <Section className="py-16 md:py-24">
          <div className="mx-auto max-w-prose">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-fg-secondary">Last updated: {updated}</p>
            <div className="mt-10">{children}</div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-24 text-2xl font-semibold">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-lg font-semibold">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-base leading-relaxed text-fg-secondary">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-fg-secondary">
      {children}
    </ul>
  );
}
