/**
 * Module: Terms of Service Page
 * Context: See DESIGN.md §10 + implementation_plan.md Phase 2 — company-wide
 * terms covering all IshVerse products.
 *
 * Exports:
 *   metadata — page SEO metadata
 *   default  — TermsPage
 */

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage, H2, P, UL } from "@/components/legal/prose";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of IshVerse products.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "July 2, 2026";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalPage title="Terms of Service" updated={UPDATED}>
      <P>
        These terms govern your use of IshVerse products and websites, including the IshGospel
        mobile app, ishverse.com, gospel.ishverse.com, and rize.ishverse.com. By creating an account
        or using our products, you agree to them.
      </P>

      <H2 id="who-may-use">Who may use the service</H2>
      <P>
        You must be at least 13 years old. You agree to provide accurate account information and to
        keep your credentials secure — you are responsible for activity on your account. Tell us
        immediately at{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent">
          {siteConfig.supportEmail}
        </a>{" "}
        if you suspect unauthorized access.
      </P>

      <H2 id="your-content">Your content</H2>
      <P>
        You own the content you create — journals, prayers, notes, highlights, goals, and community
        posts. You grant us a limited license to host, process, and display that content solely to
        operate the service for you. Journals and prayer logs are private to your account; content
        you post in a community is visible to that community.
      </P>

      <H2 id="acceptable-use">Acceptable use</H2>
      <P>You agree not to:</P>
      <UL>
        <li>
          post content that is unlawful, abusive, harassing, or infringes others&rsquo; rights;
        </li>
        <li>attempt to breach, probe, or circumvent security or rate limits;</li>
        <li>scrape the service, reverse engineer it, or disrupt it for other users;</li>
        <li>impersonate another person or misrepresent your affiliation.</li>
      </UL>
      <P>We may remove content or suspend accounts that violate these terms.</P>

      <H2 id="communities">Communities</H2>
      <P>
        Community leaders can set roles, assignments, and membership for their community. Treat
        members with respect. Report abuse to{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent">
          {siteConfig.supportEmail}
        </a>
        .
      </P>

      <H2 id="purchases">Purchases</H2>
      <P>
        The core service is currently free. If paid subscriptions are introduced, they will be
        billed through the Apple App Store or Google Play, and the price and terms will be shown
        before you buy. Store purchases are also subject to the store&rsquo;s own terms.
      </P>

      <H2 id="availability">Availability</H2>
      <P>
        The service is provided &ldquo;as is&rdquo;. We work to keep it fast and reliable, but we do
        not guarantee uninterrupted availability, and features may change as the products evolve.
      </P>

      <H2 id="termination">Termination</H2>
      <P>
        You may stop using the service or delete your account at any time (Profile → Privacy →
        Delete My Account). We may suspend or terminate accounts that violate these terms or harm
        the service or its users.
      </P>

      <H2 id="liability">Limitation of liability</H2>
      <P>
        To the maximum extent permitted by law, IshVerse is not liable for indirect, incidental, or
        consequential damages arising from your use of the service, and our total liability is
        limited to the amount you paid us in the twelve months before the claim.
      </P>

      <H2 id="law">Governing law</H2>
      <P>These terms are governed by the laws of Ghana.</P>

      <H2 id="changes">Changes to these terms</H2>
      <P>
        When these terms change, we update this page and the date at the top. Continued use of the
        service after a change means you accept the updated terms.
      </P>

      <H2 id="contact">Contact</H2>
      <P>
        Questions about these terms:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent">
          {siteConfig.contactEmail}
        </a>
      </P>
    </LegalPage>
  );
}
