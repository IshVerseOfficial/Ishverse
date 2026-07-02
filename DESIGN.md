# IshVerse Web — Design Specification

The single source of truth for designing and building `ishverse-web`, the **company site** of the Ish ecosystem at `ishverse.com`. Any AI agent or developer building UI in this repo follows this file. Where this file is silent, defer to `ishgospel-docs/BRAND.md`.

> This file exists so design decisions are made **once**, here — not improvised per component. If you need a value that isn't here, add it here first, then use it.

---

## 1. Brand Essence

**IshVerse — Systems for Intentional Growth.**

- **Ish** (אִישׁ) — _man_. The human being: spirit, will, discipline. The one who acts.
- **Verse** — _the world_. The universe of domains a person must govern: faith, learning, work, habits.

**The thesis:** a man in command of his world. Not the world happening _to_ him — him giving _structure_ to it. Every product in the ecosystem is one domain of that world, systematized:

| Product       | Domain               | Status                            |
| ------------- | -------------------- | --------------------------------- |
| **IshGospel** | Spiritual discipline | Live — `gospel.ishverse.com`      |
| **IshRize**   | Academic discipline  | Coming soon — `rize.ishverse.com` |

The company site's job: tell this story in one screen, then route visitors to the products.

### Personality

Calm · Direct · Structured · Intentional · Quietly confident.

**Never:** hype, motivational fluff, startup buzzwords, religious imagery, emotional manipulation.

---

## 2. Design Principles

1. **One idea per screen.** Each section makes exactly one point. No section does two jobs.
2. **Motion carries meaning.** Animation exists to express the brand thesis (connection, orbit, structure) — never as decoration. If an animation could be removed without losing meaning, remove it.
3. **Dark is the stage, light is the page.** The hero and story sections default to the dark treatment (the "verse" reads best as points of light in darkness). Both themes are fully supported everywhere; `next-themes` class strategy, OS default.
4. **Structure is visible.** Grids, baselines, and aligned edges are part of the aesthetic. Nothing floats arbitrarily.
5. **Reuse before invention.** Components are ported from `ishgospel-web` wherever one exists. New components go in `components/` with the standard file header and are built to be shared.

---

## 3. Color System

Identical tokens to `ishgospel-web` — defined as CSS variables in `app/globals.css`, exposed through Tailwind v4 `@theme inline`. **Do not invent colors.**

### Base (two themes only)

| Token          | Light              | Dark                     | Tailwind utility    |
| -------------- | ------------------ | ------------------------ | ------------------- |
| `bg`           | `#FFFFFF`          | `#000000`                | `bg-bg`             |
| `surface`      | `#F5F5F5`          | `#111111`                | `bg-surface`        |
| `fg`           | `#1A1A1A`          | `#FFFFFF`                | `text-fg`           |
| `fg-secondary` | `#6B7280`          | `#A1A1AA`                | `text-fg-secondary` |
| `divider`      | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | `border-divider`    |
| `glass-bg`     | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.08)` | `bg-glass-bg`       |

### Accents (shared both themes)

| Token         | Hex       | Use                                                         |
| ------------- | --------- | ----------------------------------------------------------- |
| `accent`      | `#0052FF` | Primary actions, links, network lines, focus                |
| `accent-dark` | `#0236A6` | Hover/pressed states                                        |
| `gold`        | `#A68A4C` | Earned emphasis: the man, milestones, ~18% of network nodes |

### Canvas / animation variables

The animated layers read colors from CSS variables so they re-theme automatically (pattern proven in `NeuralField`):

```css
--field-grid   /* faint grid lines */
--field-line   /* network connections (blue, low alpha) */
--field-node   /* network nodes (blue, mid alpha) */
--field-glow   /* radial ambient glow */
--gold         /* #A68A4C — the human element, always gold */
```

**Rule:** in every visualization, _the system is blue, the man is gold._ This is the one color metaphor the whole site repeats.

---

## 4. Typography

- **Font:** Inter (via `next/font`), system sans fallback. Nothing else.
- **Web display scale** (landing pages need larger display sizes than the app):

| Level    | Size / weight                               | Tailwind                                         | Use                |
| -------- | ------------------------------------------- | ------------------------------------------------ | ------------------ |
| Display  | 56–72px / 700, tracking `-0.02em`           | `text-5xl md:text-7xl font-bold tracking-tight`  | Hero headline only |
| H1       | 40–48px / 700                               | `text-4xl md:text-5xl font-bold`                 | Section headlines  |
| H2       | 28–32px / 600                               | `text-2xl md:text-3xl font-semibold`             | Sub-sections       |
| H3       | 20px / 600                                  | `text-xl font-semibold`                          | Card titles        |
| Body     | 16–18px / 400, leading 1.6                  | `text-base md:text-lg leading-relaxed`           | Copy               |
| Caption  | 14px / 400                                  | `text-sm`                                        | Secondary info     |
| Overline | 12–13px / 600, uppercase, tracking `0.08em` | `text-xs font-semibold uppercase tracking-wider` | Section labels     |

