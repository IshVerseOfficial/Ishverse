/**
 * Module: GospelShowcase
 * Context: "Inside the app": real screenshots paired with the features they
 * prove, in alternating split rows. Localized (Phase 4).
 *
 * Exports:
 *   GospelShowcase — server component (Reveal is a client island)
 */

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";
import { PhoneFrame } from "../phone-frame";

const ROWS = [
  { key: "bible", img: "/gospel/bible.png" },
  { key: "journal", img: "/gospel/journal.png" },
  { key: "vision", img: "/gospel/vision.png" },
] as const;

export function GospelShowcase() {
  const t = useTranslations("gospel.showcase");

  return (
    <Section id="showcase" className="py-16 sm:py-24">
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

      <div className="mt-14 space-y-20 sm:space-y-28">
        {ROWS.map((row, i) => (
          <div key={row.key} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="text-[13px] font-medium uppercase tracking-wide text-gold-text">
                {t(`${row.key}.eyebrow`)}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl">
                {t(`${row.key}.title`)}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-secondary">
                {t(`${row.key}.body`)}
              </p>
              <ul className="mt-6 space-y-2.5">
                {([1, 2, 3] as const).map((n) => (
                  <li key={n} className="flex items-center gap-2.5 text-[14px] text-fg">
                    <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {t(`${row.key}.p${n}`)}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={60} className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <PhoneFrame src={row.img} alt={t(`${row.key}.alt`)} />
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
