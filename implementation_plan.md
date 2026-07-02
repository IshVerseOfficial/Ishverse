# IshVerse Web — Implementation Plan

The phased plan for `ishverse-web`, the **company site** for the Ish ecosystem at `ishverse.com`. Design decisions live in [DESIGN.md](DESIGN.md); workflow follows `ishgospel-docs/CONTRIBUTING.md`; infrastructure facts live in `ishgospel-docs/INFRASTRUCTURE.md`.

---

## Goal

Present **IshVerse** — the company behind IshGospel and IshRize — and route visitors to the products. Secondary jobs: host company-wide legal pages (`/privacy`, `/terms`) and serve the `rize.ishverse.com` coming-soon page.

**Primary metric:** click-throughs to `gospel.ishverse.com` and app installs originating from the company site.

---

## Scope

| In scope (now)                                      | Out of scope (deferred)                                          |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| Company landing page at `ishverse.com`              | Blog / news                                                      |
| Company-wide `/privacy` + `/terms`                  | Careers, press pages                                             |
| `rize.ishverse.com` coming-soon (subdomain rewrite) | Full IshRize product site (own repo later, like `ishgospel-web`) |
| System + manual light/dark theme                    | Any logged-in functionality                                      |
| Responsive, Lighthouse ≥ 95                         | Analytics beyond Vercel defaults                                 |
| i18n (en/es/fr/pt) — later phase                    |                                                                  |

**`ishgospel-web` is untouched.** Components are _copied_ from it (see DESIGN.md §8); no changes land there except one flagged item below.

---

## Repos & domains

| Repo (GitHub org: `IshVerseofficial`) | Deploys to                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ishverse-web` (this repo)            | `ishverse.com` + `rize.ishverse.com` (one Vercel project, two domains, middleware rewrite) |
| `ishgospel-web` (existing, untouched) | `gospel.ishverse.com`                                                                      |

### ⚠ Flagged dependency — the app's privacy links

`ishgospel-frontend` (PrivacyScreen, SignUpScreen, app.json) and the Play Store listing point to **`gospel.ishverse.com/privacy`**, which does not exist in `ishgospel-web`. Resolution that respects "don't touch ishgospel-web":

1. Legal pages are built **here** at `ishverse.com/privacy` + `ishverse.com/terms` (company-wide policy, the Adobe model).
2. A **redirect** `gospel.ishverse.com/privacy → ishverse.com/privacy` (and `/terms`) is added to `ishgospel-web` — config-only (`next.config.ts` `redirects()`), no app code touched. This is the single permitted change to that repo.
3. Play Store listing uses `https://ishverse.com/privacy` directly.

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

### Phase 3 — rize.ishverse.com coming soon

- `middleware.ts` subdomain rewrite → `app/rize/` route group
- One-screen page: IshRize wordmark, one paragraph, notify CTA (mailto `contact@ishverse.com` now; waitlist endpoint later if demand shows)

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
