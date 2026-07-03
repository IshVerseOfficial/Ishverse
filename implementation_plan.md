# IshVerse Web — Implementation Plan

The phased plan for `ishverse-web`, the **company site** for the Ish ecosystem at `ishverse.com`. Design decisions live in [DESIGN.md](DESIGN.md); workflow follows `ishgospel-docs/CONTRIBUTING.md`; infrastructure facts live in `ishgospel-docs/INFRASTRUCTURE.md`.

---

## Goal

Present **IshVerse** — the company behind IshGospel and IshRize — and route visitors to the products. Secondary jobs: host company-wide legal pages (`/privacy`, `/terms`) and serve the `rize.ishverse.com` coming-soon page.

**Primary metric:** click-throughs to `gospel.ishverse.com` and app installs originating from the company site.

---

## Scope

| In scope (now)                                            | Out of scope (deferred)          |
| --------------------------------------------------------- | -------------------------------- |
| Company landing page at `ishverse.com`                    | Blog / news                      |
| Company-wide `/privacy` + `/terms`                        | Careers, press pages             |
| `gospel.ishverse.com` product landing (subdomain rewrite) | Any logged-in functionality      |
| `rize.ishverse.com` coming-soon (subdomain rewrite)       | Analytics beyond Vercel defaults |
| System + manual light/dark theme                          |                                  |
| Responsive, Lighthouse ≥ 95                               |                                  |
| i18n (en/es/fr/pt) — later phase                          |                                  |

---

## Repos & domains

**This is the only web repo.** One Vercel project serves the company site and every product landing page via subdomain rewrites (`middleware.ts`).

| Domain                | Serves                                    |
| --------------------- | ----------------------------------------- |
| `ishverse.com`        | Company site + company-wide legal pages   |
| `gospel.ishverse.com` | IshGospel product landing (`app/gospel/`) |
| `rize.ishverse.com`   | IshRize coming-soon (`app/rize/`)         |

> **`ishgospel-web` is retired.** Its Phase 1 landing page was ported into `components/gospel/` + `app/gospel/` here (i18n stripped to English pending Phase 4). The repo should be archived on GitHub; its redirect config never shipped. Legal paths on product subdomains 308-redirect to `ishverse.com/privacy|terms` via `middleware.ts`.

The mobile app (`ishgospel-frontend`) and the Play Store listing use `https://ishverse.com/privacy` + `/terms` directly.

---

## Tech decisions

Identical to `ishgospel-web` — consistency is the point:

| Decision     | Choice                                                                 | Why                                                           |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router)                                                | Same as ishgospel-web; SSG for SEO + speed                    |
| Language     | TypeScript (strict)                                                    | Ecosystem standard                                            |
| Styling      | Tailwind CSS v4                                                        | Tokens ported 1:1 from ishgospel-web `globals.css`            |
| Theming      | `next-themes` (class strategy)                                         | OS auto + manual toggle, no flash                             |
| Icons        | `lucide-react`                                                         | Same as ishgospel-web                                         |
| i18n         | `next-intl` (Phase 4)                                                  | Same as ishgospel-web                                         |
| Animation    | Canvas 2D + CSS only                                                   | No animation library — see DESIGN.md §11                      |
| Multi-domain | Next.js middleware subdomain rewrite                                   | `rize.ishverse.com` → `/rize` routes; one project, one deploy |
| Hosting      | Vercel (free tier)                                                     | Matches ishgospel-web; preview deploys                        |
| Tooling      | ESLint, Prettier, husky + lint-staged, CI (`typecheck · lint · build`) | Copied from ishgospel-web                                     |

---

## Phases

One phase = one issue = one `feature/*` branch = one squash-merged PR (per CONTRIBUTING.md).

### Phase 0 — Scaffold ✅ (#1)

- Next.js 16 + TS strict + Tailwind v4 scaffold; Node engine pinned like ishgospel-web
- Port from ishgospel-web: `globals.css` tokens, `providers.tsx`, `theme-toggle`, `ui/section.tsx`, `neural-field.tsx`
- IshVerse `logo.tsx` wordmark; `site-header` / `site-footer` shells
- Tooling + CI + repo docs (`README.md`, `AGENTS.md`/`CLAUDE.md` pointing at DESIGN.md)
- GitHub settings per CONTRIBUTING.md: `main` + `dev`, branch protection, squash-only, auto-delete branches

