/**
 * Module: Philosophy
 * Context: See DESIGN.md §2 + §10 — the story band. "Dark is the stage":
 * force-scoped `.dark` so it reads as points of light in darkness in both
 * themes. Localized (Phase 4) — rich text tags render the bold/blue/gold
 * spans per locale.
 *
 * Exports:
 *   Philosophy — server component (NeuralField is a client canvas island)
 */

import { useTranslations } from "next-intl";
import { Section } from "../ui/section";
import { NeuralField } from "../neural-field";
import { Reveal } from "../reveal";

export function Philosophy() {
  const t = useTranslations("company.philosophy");

  const rich = {
    b: (chunks: React.ReactNode) => <span className="font-semibold text-fg">{chunks}</span>,
    blue: (chunks: React.ReactNode) => <span className="text-accent">{chunks}</span>,
    gold: (chunks: React.ReactNode) => <span className="text-gold">{chunks}</span>,
  };

  return (
    <div id="story" className="dark relative overflow-hidden bg-bg text-fg">
      <NeuralField />
      <Section className="relative py-24 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">{t("heading")}</h2>
        </Reveal>
        <Reveal delay={60}>
          <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-fg-secondary md:text-lg">
            <p>{t.rich("p1", rich)}</p>
            <p>{t.rich("p2", rich)}</p>
            <p>{t("p3")}</p>
            <p className="text-fg">{t.rich("p4", rich)}</p>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
