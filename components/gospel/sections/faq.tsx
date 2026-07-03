/**
 * Module: GospelFaq
 * Context: See implementation_plan.md Phase 8 — conversion polish. Native
 * <details>/<summary> accordion (no JS), with FAQPage JSON-LD for rich
 * search results. Answers must stay honest — no invented claims.
 *
 * Exports:
 *   GospelFaq — server component
 */

import { ChevronDown } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { siteConfig } from "@/lib/site";

const FAQS = [
  {
    q: "Is IshGospel free?",
    a: "Yes. The daily work — Bible reading, highlights and plans, journaling, prayer, and formation tracking — is free. Premium plans add unlimited communities and tools for families and churches.",
  },
  {
    q: "What platforms is it on?",
    a: "Android first, with iOS to follow. Join the waitlist and we'll tell you the moment it's live in your store.",
  },
  {
    q: "Are my journals and prayers private?",
    a: "Yes. Journals and prayer logs are visible only to your account. Your content is never used for advertising and never sold — see our privacy policy.",
  },
  {
    q: "What is the formation score?",
    a: "A quiet 0–100 reflection of your consistency across Bible, journal, and prayer. It measures depth, not points — there are no badges or leaderboards.",
  },
  {
    q: "How do subscriptions work?",
    a: "Premium is purchased inside the app through your store's billing (Google Play or the App Store) and can be cancelled there any time.",
  },
  {
    q: "Can my church or small group use it?",
    a: "Yes. Church Lite and Church Pro add an admin dashboard, leader tools, and member progress tracking. Write to contact@ishverse.com and we'll set you up.",
  },
] as const;

export function GospelFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
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
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Questions, answered.
          </h2>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div className="mx-auto mt-10 max-w-2xl divide-y divide-divider rounded-2xl border border-divider bg-surface px-6">
          {FAQS.map((f) => (
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
          Something else?{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent">
            {siteConfig.supportEmail}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