### Phase 1 — VerseGlobe + full landing page ✅ (#2)

- `verse-globe.tsx` per DESIGN.md §5 (the one genuinely new build)
- `reveal.tsx` scroll-reveal wrapper
- Sections: Hero · Ecosystem (`product-card.tsx`) · Philosophy · Principles · Contact · Footer
- Copy per DESIGN.md §9; both themes verified; reduced-motion verified

### Phase 2 — Legal pages ✅ (#3)

- `legal/prose.tsx` + `/privacy` + `/terms` (company-wide wording covering IshGospel data practices: account data, Bible activity, journaling, avatars/S3, Resend emails, deletion via support@ishverse.com)
- Config-only redirect PR in `ishgospel-web` (flagged item above)
- Update `ishgospel-docs/INFRASTRUCTURE.md` with final legal URLs

### Phase 3 — product subdomains ✅ (#5)

- `middleware.ts` — subdomain rewrites (`gospel.*` → `/gospel`, `rize.*` → `/rize`), plus 308 redirects for `/privacy|/terms` on product subdomains → `ishverse.com`
- `app/gospel/` + `components/gospel/` — full IshGospel product landing ported from the retired `ishgospel-web` repo (hero + AppPreview, pillars, formation engine, how it works, breaking habits, theme showcase, testimonial, final CTA + waitlist)
- `app/api/waitlist/` — server-side forward to the Railway backend (`POST /api/v1/waitlist`)
- `app/rize/` — one-screen coming-soon page (notify CTA via mailto; waitlist endpoint later if demand shows)

### Phase 6 — gospel marketing showcase ✅ (#7)

- Real app screenshots (`public/gospel/`, from `ishgospel-frontend/assets/AppScreenshots`) replace every CSS mock
- `phone-frame.tsx` + `sections/showcase.tsx` — "Inside the app" alternating rows (Bible · Prayer & Journal · Vision & Formation) with scroll reveals
- Hero shows the real Home screen (theme-aware: light screenshot in light mode, dark in dark); Breaking Habits gets the real habit screenshot; theme showcase uses the real light/dark Home screens

### Phase 7 — gospel pricing ✅ (#8)

- `sections/pricing.tsx` — mirrors the app paywall (SubscriptionPlansScreen): Free · Personal $4.99 (highlighted "Most popular") · Family $9.99, plus a churches band (Lite $49 · Pro $199 with contact CTA); nav/footer `#pricing` links. Keep in sync with the app paywall

### Phase 8 — gospel conversion polish ✅ (#10)

- `sections/faq.tsx` — native accordion + FAQPage JSON-LD (honest answers only)
- `app/gospel/opengraph-image.tsx` — branded social card via next/og
- Favicons: `app/icon.svg` (company constellation), `app/gospel/icon.png` (IshGospel mark) — fixed the site-wide favicon 404
- Motion consistency: Reveal on all gospel sections
- A11y: new `accent-text` / `gold-text` tokens (DESIGN.md §3) — raw accent/gold failed 4.5:1 at label sizes; hero stops preloading both theme screenshots
- Lighthouse (local prod build): a11y 100 target · SEO 100 · best-practices clean; ≥95 perf gate is measured on Vercel production

### Phase 4 — i18n

- `next-intl` wired like ishgospel-web; en/es/fr/pt messages

### Phase 5 — Deploy + DNS

- Vercel project; domains `ishverse.com`, `www.ishverse.com` (redirect → apex), `rize.ishverse.com`
- DNS records at registrar; verify `mail.ishverse.com` Resend records untouched
- Lighthouse pass ≥ 95 on production; update INFRASTRUCTURE.md subdomain table

---

## Conventions

- File headers (`Module / Context / Exports`) on every source file; `Context:` cites DESIGN.md §n
- Server Components by default; `"use client"` only for theme/canvas/interactive islands
- Strict TS, no `any`
- Workflow: issue → `feature/*` → PR (`Closes #N`) → squash merge → delete branch

---

## Open questions

- Logo mark: wordmark-only at launch, or commission an abstract mark (per BRAND.md logo prompt) first? → wordmark-only for launch, mark later.
- Analytics: none at launch; revisit with ishgospel-web's decision (Vercel Analytics vs Plausible).
- `www.ishverse.com`: redirect to apex (recommended) — confirm at DNS setup.
