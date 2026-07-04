/**
 * Module: GospelFaq
 * Context: See implementation_plan.md Phase 8 — native <details>/<summary>
 * accordion (no JS), with FAQPage JSON-LD for rich search results. Localized
 * (Phase 4) — the JSON-LD is built from the active locale's strings.
 *
 * Exports:
 *   GospelFaq — server component
 */

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { siteConfig } from "@/lib/site";

const COUNT = 6;

export function GospelFaq() {
  const t = useTranslations("gospel.faq");
  const faqs = Array.from({ length: COUNT }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq" className="py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <Reveal delay={60}>
        <div className="mx-auto mt-10 max-w-2xl divide-y divide-divider rounded-2xl border border-divider bg-surface px-6">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-fg [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-fg-secondary transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-secondary">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-8 text-center text-[13px] text-fg-secondary">
          {t("more")}{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent">
            {siteConfig.supportEmail}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
