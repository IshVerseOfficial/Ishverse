/**
 * Module: RizeSiteFooter
 * Context: See ish-rize-docs/ishrize-landing-prompt.md — mirrors
 * GospelSiteFooter: ecosystem family footer with legal links pointing at the
 * company-wide pages on ishverse.com (the middleware 308s rize/* legal paths
 * there anyway). Localized.
 *
 * Exports:
 *   RizeSiteFooter — server component
 */

import { useTranslations } from "next-intl";
import { RizeLogo } from "./logo";
import { rizeConfig } from "@/lib/rize";
import { siteConfig } from "@/lib/site";

export function RizeSiteFooter() {
  const t = useTranslations("rize");

  const groups = [
    {
      title: t("footer.groupProduct"),
      links: [
        { label: t("nav.features"), href: "#features" },
        { label: t("nav.howItWorks"), href: "#how-it-works" },
        {
          label: t("nav.requestDemo"),
          href: `mailto:${rizeConfig.contact}?subject=IshRize%20Demo`,
        },
        { label: t("nav.signIn"), href: rizeConfig.app.web },
      ],
    },
    {
      title: t("footer.groupCompany"),
      links: [
        { label: "IshVerse", href: "https://ishverse.com" },
        { label: t("footer.linkPrivacy"), href: "https://ishverse.com/privacy" },
        { label: t("footer.linkTerms"), href: "https://ishverse.com/terms" },
        { label: t("footer.linkSupport"), href: `mailto:${siteConfig.supportEmail}` },
      ],
    },
  ];

  return (
    <footer className="border-t border-divider">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <RizeLogo />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-fg-secondary">
            {t("meta.tagline")}
          </p>
          <p className="mt-2 text-[12px] text-fg-secondary">{t("hero.badge")}</p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-[13px] font-medium text-fg">{g.title}</p>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-divider">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[12px] text-fg-secondary sm:px-8">
          © {new Date().getFullYear()} IshVerse. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
