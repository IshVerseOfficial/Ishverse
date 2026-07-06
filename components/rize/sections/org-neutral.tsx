/**
 * Module: RizeOrgNeutral
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — the architecture
 * pitch: org-neutral by configuration, multi-organization built in. A short
 * trust signal for larger buyers, not a feature demo. Localized.
 *
 * Exports:
 *   RizeOrgNeutral — server component
 */

import { useTranslations } from "next-intl";
import { Blocks, UsersRound } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

export function RizeOrgNeutral() {
  const t = useTranslations("rize.orgNeutral");

  const points = [
    { icon: Blocks, title: t("configTitle"), desc: t("configDesc") },
    { icon: UsersRound, title: t("multiOrgTitle"), desc: t("multiOrgDesc") },
  ];

  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <div className="rounded-3xl border border-divider bg-surface px-6 py-12 sm:px-12">
          <div className="max-w-xl">
            <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {t("heading")}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title} className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[15px] font-medium text-fg">{p.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-fg-secondary">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
