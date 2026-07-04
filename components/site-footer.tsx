/**
 * Module: SiteFooter
 * Context: See DESIGN.md §10 — footer: products, legal, contact. Localized
 * (Phase 4).
 *
 * Exports:
 *   SiteFooter — server component
 */

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("company");

  return (
    <footer className="border-t border-divider">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-fg-secondary">
            {t("meta.title")}
          </p>
        </div>

        <div>
          <p className="text-[13px] font-medium text-fg">{t("footer.products")}</p>
          <ul className="mt-3 space-y-2">
            {siteConfig.products.map((p) =>
              p.status === "live" ? (
                <li key={p.name}>
                  <a
                    href={p.href}
                    className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
                  >
                    {p.name}
                  </a>
                </li>
              ) : (
                <li key={p.name} className="text-[13px] text-fg-secondary">
                  {p.name} <span className="text-gold-text">· {t("footer.soon")}</span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-medium text-fg">{t("footer.company")}</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                {t("footer.contact")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                {t("footer.support")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-medium text-fg">{t("footer.legal")}</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-[13px] text-fg-secondary transition-colors hover:text-fg"
              >
                {t("footer.terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-divider">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[12px] text-fg-secondary sm:px-8">
          © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