- Headlines: sentence case. Never all-caps except Overline labels.
- Body copy max width: `max-w-prose` (~65ch). Headlines: `max-w-4xl`.

---

## 5. Signature Motif — the VerseGlobe

The hero centerpiece and the site's identity. **One component: `components/verse-globe.tsx`.**

### Concept

A rotating wireframe world built from the same neural-network language as `NeuralField` — points of light connected by thin lines, slowly turning. In front of it, slightly off-center, a minimal human figure rendered in **gold**, connected into the network by a few threads of light. The world turns; the man is still. He is not _in_ the network — the network answers _to_ him.

### Composition (desktop)

```
┌──────────────────────────────────────────────┐
│  Overline: IshVerse                          │
│  Display: Systems for                        │
│           Intentional Growth.       ┌──────┐ │
│  Body: one calm paragraph           │GLOBE │ │
│  [Explore IshGospel] [IshRize soon] │ + man│ │
│                                     └──────┘ │
└──────────────────────────────────────────────┘
```

Mobile: globe sits behind/below the copy at reduced opacity; copy remains fully legible (contrast first).

### Implementation contract

- **Canvas 2D, no three.js.** Points distributed on a sphere via Fibonacci lattice (~220 points desktop, ~120 mobile), rotated around the Y axis (~1 revolution / 60s), projected with simple perspective (`scale = f / (f + z)`). Points on the far hemisphere render at reduced alpha — this alone reads as 3D.
- Connect each point to its 3 nearest neighbors _in 3D_, computed **once at seed** — the wireframe stays stable while the sphere turns (cheaper and reads better than per-frame projected-space matching). Edges use `--field-line` strokes; nodes are 1.5–2.5px dots in `--field-node`, ~18% in `--gold`.
- **The man:** drawn in the same canvas — a minimal abstract standing figure (line-art: head circle + torso/limb strokes, no face, no detail) in `--gold`, ~15% of globe height, positioned at the lower-front of the globe, one arm raised toward the world. 2–3 faint threads from the raised hand to the nearest front nodes. It must read as _abstract geometry_, not an icon of a person. No religious posture (no raised cross-arms).
- **Performance/a11y — inherit every rule from `NeuralField`:** DPR capped at 2, `ResizeObserver` resize, `IntersectionObserver` pauses the RAF loop off-screen, `prefers-reduced-motion` renders one static frame, colors re-read on theme change via `MutationObserver`.
- Budget: the globe must hold 60fps on a mid-range phone. If it can't, cut point count — never add a spinner or loading state for decoration.

### Motif reuse (consistency across the board)

- `NeuralField` (ported as-is from ishgospel-web) is the **section background** for story/CTA bands.
- `VerseGlobe` appears **once** — the hero. Never repeat it smaller elsewhere.
- Product cards may use a static mini-constellation (a few connected dots) as corner ornament — same colors, no animation.

---

## 6. Motion Language

