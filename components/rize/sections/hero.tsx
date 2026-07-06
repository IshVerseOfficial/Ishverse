/**
 * Module: RizeHero
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — "One timetable.
 * Every department. No clashes." over the NeuralField. Localized.
 *
 * Top of the funnel: value proposition + demo CTA. Unlike gospel (mobile
 * installs), the primary conversion is a demo request from a registrar or
 * coordinator; the dashboard link serves people who already have an account.
 *
 * Exports:
 *   RizeHero — server component
 */

import { useTranslations } from "next-intl";
import { ArrowRight, CalendarCheck2, Mail, RadioTower, ShieldCheck } from "lucide-react";
import { NeuralField } from "../../neural-field";
import { rizeConfig } from "@/lib/rize";

export function RizeHero() {
  const t = useTranslations("rize.hero");

  const trust = [
    { icon: CalendarCheck2, label: t("trustImport") },
    { icon: RadioTower, label: t("trustRealtime") },
    { icon: ShieldCheck, label: t("trustReview") },
  ];

  return (
    <section className="relative overflow-hidden border-b border-divider">
      <NeuralField />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-16 text-center sm:px-8 sm:pb-28 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[12px] font-medium text-accent-text">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          {t("badge")}
        </span>

        <p className="mt-8 text-2xl font-bold tracking-[0.2px] text-fg">
          {rizeConfig.wordmark.strong}
          <span className="font-light text-fg-secondary">{rizeConfig.wordmark.light}</span>
        </p>

        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl">
          {t("headline")}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-secondary sm:text-[17px]">
          {t("subheadline")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${rizeConfig.contact}?subject=IshRize%20Demo`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-sm font-medium text-accent-on transition-colors hover:bg-accent-dark sm:w-auto"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {t("ctaDemo")}
          </a>
          <a
            href={rizeConfig.app.web}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-divider px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-glass-bg sm:w-auto"
          >
            {t("ctaDashboard")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-fg-secondary">
          {trust.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              <item.icon className="h-3.5 w-3.5" aria-hidden />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
