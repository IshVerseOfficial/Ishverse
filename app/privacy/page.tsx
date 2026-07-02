/**
 * Module: Privacy Policy Page
 * Context: See DESIGN.md §10 + implementation_plan.md Phase 2 — company-wide
 * policy covering all IshVerse products (the app stores and product apps link
 * here).
 *
 * Grounded in what IshGospel actually does today: account data, user-created
 * spiritual content, S3 images, Resend transactional email, Railway hosting,
 * optional Google sign-in. Update this page when data practices change.
 *
 * Exports:
 *   metadata — page SEO metadata
 *   default  — PrivacyPage
 */

import type { Metadata } from "next";
import { LegalPage, H2, P, UL } from "@/components/legal/prose";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How IshVerse collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "July 2, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={UPDATED}>
      <P>
        IshVerse (&ldquo;we&rdquo;, &ldquo;us&rdquo;) builds discipline systems, including the
        IshGospel mobile app. This policy explains what information we collect, how we use it, and
        the choices you have. It applies to all IshVerse products and websites: ishverse.com,
        gospel.ishverse.com, rize.ishverse.com, and the IshGospel app.
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
          <strong className="text-fg">Content you create</strong> — Bible highlights and notes,
          reading history and plans, journal entries, prayer logs, formation streaks, goals and
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
        IshGospel is a spiritual formation app. Content you create in it — journals, prayers,
        reading activity — may reflect your religious beliefs. We treat all such content as private.
        It is never used for advertising, never used to profile you, and never sold or shared for
        commercial purposes. Journals and prayer logs are visible only to your account; content you
        post to a community is visible to that community.
      </P>

      <H2 id="how-we-use">How we use your information</H2>
      <UL>
        <li>To provide the service and sync your content across your devices.</li>
        <li>
          To send transactional email — account verification, password resets, and security alerts.
          We do not send marketing email.
        </li>
        <li>
          To keep your account secure (login alerts, account locking, two-factor authentication).
        </li>
        <li>To respond when you contact support.</li>
      </UL>
      <P>We never sell your data, and we show no third-party advertising.</P>

      <H2 id="processors">Where your data lives</H2>
      <P>
        We use a small number of infrastructure providers to run the service. Each processes data
        only on our behalf:
      </P>
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
      <P>
        All data is encrypted in transit (HTTPS/TLS). Passwords are hashed with a modern algorithm
        (Argon2id). Access to production systems is restricted.
      </P>

      <H2 id="retention">Retention and deletion</H2>
      <P>
        We keep your data for as long as your account is active. You can request deletion of your
        account and all associated data at any time — in the app under Profile → Privacy → Delete My
        Account, or by emailing{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent">
          {siteConfig.supportEmail}
        </a>
        . We process deletion requests within 30 days. Minimal records required for security or
        legal compliance (for example, server logs) may be retained for a limited period.
      </P>

      <H2 id="rights">Your rights</H2>
      <P>
        You can access, correct, export, or delete your information. Most of this is available
        directly in the app; for anything else, email{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent">
          {siteConfig.supportEmail}
        </a>{" "}
        and we will help.
      </P>

      <H2 id="children">Children</H2>
      <P>
        Our products are not directed at children under 13, and we do not knowingly collect personal
        information from them. If you believe a child has created an account, contact us and we will
        delete it.
      </P>

      <H2 id="changes">Changes to this policy</H2>
      <P>
        When this policy changes, we update this page and the date at the top. For material changes
        we will notify you in the app or by email.
      </P>

      <H2 id="contact">Contact</H2>
      <P>
        Questions about privacy:{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-accent">
          {siteConfig.supportEmail}
        </a>
      </P>
    </LegalPage>
  );
}
