/**
 * Module: RizePricing
 * Context: See IshRize-Master-Build-Specification Stage 16 — three-tier
 * pricing (Free / Pro / Enterprise). Follows the gospel pricing component
 * pattern. Localized.
 *
 * Exports:
 *   RizePricing — server component
 */

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { rizeConfig } from "@/lib/rize";

const PLANS = [
  { key: "free", price: "$0", features: 4, highlighted: false, foreverPeriod: true },
  { key: "pro", price: "$29", features: 6, highlighted: true, foreverPeriod: false },
  {
    key: "enterprise",
    price: "Custom",
    features: 6,
    highlighted: false,
    foreverPeriod: false,
    isEnterprise: true,
  },
] as const;

export function RizePricing() {
  const t = useTranslations("rize.pricing");

  return (
    <Section id="pricing" className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("sub")}</p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLANS.map((plan, i) => (
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
                {"isEnterprise" in plan && plan.isEnterprise ? null : (
                  <span className="ml-1.5 text-[13px] text-fg-secondary">
                    {plan.foreverPeriod ? t("forever") : t("perMonth")}
                  </span>
                )}
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
                href={
                  "isEnterprise" in plan && plan.isEnterprise
                    ? `mailto:${rizeConfig.contact}?subject=${encodeURIComponent("IshRize Enterprise")}`
                    : plan.highlighted
                      ? rizeConfig.app.web
                      : rizeConfig.app.web
                }
                className={`mt-8 inline-flex items-center justify-center rounded-[10px] px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${
                  plan.highlighted
                    ? "bg-accent text-accent-on"
                    : "border border-divider bg-bg text-fg"
                }`}
              >
                {"isEnterprise" in plan && plan.isEnterprise ? t("talkToUs") : t("getStarted")}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
