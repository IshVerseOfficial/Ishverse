/**
 * Module: RizeAttendance
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — attendance is built
 * on top of the timetable: sessions tie to scheduled slots, QR check-in,
 * role-based access, analytics. Localized.
 *
 * Exports:
 *   RizeAttendance — server component
 */

import { useTranslations } from "next-intl";
import { QrCode, UserCheck, BarChart3 } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const ICONS = [QrCode, UserCheck, BarChart3] as const;

export function RizeAttendance() {
  const t = useTranslations("rize.attendance");

  const points = ICONS.map((icon, i) => ({
    icon,
    title: t(`point${i + 1}Title`),
    desc: t(`point${i + 1}Desc`),
  }));

  return (
    <Section className="py-16 sm:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="max-w-xl">
            <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {t("heading")}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("intro")}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-fg-secondary">{t("surfaces")}</p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="flex gap-4 rounded-2xl border border-divider bg-surface p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[15px] font-medium text-fg">{p.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-fg-secondary">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
