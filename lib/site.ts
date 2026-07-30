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

/**
 * `id` keys this product's copy in the message catalogs (`company.products`
 * uses `<id>Domain` / `<id>Line`). The domain and one-liner deliberately do
 * NOT live here — they are per-locale strings and belong in `messages/`.
 */
export type Product = {
  id: string;
  name: string;
  wordmark: { strong: string; light: string };
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
      id: "gospel",
      name: "IshGospel",
      wordmark: { strong: "ISH", light: "GOSPEL" },
      href: "https://gospel.ishverse.com",
      status: "live",
    },
    {
      id: "rize",
      name: "IshRize",
      wordmark: { strong: "ISH", light: "RIZE" },
      href: "https://rize.ishverse.com",
      status: "live",
    },
  ] as Product[],
} as const;
