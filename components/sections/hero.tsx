/**
 * Module: Hero
 * Context: See DESIGN.md §10 — hero blueprint: copy beside the VerseGlobe;
 * on mobile the globe sits below the copy. Localized (Phase 4).
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

  return (
    <div className="relative overflow-hidden">
      <Section className="grid min-h-[88svh] items-center gap-10 py-20 md:grid-cols-2 md:gap-6">
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
              {siteConfig.name}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
              {t("meta.title")}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-fg-secondary md:text-lg">
              {t("meta.description")}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.products[0].href}
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-[14px] font-medium text-accent-on transition-colors hover:bg-accent-dark"
              >
                {t("nav.explore")}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={siteConfig.products[1].href}
                className="inline-flex items-center gap-2 rounded-[10px] border border-divider bg-glass-bg px-5 py-3 text-[14px] text-fg-secondary transition-colors hover:text-fg"
              >
                {t("hero.rize")} <span className="text-gold-text">· {t("hero.live")}</span>
              </a>
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
