/**
 * Module: Home
 * Context: See DESIGN.md §10 — page blueprint; implementation_plan.md Phase 1.
 *
 * Composes the full company landing page: Hero (VerseGlobe) · Ecosystem ·
 * Philosophy (dark story band) · Principles · Contact, between the shared
 * header and footer.
 *
 * Exports:
 *   default — Home page (server component)
 */

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Philosophy } from "@/components/sections/philosophy";
import { Principles } from "@/components/sections/principles";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Ecosystem />
        <Philosophy />
        <Principles />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
