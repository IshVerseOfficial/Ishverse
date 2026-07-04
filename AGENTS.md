<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# IshVerse Web — Agent Context

The **company site** for IshVerse — the parent brand behind IshGospel and IshRize — deployed at `ishverse.com` (plus the `rize.ishverse.com` coming-soon page via subdomain rewrite).

## Read these first, in order

1. **[DESIGN.md](DESIGN.md)** — the design specification. Every UI decision (colors, type, motion, the VerseGlobe motif, do/don't) is defined there. Do not invent design values.
2. **[implementation_plan.md](implementation_plan.md)** — phased plan, tech decisions, domain/repo layout.
3. `../ishgospel-docs/` — ecosystem source of truth: `BRAND.md`, `CONTRIBUTING.md` (workflow), `INFRASTRUCTURE.md` (domains/emails).

## Sibling repos (GitHub org: IshVerseOfficial)

| Repo                                       | What                                                                                                                                                                       |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Ishverse`                                 | **This repo** — company site (`ishverse.com`) + ALL product landing pages via subdomain rewrites: `gospel.ishverse.com` (`app/gospel/`), `rize.ishverse.com` (`app/rize/`) |
| `ishgospel-web`                            | **Retired** — its landing page was ported into `components/gospel/` here. Do not deploy or extend it                                                                       |
| `ishgospel-backend` / `ishgospel-frontend` | IshGospel API + mobile app                                                                                                                                                 |
| `ishgospel-docs`                           | Documentation source of truth                                                                                                                                              |

## What this repo is (and is not)

- **Is:** the company profile — brand story, product ecosystem, company-wide legal pages (`/privacy`, `/terms`), contact — plus every product's marketing landing page, routed by subdomain in `middleware.ts`.
- **Is not:** a logged-in product. No auth. The only backend call is the gospel waitlist forward (`app/api/waitlist/` → Railway). Static, fast, SEO-first.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (tokens in `app/globals.css` via `@theme inline`; `dark:` is class-based via `@custom-variant`)
- `next-themes` for system-auto + manual light/dark
- `lucide-react` icons
- **No animation libraries** — Canvas 2D + CSS only (DESIGN.md §11)
- i18n: `next-intl` — en/es/fr/pt, `as-needed` prefix (`/` = en, `/es`…), catalogs in `messages/`; routes live under `app/[locale]/`; legal pages stay English

## Hard rules

- The one color metaphor: **the system is blue (`#0052FF`), the man is gold (`#A68A4C`)** — every visualization follows it.
- Two themes only: pure white `#FFFFFF` / pure black `#000000`. Tokens are Tailwind utilities (`bg-bg`, `text-fg`, `text-accent`, `text-gold`, …) — never hex literals in JSX.
- All motion respects `prefers-reduced-motion`. Canvas layers pause off-screen, DPR capped at 2 (see `components/neural-field.tsx` for the reference implementation).
- Voice: calm, direct, sentence case. No hype, no emojis, no exclamation marks (DESIGN.md §9).
- Mobile-first responsive; Lighthouse ≥ 95 is the release gate.

## File header convention (required on every source file)

```ts
/**
 * Module: <name>
 * Context: See DESIGN.md §<n> — <what this implements>.
 *
 * <1–3 lines on what the file does and any non-obvious behavior.>
 *
 * Exports:
 *   <name> — <one-line description>
 */
```

## Workflow

Per `ishgospel-docs/CONTRIBUTING.md`: issue → `feature/*` branch from `dev` → PR (`Closes #N`) → squash merge → delete branch. `main` and `dev` are protected; CI runs `typecheck · lint · build`.
