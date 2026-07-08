/**
 * Module: RizeAudiences
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — one card per role:
 * Registrar/Academic Affairs, Department Coordinator, Lecturer. Localized.
 *
 * Exports:
 *   RizeAudiences — server component
 */

import { useTranslations } from "next-intl";
import { Landmark, FolderKanban, GraduationCap, Check } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

const ROLES = [
  { icon: Landmark, key: "registrar" },
  { icon: FolderKanban, key: "coordinator" },
  { icon: GraduationCap, key: "lecturer" },
] as const;

export function RizeAudiences() {
  const t = useTranslations("rize.audiences");

  return (
    <Section id="audiences" className="py-16 sm:py-24">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("heading")}
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {ROLES.map((role, i) => (
          <Reveal key={role.key} delay={i * 60} className="h-full">
            <div className="h-full rounded-2xl border border-divider bg-surface p-6">
              <role.icon className="h-5 w-5 text-accent" aria-hidden />
              <p className="mt-3 text-[16px] font-medium text-fg">{t(`${role.key}Title`)}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-secondary">
                {t(`${role.key}Lead`)}
              </p>
              <ul className="mt-4 space-y-2">
                {[1, 2, 3].map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-fg-secondary"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
                    {t(`${role.key}Point${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
