/**
 * Module: RizeEngine
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — the technical
 * depth beat, aimed at the buyer who asks "what is actually underneath this".
 * Localized.
 *
 * The four blocks are the engines that ship today (ingestion, clash,
 * availability, realtime — see ish-rize-backend/src/engines/). The roadmap
 * strip below them is explicitly labelled as in development, because the
 * scheduling solver is still a dormant seam
 * (ish-rize-web/IMPLEMENTATION_PLAN.md §7) — nothing above the strip may
 * claim a capability the backend does not have.
 *
 * Exports:
 *   RizeEngine — server component
 */

import { useTranslations } from "next-intl";
import { FileScan, GitBranch, Radar, Radio, Sparkles } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const ENGINE_ICONS = [FileScan, GitBranch, Radar, Radio] as const;

export function RizeEngine() {
  const t = useTranslations("rize.engine");

  const engines = ENGINE_ICONS.map((icon, i) => ({
    icon,
    name: t(`engine${i + 1}Name`),
    title: t(`engine${i + 1}Title`),
    desc: t(`engine${i + 1}Desc`),
  }));

  const next = [1, 2, 3].map((n) => ({
    title: t(`next${n}Title`),
    desc: t(`next${n}Desc`),
  }));

  return (
    <Section id="engine" className="py-16 sm:py-24">
      <Reveal>
        <div className="max-w-xl">
          <p className="text-[13px] font-medium uppercase tracking-wide text-accent-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">{t("intro")}</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {engines.map((e, i) => (
          <Reveal key={e.name} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <e.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-fg-secondary">
                  {e.name}
                </span>
              </div>
              <p className="mt-4 text-[16px] font-medium text-fg">{e.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-secondary">{e.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Roadmap — visually quieter than the shipped engines above, and
          labelled, so a reader can never mistake it for current capability. */}
      <Reveal delay={120}>
        <div className="mt-4 rounded-2xl border border-dashed border-divider p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold-text">
              <Sparkles className="h-3 w-3" aria-hidden />
              {t("nextBadge")}
            </span>
            <p className="text-[16px] font-medium text-fg">{t("nextHeading")}</p>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-fg-secondary">
            {t("nextIntro")}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {next.map((n) => (
              <div key={n.title} className="border-t border-divider pt-4">
                <p className="text-[14px] font-medium text-fg">{n.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-fg-secondary">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
