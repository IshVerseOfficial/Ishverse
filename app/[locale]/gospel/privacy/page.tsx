/**
 * Module: IshGospel Privacy Policy
 * Context: See middleware.ts — served at gospel.ishverse.com/privacy.
 *
 * Product-specific privacy policy for the IshGospel app. Covers what the
 * app collects and why, framed for users of IshGospel specifically.
 * The company-wide policy at ishverse.com/privacy also applies.
 *
 * Exports:
 *   metadata — page SEO metadata
 *   default  — GospelPrivacyPage
 */

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GospelLegalPage, H2, P, UL } from "@/components/gospel/legal-prose";
import { gospelConfig } from "@/lib/gospel";

export const metadata: Metadata = {
  title: "Privacy Policy — IshGospel",
  description: "How IshGospel collects, uses, and protects your information.",
  alternates: { canonical: `${gospelConfig.url}/privacy` },
};

const UPDATED = "July 5, 2026";
const SUPPORT = "support@ishverse.com";

export default async function GospelPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <GospelLegalPage title="Privacy Policy" updated={UPDATED}>
      <P>
        IshGospel is built by IshVerse. This policy explains what information the IshGospel app and
        website (gospel.ishverse.com) collect, how we use it, and the choices you have.
      </P>

      <H2 id="what-we-collect">What we collect</H2>
      <UL>
        <li>
          <strong className="text-fg">Account information</strong> — your name, email address, and
          password. Passwords are stored only as a secure cryptographic hash; we cannot read them.
          If you sign in with Google, we receive your name, email, and profile photo from Google
          instead.
        </li>
        <li>
          <strong className="text-fg">Profile photo</strong> — optional, if you upload one.
        </li>
        <li>
          <strong className="text-fg">Spiritual content you create</strong> — Bible highlights and
          notes, reading history and plans, journal entries, prayer logs, formation streaks, goals,
          habit tracking, and anything you post in a community.
        </li>
        <li>
          <strong className="text-fg">Community information</strong> — the communities you join,
          your role in them, and invitations you send or receive.
        </li>
        <li>
          <strong className="text-fg">Technical information</strong> — device and app version, and
          server logs (including IP addresses) used for security, rate limiting, and debugging.
        </li>
      </UL>
      <P>We do not collect your precise location, your contacts, or advertising identifiers.</P>

      <H2 id="spiritual-content">The nature of your content</H2>
      <P>
        IshGospel is a spiritual formation app. Content you create — journals, prayers, reading
        activity — may reflect your religious beliefs. We treat all such content as private. It is
        never used for advertising, never used to profile you, and never sold or shared for
        commercial purposes.
      </P>
      <P>
        Journals and prayer logs are visible only to your account. Content you post to a community
        is visible to that community only.
      </P>

      <H2 id="how-we-use">How we use your information</H2>
      <UL>
        <li>To provide the service and sync your content across your devices.</li>
        <li>
          To send transactional email — account verification, password resets, and security alerts.
          We do not send marketing email.
        </li>
        <li>To keep your account secure.</li>
        <li>To respond when you contact support.</li>
      </UL>
      <P>We never sell your data, and we show no third-party advertising.</P>

      <H2 id="processors">Where your data lives</H2>
      <UL>
        <li>
          <strong className="text-fg">Railway</strong> — application and database hosting.
        </li>
        <li>
          <strong className="text-fg">Amazon Web Services (S3)</strong> — storage for profile and
          community images.
        </li>
        <li>
          <strong className="text-fg">Resend</strong> — delivery of transactional email.
        </li>
        <li>
          <strong className="text-fg">Google</strong> — only if you choose to sign in with Google.
        </li>
      </UL>
      <P>All data is encrypted in transit (HTTPS/TLS). Passwords are hashed with Argon2id.</P>

      <H2 id="retention">Retention and deletion</H2>
      <P>
        We keep your data for as long as your account is active. You can delete your account and all
        associated data at any time from the app (Profile → Privacy → Delete My Account) or by
        emailing{" "}
        <a href={`mailto:${SUPPORT}`} className="text-accent">
          {SUPPORT}
        </a>
        . We process deletion requests within 30 days.
      </P>

      <H2 id="rights">Your rights</H2>
      <P>
        You can access, correct, export, or delete your information. Most of this is available
        directly in the app. For anything else, email{" "}
        <a href={`mailto:${SUPPORT}`} className="text-accent">
          {SUPPORT}
        </a>
        .
      </P>

      <H2 id="children">Children</H2>
      <P>
        IshGospel is not directed at children under 13. If you believe a child has created an
        account, contact us and we will delete it.
      </P>

      <H2 id="changes">Changes to this policy</H2>
      <P>
        When this policy changes, we update this page and the date at the top. For material changes
        we will notify you in the app or by email.
      </P>

      <H2 id="contact">Contact</H2>
      <P>
        Questions about privacy:{" "}
        <a href={`mailto:${SUPPORT}`} className="text-accent">
          {SUPPORT}
        </a>
      </P>
    </GospelLegalPage>
  );
}
