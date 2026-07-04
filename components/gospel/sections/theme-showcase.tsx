/**
 * Module: GospelThemeShowcase
 * Context: "pure black ↔ pure white, no intermediate" — shows both themes at
 * once using the real Home screenshots. Localized (Phase 4).
 *
 * Exports:
 *   GospelThemeShowcase — server component
 */

import { useTranslations } from "next-intl";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { PhoneFrame } from "../phone-frame";

export function GospelThemeShowcase() {
  const t = useTranslations("gospel.themeShowcase");

  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("body")}</p>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div className="mt-12 flex flex-wrap items-start justify-center gap-8 sm:gap-14">
          <figure className="text-center">
            <PhoneFrame src="/gospel/home-light.png" alt={t("lightAlt")} />
            <figcaption className="mt-4 text-[13px] text-fg-secondary">{t("light")}</figcaption>
          </figure>
          <figure className="text-center">
            <PhoneFrame src="/gospel/home-dark.png" alt={t("darkAlt")} />
            <figcaption className="mt-4 text-[13px] text-fg-secondary">{t("dark")}</figcaption>
          </figure>
        </div>
      </Reveal>
    </Section>
  );
}
