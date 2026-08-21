/**
 * Module: RizePricing
 * Context: See IshRize-Master-Build-Specification Stage 16 — pricing page
 * with Free, Pro, and Enterprise tiers. Follows the gospel pricing pattern.
 *
 * Exports:
 *   generateMetadata — localized SEO metadata
 *   default          — RizePricingPage
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RizeSiteHeader } from "@/components/rize/site-header";
import { RizeSiteFooter } from "@/components/rize/site-footer";
import { RizePricing } from "@/components/rize/sections/pricing";
import { RizePricingFaq } from "@/components/rize/sections/pricing-faq";
import { rizeConfig } from "@/lib/rize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rize.pricing" });

  return {
    title: `${t("eyebrow")} — ${rizeConfig.name}`,
    description: t("sub"),
    alternates: { canonical: `${rizeConfig.url}/pricing` },
    icons: { icon: "/ishrize-logo.png" },
    openGraph: {
      type: "website",
      title: `${t("eyebrow")} — ${rizeConfig.name}`,
      description: t("sub"),
      url: `${rizeConfig.url}/pricing`,
      siteName: rizeConfig.name,
      locale,
      images: [{ url: "/api/og/rize", width: 1200, height: 630 }],
    },
  };
}

export default async function RizePricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RizeSiteHeader />
      <main>
        <RizePricing />
        <RizePricingFaq />
      </main>
      <RizeSiteFooter />
    </>
  );
}
