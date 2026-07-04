/**
 * Module: GospelHero
 * Context: Ported from ishgospel-web — "Discipline builds depth." Localized
 * (Phase 4).
 *
 * Top of the funnel: value proposition + primary CTA over the NeuralField,
 * with the real Home screenshot (theme-matched) beside the copy on desktop.
 *
 * Exports:
 *   GospelHero — server component
 */

import { useTranslations } from "next-intl";
import { ArrowRight, Languages, ShieldCheck, Smartphone, WifiOff } from "lucide-react";
import { NeuralField } from "../../neural-field";
import { PhoneFrame } from "../phone-frame";
import { gospelConfig } from "@/lib/gospel";

export function GospelHero() {
  const t = useTranslations("gospel.hero");

  const trust = [
    { icon: Languages, label: t("trustLanguages") },
    { icon: WifiOff, label: t("trustOffline") },
    { icon: ShieldCheck, label: t("trustNoGamification") },
  ];

  return (
    <section className="relative overflow-hidden border-b border-divider">
      <NeuralField />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-[12px] font-medium text-accent-text">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            {t("badge")}
          </span>

          <h1 className="mx-auto mt-6 max-w-[10ch] text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:mx-0">
            {t("title")}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-fg-secondary sm:text-[17px] lg:mx-0">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href={gospelConfig.store.appStore}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-sm font-medium text-accent-on transition-opacity hover:opacity-90 sm:w-auto"
            >
              <Smartphone className="h-4 w-4" aria-hidden />
              {t("download")}
            </a>
            <a
              href="#waitlist"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-divider px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-glass-bg sm:w-auto"
            >
              {t("waitlist")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-fg-secondary lg:justify-start">
            {trust.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5">
                <item.icon className="h-3.5 w-3.5" aria-hidden />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <div className="relative">
            <div aria-hidden className="absolute -inset-10 rounded-full bg-accent/15 blur-3xl" />
            <PhoneFrame
              src="/gospel/home-light.png"
              alt={t("homeAlt")}
              eager
              className="relative dark:hidden"
            />
            <PhoneFrame
              src="/gospel/home-dark.png"
              alt={t("homeAlt")}
              eager
              className="relative hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
