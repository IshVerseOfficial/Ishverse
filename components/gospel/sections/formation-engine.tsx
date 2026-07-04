/**
 * Module: GospelFormationEngine
 * Context: Ported from ishgospel-web — "This is a formation engine", voice
 * "System > Sentiment". Localized (Phase 4).
 *
 * Exports:
 *   GospelFormationEngine — server component
 */

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

export function GospelFormationEngine() {
  const t = useTranslations("gospel.formationEngine");

  const contrasts = [
    { not: t("not1"), but: t("but1") },
    { not: t("not2"), but: t("but2") },
    { not: t("not3"), but: t("but3") },
  ];

  return (
    <Section className="py-16 sm:py-24">
      <div className="grid items-center gap-12 rounded-3xl border border-divider bg-surface p-8 sm:p-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-secondary">{t("body")}</p>
        </Reveal>

        <Reveal delay={60}>
          <ul className="space-y-3">
            {contrasts.map((c) => (
              <li key={c.but} className="rounded-2xl border border-divider bg-bg p-4">
                <p className="flex items-center gap-2 text-[13px] text-fg-secondary line-through decoration-fg-secondary/40">
                  <X className="h-4 w-4 shrink-0 text-error" aria-hidden />
                  {c.not}
                </p>
                <p className="mt-2 flex items-center gap-2 text-[14px] font-medium text-fg">
                  <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
                  {c.but}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
