/**
 * Module: GospelTestimonial
 * Context: Ported from ishgospel-web — one strong, named testimonial.
 * Localized (Phase 4). NOTE: placeholder attribution — swap for a real,
 * consented quote before promoting the page.
 *
 * Exports:
 *   GospelTestimonial — server component
 */

import { useTranslations } from "next-intl";
import { Section } from "../../ui/section";
import { Reveal } from "../../reveal";

export function GospelTestimonial() {
  const t = useTranslations("gospel.testimonial");
  const name = t("name");
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Section className="py-16 sm:py-24">
      <Reveal>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-fg sm:text-3xl">
            &ldquo;{t("quote")}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-[13px] font-medium text-accent">
              {initials}
            </span>
            <span className="text-left">
              <span className="block text-[14px] font-medium text-fg">{name}</span>
              <span className="block text-[13px] text-fg-secondary">{t("role")}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