| Property              | Value                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| Reveal-on-scroll      | `opacity 0→1` + `translateY 16px→0`, 500ms, `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 60ms between siblings |
| Hover (cards/buttons) | 150ms ease-out; translate ≤2px or border/glow shift — no scale jumps                                         |
| Ambient (canvas)      | Slow. Globe ~60s/rev; particles drift ≤0.3px/frame                                                           |
| Page transitions      | None. Server-rendered pages, instant navigation                                                              |

**Hard rules:**

- Every animation respects `prefers-reduced-motion: reduce` (static fallback, not "slower").
- Scroll reveals via one shared `useReveal` hook / `Reveal` component with `IntersectionObserver` — not per-section one-offs.
- Nothing autoplays audio/video. No parallax scroll-jacking. Scroll speed is the user's.

---

## 7. Layout & Spacing

- Content container: `max-w-6xl mx-auto px-6` (matches ishgospel-web `Section`).
- Section vertical rhythm: `py-24 md:py-32`. Hero: `min-h-[90svh]` with content vertically centered.
- Spacing scale: Tailwind 4/8-based only (`gap-4/6/8/12/16/24`). No arbitrary pixel values without a reason written here.
- Cards: `bg-surface` or `bg-glass-bg backdrop-blur`, `border border-divider`, `rounded-2xl`, padding `p-6 md:p-8`.
- Grid: products in a 2-up grid (`md:grid-cols-2`), principles in 3-up (`md:grid-cols-3`).

---

## 8. Component Inventory

### Ported from `ishgospel-web` (copy, keep file headers, adjust copy/branding only)

| Component               | Change                                              |
| ----------------------- | --------------------------------------------------- |
| `neural-field.tsx`      | None — port as-is                                   |
| `theme-toggle.tsx`      | None                                                |
| `ui/section.tsx`        | None                                                |
| `site-header.tsx`       | IshVerse logo, nav: Products · Story · Contact      |
| `site-footer.tsx`       | Company-level: products, legal, contact             |
| `logo.tsx`              | New wordmark: **ISH** bold + **VERSE** light/spaced |
| `language-switcher.tsx` | Port when i18n phase lands                          |

### New (this repo)

| Component                 | Purpose                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `verse-globe.tsx`         | Hero motif (§5)                                                                            |
| `reveal.tsx`              | Shared scroll-reveal wrapper (§6)                                                          |
| `product-card.tsx`        | One product: name, domain, one-liner, status badge (Live / Coming soon), CTA link          |
| `sections/hero.tsx`       | Copy + VerseGlobe composition                                                              |
| `sections/ecosystem.tsx`  | Product cards grid                                                                         |
| `sections/philosophy.tsx` | The Ish + Verse story — the naming, the thesis                                             |
| `sections/principles.tsx` | 3 principles (discipline > feeling · structure supports growth · consistency builds depth) |
| `sections/contact.tsx`    | contact@ishverse.com band                                                                  |
| `legal/prose.tsx`         | Typographic wrapper for privacy/terms pages                                                |

**Every source file** carries the standard header block (`Module / Context / Exports`) per `ishgospel-docs` convention, with `Context:` pointing at this file's section number.

---

## 9. Voice & Copy

Company-level voice = product voice, one level up. Calm, declarative, short sentences.

- Site tagline: **"Systems for Intentional Growth."**
- Hero support line, e.g.: _"IshVerse builds discipline systems — one for each domain of life. A man, in command of his world."_
- Section labels are Overline style: `PRODUCTS`, `THE NAME`, `PRINCIPLES`, `CONTACT`.
- Banned words: unleash, supercharge, revolutionize, blessed, journey (as filler), 🚀.
- Product one-liners come from BRAND.md positioning — IshGospel: _"A structured system for spiritual formation."_ IshRize: _"A structured system for academic discipline."_

---

## 10. Page Blueprints

### `/` — ishverse.com (company home)

1. **Hero** — VerseGlobe + display headline + two CTAs (primary → gospel.ishverse.com, secondary → IshRize "coming soon" anchor/subdomain)
2. **Ecosystem** — 2 product cards
3. **Philosophy** — what "Ish" and "Verse" mean; the thesis (NeuralField background band, dark treatment)
4. **Principles** — 3-up grid
5. **Contact** — single calm band, `contact@ishverse.com`
6. **Footer** — products, legal links, © IshVerse

### `/privacy` and `/terms` — company-wide legal

- Rendered in `legal/prose.tsx`: `max-w-prose`, generous line height, H2 anchors, "Last updated" date.
- One policy covers the company + all products (the Adobe model); product apps/stores link here.

### `rize.ishverse.com` — coming soon

- Same shell (header/footer), one screen: logo, one paragraph, "Notify me" mailto or waitlist. Served from this repo via subdomain middleware rewrite (see implementation plan).

---

## 11. Accessibility & Performance Budgets

- Lighthouse ≥ 95 on Performance / A11y / SEO / Best Practices — release gate, checked before every launch-tagged deploy.
- Text contrast ≥ 4.5:1 in both themes (gold on white fails for body text — gold is for graphics, icons, and large display accents only, never body copy).
- All interactive elements keyboard-reachable with visible `focus-visible` ring (`ring-accent`).
- Canvas layers are `aria-hidden="true"`; all meaning also exists as text.
- Images: `next/image`, explicit dimensions. Fonts: `next/font` (no layout shift, no FOIT).
- JS budget: no animation library (Framer Motion etc.) unless a concrete need is documented in `implementation_plan.md` first. Canvas + CSS + one IntersectionObserver hook cover this site.

---

## 12. Do / Don't

| Do                                        | Don't                                               |
| ----------------------------------------- | --------------------------------------------------- |
| Blue system, gold man — everywhere        | Introduce a third accent color                      |
| Port `NeuralField` and its perf patterns  | Rebuild animations from scratch                     |
| One VerseGlobe, in the hero               | Sprinkle globes/particles on every section          |
| Pure `#000` / `#FFF` backgrounds          | Gradients as backgrounds, warm tints                |
| Sentence-case, calm, short copy           | Hype, emojis in UI, exclamation marks               |
| `prefers-reduced-motion` static fallbacks | Motion with no fallback                             |
| Reuse `Section`, `Reveal`, tokens         | Arbitrary values (`mt-[37px]`, hex literals in JSX) |
| Abstract geometric human figure           | Literal person illustration, religious imagery      |
