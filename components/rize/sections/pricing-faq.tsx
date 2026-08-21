/**
 * Module: RizePricingFaq
 * Context: See IshRize-Master-Build-Specification Stage 16 — FAQ accordion
 * below the pricing cards. Pure CSS disclosure via <details>.
 *
 * Exports:
 *   RizePricingFaq — server component
 */

import { useTranslations } from "next-intl";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const QUESTIONS = [1, 2, 3, 4] as const;

export function RizePricingFaq() {
  const t = useTranslations("rize.pricing.faq");

  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <h2 className="text-center text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          {t("heading")}
        </h2>
      </Reveal>
      <div className="mx-auto mt-10 max-w-2xl divide-y divide-divider">
        {QUESTIONS.map((n, i) => (
          <Reveal key={n} delay={i * 40}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium text-fg [&::-webkit-details-marker]:hidden">
                {t(`q${n}`)}
                <span className="ml-4 shrink-0 text-fg-secondary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-secondary">{t(`a${n}`)}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
