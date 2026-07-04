/**
 * Module: GospelPillars
 * Context: Ported from ishgospel-web — core pillars: Bible · Community ·
 * Formation · Vision. Localized (Phase 4).
 *
 * Exports:
 *   GospelPillars — server component
 */

import { useTranslations } from "next-intl";
import { Activity, BookOpen, Target, Users } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

export function GospelPillars() {
  const t = useTranslations("gospel.pillars");

  const pillars = [
    { icon: BookOpen, accent: "accent", title: t("bibleTitle"), desc: t("bibleDesc") },
    { icon: Users, accent: "accent", title: t("communityTitle"), desc: t("communityDesc") },
    { icon: Activity, accent: "gold", title: t("formationTitle"), desc: t("formationDesc") },
    { icon: Target, accent: "gold", title: t("visionTitle"), desc: t("visionDesc") },
  ];

  return (
    <Section id="pillars" className="py-16 sm:py-24">
      <Reveal>
        <div className="max-w-xl">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-5 transition-colors hover:border-fg/20">
              <p.icon
                className={p.accent === "gold" ? "h-5 w-5 text-gold" : "h-5 w-5 text-accent"}
                aria-hidden
              />
              <p className="mt-3 text-[15px] font-medium text-fg">{p.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-secondary">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
