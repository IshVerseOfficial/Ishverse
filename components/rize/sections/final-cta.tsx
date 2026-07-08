/**
 * Module: RizeFinalCta
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — "Your institution
 * doesn't have to run on spreadsheets." Demo request is the conversion; the
 * IshVerse link anchors the ecosystem. Localized.
 *
 * Exports:
 *   RizeFinalCta — server component
 */

import { useTranslations } from "next-intl";
import { ArrowRight, Mail } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { rizeConfig } from "@/lib/rize";

export function RizeFinalCta() {
  const t = useTranslations("rize.finalCta");

  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-divider bg-surface px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-fg-secondary">
            {t("body")}
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
              href="https://ishverse.com"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-divider px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-glass-bg sm:w-auto"
            >
              {t("ctaIshverse")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
