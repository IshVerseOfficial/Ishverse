/**
 * Module: Site Configuration
 * Context: See DESIGN.md §1 (brand essence) + §9 (voice & copy).
 *
 * Central constants for site metadata, the product ecosystem, and contact
 * addresses. Keeping these in one place avoids scattering brand strings across
 * components and makes SEO/metadata edits a single-file change.
 *
 * Exports:
 *   siteConfig — name, wordmark, tagline, description, url, contact, products
 *   Product    — the shape of one ecosystem product entry
 */

export type Product = {
  name: string;
  wordmark: { strong: string; light: string };
  domain: string;
  oneLiner: string;
  href: string;
  status: "live" | "soon";
};

export const siteConfig = {
  name: "IshVerse",
  wordmark: { strong: "ISH", light: "VERSE" },
  tagline: "Systems for Intentional Growth.",
  description:
    "IshVerse builds discipline systems — one for each domain of life. A man, in command of his world.",
  url: "https://ishverse.com",
  contactEmail: "contact@ishverse.com",
  supportEmail: "support@ishverse.com",
  products: [
    {
      name: "IshGospel",
      wordmark: { strong: "ISH", light: "GOSPEL" },
      domain: "Spiritual discipline",
      oneLiner: "A structured system for spiritual formation.",
      href: "https://gospel.ishverse.com",
      status: "live",
    },
    {
      name: "IshRize",
      wordmark: { strong: "ISH", light: "RIZE" },
      domain: "Academic discipline",
      oneLiner: "A structured system for academic discipline.",
      href: "https://rize.ishverse.com",
      status: "soon",
    },
  ] as Product[],
} as const;
