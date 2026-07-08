/**
 * Module: IshGospel Terms of Service
 * Context: See middleware.ts — served at gospel.ishverse.com/terms.
 *
 * Product-specific terms for the IshGospel app.
 *
 * Exports:
 *   metadata — page SEO metadata
 *   default  — GospelTermsPage
 */

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GospelLegalPage, H2, P, UL } from "@/components/gospel/legal-prose";
import { gospelConfig } from "@/lib/gospel";

export const metadata: Metadata = {
  title: "Terms of Service — IshGospel",
  description: "The terms that govern your use of IshGospel.",
  alternates: { canonical: `${gospelConfig.url}/terms` },
};

const UPDATED = "July 5, 2026";
const SUPPORT = "support@ishverse.com";

export default async function GospelTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <GospelLegalPage title="Terms of Service" updated={UPDATED}>
      <P>
        These terms govern your use of the IshGospel app and website (gospel.ishverse.com). By
        creating an account or using IshGospel, you agree to them.
      </P>

      <H2 id="who-may-use">Who may use IshGospel</H2>
      <P>
        You must be at least 13 years old. You agree to provide accurate account information and to
        keep your credentials secure — you are responsible for activity on your account. Contact us
        at{" "}
        <a href={`mailto:${SUPPORT}`} className="text-accent">
          {SUPPORT}
        </a>{" "}
        immediately if you suspect unauthorized access.
      </P>

      <H2 id="your-content">Your content</H2>
      <P>
        You own the content you create — journals, prayers, notes, highlights, goals, and community
        posts. You grant us a limited license to host, process, and display that content solely to
        operate the service for you. Journals and prayer logs are private to your account; content
        you post to a community is visible to that community.
      </P>
      <P>
        You are responsible for the content you share in communities. Do not post anything illegal,
        harassing, or that infringes another person&apos;s rights.
      </P>

      <H2 id="subscriptions">Subscriptions and billing</H2>
      <P>
        Paid plans are available on a monthly or annual basis. Subscriptions are billed through
        Google Play (Android) or the App Store (iOS). Billing, cancellation, and refund policies are
        governed by the platform you purchased through.
      </P>
      <P>
        Free features remain accessible without a subscription. Paid features require an active
        subscription and are available only while your subscription is current.
      </P>

      <H2 id="acceptable-use">Acceptable use</H2>
      <UL>
        <li>Do not use IshGospel to harass, threaten, or harm other users.</li>
        <li>Do not attempt to access accounts or data that are not yours.</li>
        <li>Do not use the service to distribute spam or malware.</li>
        <li>Do not reverse-engineer or scrape the app or API.</li>
      </UL>

      <H2 id="termination">Termination</H2>
      <P>
        You may delete your account at any time from the app. We may suspend or terminate accounts
        that violate these terms. On termination, your right to use IshGospel ends and we will
        delete your data per our{" "}
        <a href={`${gospelConfig.url}/privacy`} className="text-accent">
          Privacy Policy
        </a>
        .
      </P>

      <H2 id="disclaimer">Disclaimer and limitation of liability</H2>
      <P>
        IshGospel is provided &ldquo;as is.&rdquo; We make no warranty that the service will be
        uninterrupted or error-free. To the extent permitted by law, our liability for any claim
        arising from your use of the service is limited to the amount you paid us in the 12 months
        before the claim arose.
      </P>

      <H2 id="changes">Changes to these terms</H2>
      <P>
        When these terms change, we update this page and the date at the top. Continued use of
        IshGospel after a change constitutes acceptance of the new terms.
      </P>

      <H2 id="contact">Contact</H2>
      <P>
        Questions:{" "}
        <a href={`mailto:${SUPPORT}`} className="text-accent">
          {SUPPORT}
        </a>
      </P>
    </GospelLegalPage>
  );
}
