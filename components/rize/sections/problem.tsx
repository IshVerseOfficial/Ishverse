/**
 * Module: RizeProblem
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — the spreadsheet
 * status quo, written from the registrar/coordinator's point of view. Calm,
 * not alarming. Localized.
 *
 * Exports:
 *   RizeProblem — server component
 */

import { useTranslations } from "next-intl";
import { FileSpreadsheet, PhoneCall, ScanSearch, ClipboardX } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const ICONS = [FileSpreadsheet, ScanSearch, ClipboardX, PhoneCall] as const;

export function RizeProblem() {
  const t = useTranslations("rize.problem");

  const pains = ICONS.map((icon, i) => ({
    icon,
    title: t(`pain${i + 1}Title`),
    desc: t(`pain${i + 1}Desc`),
  }));

  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <div className="max-w-xl">
          <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {pains.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-5">
              <p.icon className="h-5 w-5 text-fg-secondary" aria-hidden />
              <p className="mt-3 text-[15px] font-medium text-fg">{p.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-secondary">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
