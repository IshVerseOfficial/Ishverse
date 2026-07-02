/**
 * Module: Ecosystem
 * Context: See DESIGN.md §10 — products section: one card per product.
 *
 * Exports:
 *   Ecosystem — server component
 */

import { Section } from "../ui/section";
import { Reveal } from "../reveal";
import { ProductCard } from "../product-card";
import { siteConfig } from "@/lib/site";

export function Ecosystem() {
  return (
    <Section id="products" className="py-24 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">Products</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold md:text-5xl">
          One system per domain of life.
        </h2>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-fg-secondary">
          Same philosophy. Same design rigor. Different domains.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {siteConfig.products.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
