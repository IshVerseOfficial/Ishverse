/**
 * Module: Hero
 * Context: See DESIGN.md §10 — hero blueprint: copy beside the VerseGlobe;
 * on mobile the globe sits below the copy. Localized (Phase 4).
 *
 * Everything here is above the fold, so every Reveal runs in `immediate`
 * mode — the scroll-observer variant server-renders at opacity-0, which made
 * the h1 an LCP candidate that could not paint until the bundle had hydrated.
 *
 * Headline and sub-headline have their own message keys rather than reusing
 * `company.meta.*`: the SEO title and the on-page headline get edited for
 * different reasons and should not be forced to be the same string.
 *
 * The product buttons are built from `siteConfig.products` rather than
 * indexing [0] and [1] with a hard-coded "live" label, so adding a product or
 * flipping one back to `soon` needs no edit here.
 *
 * Exports:
 *   Hero — server component (VerseGlobe is a client canvas island)
 */

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Section } from "../ui/section";
import { VerseGlobe } from "../verse-globe";
import { Reveal } from "../reveal";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const t = useTranslations("company");

  const [flagship, ...rest] = siteConfig.products;

  return (
    <div className="relative overflow-hidden">
      <Section className="grid min-h-[88svh] items-center gap-10 py-20 md:grid-cols-2 md:gap-6">
        <div>
          <Reveal immediate>
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
              {siteConfig.name}
            </p>
          </Reveal>
          <Reveal immediate delay={60}>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
              {t("hero.headline")}
            </h1>
          </Reveal>
          <Reveal immediate delay={120}>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-fg-secondary md:text-lg">
              {t("hero.sub")}
            </p>
          </Reveal>
          <Reveal immediate delay={180}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={flagship.href}
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[14px] font-medium text-accent-on transition-colors hover:bg-accent-dark"
              >
                {t("hero.explore", { name: flagship.name })}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              {rest.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-divider bg-glass-bg px-5 py-3 text-[14px] text-fg-secondary transition-colors hover:text-fg"
                >
                  {p.name}
                  <span className="text-gold-text">
                    · {p.status === "live" ? t("hero.live") : t("hero.comingSoon")}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative h-[320px] sm:h-[420px] md:h-[560px]" aria-hidden="true">
          <VerseGlobe />
        </div>
      </Section>
    </div>
  );
}
