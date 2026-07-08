/**
 * Module: IshRize Landing Page
 * Context: See middleware.ts — served at rize.ishverse.com via subdomain
 * rewrite. Full product landing page (replaces the Phase 3 coming-soon
 * screen); spec in ish-rize-docs/ishrize-landing-prompt.md. Localized.
 *
 * Exports:
 *   generateMetadata — localized SEO metadata (canonical on the rize subdomain)
 *   default          — RizeHome
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RizeSiteHeader } from "@/components/rize/site-header";
import { RizeSiteFooter } from "@/components/rize/site-footer";
import { RizeHero } from "@/components/rize/sections/hero";
import { RizeProblem } from "@/components/rize/sections/problem";
import { RizeHowItWorks } from "@/components/rize/sections/how-it-works";
import { RizeFeatures } from "@/components/rize/sections/features";
import { RizeAttendance } from "@/components/rize/sections/attendance";
import { RizeAudiences } from "@/components/rize/sections/audiences";
import { RizeOrgNeutral } from "@/components/rize/sections/org-neutral";
import { RizeFinalCta } from "@/components/rize/sections/final-cta";
import { rizeConfig } from "@/lib/rize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rize.meta" });
  const title = t("title");

  return {
    title,
    description: t("description"),
    alternates: { canonical: rizeConfig.url },
    robots: { index: true },
    openGraph: {
      type: "website",
      title,
      description: t("description"),
      url: rizeConfig.url,
      siteName: rizeConfig.name,
      locale,
    },
    twitter: {
      card: "summary",
      title,
      description: t("description"),
    },
  };
}

export default async function RizeHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RizeSiteHeader />
      <main>
        <RizeHero />
        <RizeProblem />
        <RizeHowItWorks />
        <RizeFeatures />
        <RizeAttendance />
        <RizeAudiences />
        <RizeOrgNeutral />
        <RizeFinalCta />
      </main>
      <RizeSiteFooter />
    </>
  );
}
