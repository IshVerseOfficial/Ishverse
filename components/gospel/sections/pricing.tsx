/**
 * Module: GospelPricing
 * Context: See implementation_plan.md Phase 7 — pricing that mirrors the
 * mobile app's paywall (SubscriptionPlansScreen): Personal $4.99, Family
 * $9.99, Church Lite $49, Church Pro $199 per month. Keep the two in sync —
 * if the app paywall changes, change this. Localized (Phase 4); prices are
 * not translated.
 *
 * Exports:
 *   GospelPricing — server component
 */

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { siteConfig } from "@/lib/site";

const INDIVIDUAL = [
  { key: "free", price: "$0", features: 4, highlighted: false, foreverPeriod: true },
  { key: "personal", price: "$4.99", features: 4, highlighted: true, foreverPeriod: false },
  { key: "family", price: "$9.99", features: 4, highlighted: false, foreverPeriod: false },
] as const;

const CHURCH = [
  { key: "lite", price: "$49", features: 5 },
  { key: "pro", price: "$199", features: 5 },
] as const;

export function GospelPricing() {
  const t = useTranslations("gospel.pricing");

  return (
    <Section id="pricing" className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("sub")}</p>
        </div>
      </Reveal>

      {/* Individuals */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {INDIVIDUAL.map((plan, i) => (
          <Reveal key={plan.key} delay={i * 60} className="h-full">
            <div
              className={`flex h-full flex-col rounded-3xl p-6 sm:p-8 ${
                plan.highlighted
                  ? "border-2 border-accent bg-surface"
                  : "border border-divider bg-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold text-fg">{t(`${plan.key}.name`)}</p>
                {plan.highlighted && (
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-on">
                    {t("mostPopular")}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[13px] text-fg-secondary">{t(`${plan.key}.desc`)}</p>
              <p className="mt-5">
                <span className="text-4xl font-bold tracking-tight text-fg">{plan.price}</span>
                <span className="ml-1.5 text-[13px] text-fg-secondary">
                  {plan.foreverPeriod ? t("forever") : t("perMonth")}
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {Array.from({ length: plan.features }, (_, n) => (
                  <li key={n} className="flex items-start gap-2.5 text-[14px] text-fg">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {t(`${plan.key}.f${n + 1}`)}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`mt-8 inline-flex items-center justify-center rounded-[10px] px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${
                  plan.highlighted
                    ? "bg-accent text-accent-on"
                    : "border border-divider bg-bg text-fg"
                }`}
              >
                {t("getApp")}
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Churches */}
      <Reveal delay={120}>
        <div className="mt-12 rounded-3xl border border-accent/25 bg-accent/[0.06] p-6 sm:p-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
              {t("churchesEyebrow")}
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              {t("churchesHeading")}
            </h3>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {CHURCH.map((plan) => (
              <div
                key={plan.key}
                className="flex flex-col rounded-2xl border border-divider bg-bg p-6"
              >
                <p className="text-[15px] font-semibold text-fg">{t(`${plan.key}.name`)}</p>
                <p className="mt-1 text-[13px] text-fg-secondary">{t(`${plan.key}.desc`)}</p>
                <p className="mt-4">
                  <span className="text-3xl font-bold tracking-tight text-fg">{plan.price}</span>
                  <span className="ml-1.5 text-[13px] text-fg-secondary">{t("perMonth")}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {Array.from({ length: plan.features }, (_, n) => (
                    <li key={n} className="flex items-start gap-2.5 text-[14px] text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {t(`${plan.key}.f${n + 1}`)}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`${t(`${plan.key}.name`)} — IshGospel`)}`}
                  className="mt-6 inline-flex items-center justify-center rounded-[10px] border border-divider bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-glass-bg"
                >
                  {t("talkToUs")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
