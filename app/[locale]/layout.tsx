/**
 * Module: Locale Root Layout
 * Context: See DESIGN.md §3–§4 + implementation_plan.md Phase 4 — Inter,
 * two-theme system, en/es/fr/pt localization.
 *
 * Root layout for every localized route. Validates the locale, enables static
 * rendering (setRequestLocale), loads Inter + theme Providers, and provides
 * messages to client components via NextIntlClientProvider. `generateMetadata`
 * localizes title/description and emits hreflang alternates for SEO.
 *
 * Exports:
 *   generateStaticParams — pre-render all locales
 *   generateMetadata     — localized SEO metadata + hreflang
 *   default              — LocaleLayout
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { Providers } from "../providers";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company.meta" });
  const title = `${siteConfig.name} — ${t("title")}`;

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? "/" : `/${l}`]),
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s — ${siteConfig.name}` },
    description: t("description"),
    applicationName: siteConfig.name,
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      title,
      description: t("description"),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale,
    },
    twitter: { card: "summary_large_image", title, description: t("description") },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-fg">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
