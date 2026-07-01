# fenceline

**Know the board before you sign.** Anonymous resident reviews plus hard
numbers — dues, fines, rule counts, board response times — for the HOA
behind the listing, readable in under 30 seconds.

Pre-launch demo: every community and review is fictional. See `/about`
on the site and `design/THEME.md` for the design system ("Property
Line" — a surveyor's field report on the neighborhood's temperament).

## Stack

Next.js (App Router) + TypeScript + Tailwind v4, exported statically
(`output: "export"`). No backend, no credentials: seed data is a typed
TS module (`lib/seed/`), and user-submitted reviews persist to
`localStorage`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # static export to out/
```

## Deploy (Netlify)

Set the site's **base directory** to `fenceline/` — the included
`netlify.toml` builds with `npm run build` and publishes `out/`. Zero
environment variables required.

## Map

- `app/` — directory (`/`), profile (`/hoa/[slug]`), composer
  (`/hoa/[slug]/review`), compare, feed, about, gate, 404
- `components/` — `FenceGlyph` (the signature vibe mark), meters, cards,
  the filterable directory
- `lib/vibe.ts` — the one scoring rule: `0.4·strictness + 0.6·toxicity`,
  banded into five tiers; red-flag thresholds
- `lib/seed/` — 12 fictional communities with reviews and dealbreaker
  stances
- `design/THEME.md` — the design system contract
