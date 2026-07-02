# IshVerse Web

**The company site for IshVerse — Systems for Intentional Growth.**

Deployed at [ishverse.com](https://ishverse.com). Presents the Ish ecosystem — [IshGospel](https://gospel.ishverse.com) (spiritual discipline) and IshRize (academic discipline, coming soon) — and hosts company-wide legal pages.

---

## Stack

| Layer     | Technology                                          |
| --------- | --------------------------------------------------- |
| Framework | Next.js 16 (App Router) · React 19                  |
| Language  | TypeScript (strict)                                 |
| Styling   | Tailwind CSS v4 (design tokens via `@theme inline`) |
| Theming   | `next-themes` — pure black / pure white, OS default |
| Icons     | `lucide-react`                                      |
| Animation | Canvas 2D + CSS only (no animation libraries)       |
| Hosting   | Vercel                                              |

## Documentation

| File                                             | Purpose                                                     |
| ------------------------------------------------ | ----------------------------------------------------------- |
| [DESIGN.md](DESIGN.md)                           | The design specification — read before building any UI      |
| [implementation_plan.md](implementation_plan.md) | Phased plan, tech decisions, domains                        |
| [AGENTS.md](AGENTS.md)                           | AI agent / developer context                                |
| `../ishgospel-docs/`                             | Ecosystem source of truth (brand, workflow, infrastructure) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build
```

## Workflow

Branches follow `ishgospel-docs/CONTRIBUTING.md`: `feature/*` from `dev` → PR → squash merge → delete. `main` and `dev` are protected; CI runs typecheck · lint · build on every PR.

---

© IshVerse. All rights reserved.
