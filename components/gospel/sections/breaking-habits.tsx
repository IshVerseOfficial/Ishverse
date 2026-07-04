/**
 * Module: GospelBreakingHabits
 * Context: Ported from ishgospel-web — Breaking Habits feature spotlight with
 * the real habit screenshot. Localized (Phase 4).
 *
 * Exports:
 *   GospelBreakingHabits — server component
 */

import { useTranslations } from "next-intl";
import { BookMarked, HeartHandshake, Shield, ShieldBan } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { PhoneFrame } from "../phone-frame";

const ICONS = [BookMarked, ShieldBan, HeartHandshake] as const;

export function GospelBreakingHabits() {
  const t = useTranslations("gospel.breakingHabits");

  const points = ICONS.map((icon, i) => ({
    icon,
    title: t(`p${i + 1}Title`),
    desc: t(`p${i + 1}Desc`),
  }));

  return (
    <Section id="features" className="py-16 sm:py-24">
      <div className="grid items-center gap-12 rounded-3xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-12 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-[12px] font-medium text-accent-text">
            <Shield className="h-3.5 w-3.5" aria-hidden />
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-secondary">{t("body")}</p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li
                key={p.title}
                className="flex items-start gap-4 rounded-2xl border border-divider bg-bg p-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[14px] font-medium text-fg">{p.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-fg-secondary">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={60} className="flex justify-center">
          <PhoneFrame src="/gospel/habit.png" alt={t("habitAlt")} />
        </Reveal>
      </div>
    </Section>
  );
}
