/**
 * Module: ProductCard
 * Context: See DESIGN.md §8 — one product: name, domain, one-liner, status
 * badge, CTA link. Strings arrive pre-localized from the Ecosystem section
 * (Phase 4). Corner ornament is a static mini-constellation (§5 motif reuse).
 *
 * Exports:
 *   LocalizedProduct — the shape the card renders
 *   ProductCard      — server component for one ecosystem product
 */

import { ArrowUpRight } from "lucide-react";

export type LocalizedProduct = {
  name: string;
  wordmark: { strong: string; light: string };
  domain: string;
  oneLiner: string;
  href: string;
  status: "live" | "soon";
  labels: { visit: string; live: string; soon: string };
};

function Constellation() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      aria-hidden="true"
      className="absolute right-5 top-5 opacity-60"
    >
      <g stroke="var(--field-line)" strokeWidth="0.8">
        <line x1="10" y1="40" x2="28" y2="12" />
        <line x1="28" y1="12" x2="46" y2="34" />
        <line x1="10" y1="40" x2="34" y2="44" />
        <line x1="28" y1="12" x2="34" y2="44" />
      </g>
      <circle cx="10" cy="40" r="2" fill="var(--field-node)" />
      <circle cx="28" cy="12" r="2" fill="var(--field-node)" />
      <circle cx="46" cy="34" r="2" fill="var(--field-node)" />
      <circle cx="34" cy="44" r="2.4" fill="var(--gold)" />
    </svg>
  );
}

export function ProductCard({ product }: { product: LocalizedProduct }) {
  const live = product.status === "live";

  return (
    <article className="relative overflow-hidden rounded-2xl border border-divider bg-surface p-6 md:p-8">
      <Constellation />
      <p className="text-[13px] font-medium text-fg-secondary">{product.domain}</p>
      <h3 className="mt-2 text-xl font-semibold">
        {product.wordmark.strong}
        <span className="font-normal text-fg-secondary">{product.wordmark.light}</span>
      </h3>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-fg-secondary">
        {product.oneLiner}
      </p>
      <div className="mt-6 flex items-center gap-4">
        {live ? (
          <>
            <a
              href={product.href}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors hover:text-accent-dark"
            >
              {product.labels.visit}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <span className="rounded-full border border-divider px-3 py-1 text-[12px] text-fg-secondary">
              {product.labels.live}
            </span>
          </>
        ) : (
          <span className="rounded-full border border-divider px-3 py-1 text-[12px] text-gold-text">
            {product.labels.soon}
          </span>
        )}
      </div>
    </article>
  );
}
