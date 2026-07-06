/**
 * Module: RizeHowItWorks
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — "From import to live
 * in three steps": Import → Edit → Run. Localized.
 *
 * Exports:
 *   RizeHowItWorks — server component
 */

import { useTranslations } from "next-intl";
import { FileUp, MousePointerClick, QrCode } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const ICONS = [FileUp, MousePointerClick, QrCode] as const;

export function RizeHowItWorks() {
  const t = useTranslations("rize.howItWorks");

  const steps = ICONS.map((icon, i) => ({
    icon,
    title: t(`step${i + 1}Title`),
    desc: t(`step${i + 1}Desc`),
  }));

  return (
    <Section id="how-it-works" className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-2xl font-bold text-divider">{i + 1}</span>
              </div>
              <p className="mt-4 text-[16px] font-medium text-fg">{s.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-secondary">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
