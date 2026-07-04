/**
 * Module: Ecosystem
 * Context: See DESIGN.md §10 — products section: one card per product.
 * Localized (Phase 4): builds the card strings from the message catalog.
 *
 * Exports:
 *   Ecosystem — server component
 */

import { useTranslations } from "next-intl";
import { Section } from "../ui/section";
import { Reveal } from "../reveal";
import { ProductCard, type LocalizedProduct } from "../product-card";
import { siteConfig } from "@/lib/site";

export function Ecosystem() {
  const t = useTranslations("company.products");

  const products: LocalizedProduct[] = siteConfig.products.map((p) => ({
    name: p.name,
    wordmark: p.wordmark,
    href: p.href,
    status: p.status,
    domain: p.name === "IshGospel" ? t("gospelDomain") : t("rizeDomain"),
    oneLiner: p.name === "IshGospel" ? t("gospelLine") : t("rizeLine"),
    labels: {
      visit: t("visit", { name: p.name }),
      live: t("live"),
      soon: t("soon"),
    },
  }));

  return (
    <Section id="products" className="py-24 md:py-32">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold md:text-5xl">{t("heading")}</h2>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-fg-secondary">{t("sub")}</p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
