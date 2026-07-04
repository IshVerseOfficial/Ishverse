/**
 * Module: Contact
 * Context: See DESIGN.md §10 — single calm contact band. Localized (Phase 4).
 *
 * Exports:
 *   Contact — server component
 */

import { useTranslations } from "next-intl";
import { Section } from "../ui/section";
import { Reveal } from "../reveal";
import { siteConfig } from "@/lib/site";

export function Contact() {
  const t = useTranslations("company.contact");

  return (
    <Section id="contact" className="pb-24 md:pb-32">
      <Reveal>
        <div className="rounded-2xl border border-divider bg-glass-bg p-8 text-center backdrop-blur md:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-secondary">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{t("heading")}</h2>
          <p className="mt-3 text-base text-fg-secondary">{t("body")}</p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-fg px-5 py-3 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
