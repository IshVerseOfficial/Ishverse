/**
 * Module: RizeFeatures
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — the scheduling
 * intelligence deep-dive: import, live editing, clash detection, free space
 * finder, Coordinator Hub. Localized.
 *
 * Exports:
 *   RizeFeatures — server component
 */

import { useTranslations } from "next-intl";
import { FileScan, Radio, TriangleAlert, DoorOpen, Users } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const ICONS = [FileScan, Radio, TriangleAlert, DoorOpen, Users] as const;

export function RizeFeatures() {
  const t = useTranslations("rize.features");

  const features = ICONS.map((icon, i) => ({
    icon,
    title: t(`item${i + 1}Title`),
    desc: t(`item${i + 1}Desc`),
  }));

  return (
    <Section id="features" className="py-16 sm:py-24">
      <Reveal>
        <div className="max-w-xl">
          <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("intro")}</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-6 transition-colors hover:border-fg/20">
              <f.icon className="h-5 w-5 text-gold" aria-hidden />
              <p className="mt-3 text-[15px] font-medium text-fg">{f.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-secondary">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
