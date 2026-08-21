/**
 * Module: RizeSupportPage
 * Context: See AGENTS.md — product support/contact page for rize.ishverse.com.
 *
 * A simple form (name, email, message) that posts to /api/support. The API
 * route forwards the submission to support@ishverse.com via Resend.
 *
 * Exports:
 *   generateMetadata — SEO metadata
 *   default          — page component
 */

import type { Metadata } from "next";
import { RizeSiteHeader } from "@/components/rize/site-header";
import { RizeSiteFooter } from "@/components/rize/site-footer";
import { RizeSupportForm } from "@/components/rize/sections/support-form";
import { rizeConfig } from "@/lib/rize";

export function generateMetadata(): Metadata {
  return {
    title: `Support — ${rizeConfig.name}`,
    description:
      "Get help with IshRize. Submit a support request and our team will respond within 24 hours.",
    alternates: { canonical: `${rizeConfig.url}/support` },
  };
}

export default function RizeSupportPage() {
  return (
    <>
      <RizeSiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
        <RizeSupportForm />
      </main>
      <RizeSiteFooter />
    </>
  );
}
