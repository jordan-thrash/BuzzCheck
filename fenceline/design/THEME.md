# fenceline — "Property Line" design system

## Concept statement

**fenceline reads like a surveyor's field report on the neighborhood's
temperament.** Every community is a parcel; the verdict is a fence. The
surveyor conceit does two jobs at once: it makes the "receipts" texture
native (mono citations, title blocks, tick-mark rulers, dotted leaders,
dashed property lines), and it gives the brand a signature mark that is
literal to the name — a fence that grows taller and redder as the HOA
gets worse.

Tone in one line: *consumer advocacy with receipts — wry, specific, on
the buyer's side.* Copy sounds like a sharp friend who read the CC&Rs so
you didn't have to. Never corporate-neutral, never clickbait, never cruel.

Directions considered and rejected before this one: "The Covenant File"
(rubber-stamped verdicts on legalese paper — too novelty, poor list
scanning) and "Forecast" (HOA temperament as weather — gauge-dial cliché,
drifts from receipts). Property Line won because the signature glyph is
scannable down a list by silhouette alone and every data element inherits
a reason to look the way it does.

---

## The signature: the fence glyph

`components/FenceGlyph.tsx` — the one element a visitor remembers.

- **Five pickets, left to right, rising in height** (13 → 29 units on a
  60×34 viewBox). Two faint rails and a ground line behind them.
- **Tier N fills pickets 0…N** in that tier's canonical ramp color. The
  rest stay as ghost outlines (`card` fill, `line-strong` stroke).
- Chill = one short emerald picket. Hostile = a five-picket red wall.
- **Silhouette carries the reading without color** (more pickets = worse),
  so the scale survives color-vision deficiency; the adjacent tier word
  (always rendered by `TierBadge`) is the accessible label.
- SVG gets `role="img"` and `aria-label="Vibe: {Tier}, tier {n+1} of 5"`,
  or `aria-hidden` + `showLabel={false}` when a text label sits beside it.
- The 404 page's "ghost fence" (five dashed, unfilled pickets) is the only
  sanctioned variant. Do not invent others; do not animate the pickets.

**Never** render the vibe as stars, a number out of 5, a percentage, or a
single merged score. The tier word + fence glyph is the verdict, always.

## The vibe scale

Five tiers, derived — never voted directly:

```
score = 0.4 × strictness + 0.6 × toxicity      (both 0–100, higher worse)
<20 Chill · <40 Mellow · <60 Uptight · <80 Overbearing · ≥80 Hostile
```

Toxicity weighs heavier by design: a strict-but-fair building is livable;
a vindictive one is not. The two axes are **always displayed separately**
(`AxisMeter` ×2 on every profile) and never merged into a visible number.
All derivation lives in `lib/vibe.ts` — components never band values
themselves.

---

## Tokens

Defined in `app/globals.css` under Tailwind v4's `@theme`, which generates
utilities (`bg-paper`, `text-ink-soft`, `border-line`, `text-chill-deep`…).

### Color — surfaces & ink (warm paper, drafting ink)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#f5f2ea` | page ground (carries a faint dotted survey grid) |
| `card` | `#fdfbf5` | raised surfaces, cards, inputs on cards |
| `well` | `#eeeadf` | recessed strips: title-block headers, demo banner |
| `ink` | `#241f1a` | primary text |
| `ink-soft` | `#5c554b` | secondary text |
| `ink-faint` | `#857c6c` | micro-labels, metadata (large/bold text only) |
| `line` | `#ddd7c9` | hairline borders |
| `line-strong` | `#b9b19d` | emphasized rules, ghost-picket strokes, ticks |

### Color — brand accent (interactive only)

| Token | Hex | Use |
|---|---|---|
| `survey` | `#1f4d8a` | links, buttons, focus rings, the wordmark pickets |
| `survey-deep` | `#173a6a` | hover state |
| `survey-tint` | `#e4ebf5` | selected/tinted backgrounds |

Survey blue exists so the brand never competes with the ramp: **if it's
blue it's a control, if it's ramp-colored it's a verdict.** Never use
survey blue to signal quality, or ramp colors for interactivity.

### Color — the reserved severity ramp

These five hues are semantic and reserved. Nothing else on the site may
use them, and they may not be repurposed.

| Tier | Canonical fill | AA text (`-deep`) | Tint (`-tint`) |
|---|---|---|---|
| 0 Chill | `#059669` | `#047857` | `#ddefe6` |
| 1 Mellow | `#65a30d` | `#4d7c0f` | `#e9f0d6` |
| 2 Uptight | `#d97706` | `#92400e` | `#f9ecd4` |
| 3 Overbearing | `#ea580c` | `#9a3412` | `#fae3d6` |
| 4 Hostile | `#b91c1c` | `#991b1b` | `#f6dcdc` |

Rules of the ramp:

- **Canonical fills** are for shapes only: fence pickets, meter fills,
  card spines (`border-l-4`), legend swatches. Emerald/lime/amber at these
  values don't pass AA as small text — never set text in them.
- **`-deep` variants** are the only colored text (tier words, flagged
  values, stance chips). All pass WCAG AA (≥4.5:1) on `paper` and `card`.
- **Tints** are backgrounds for chips and notices, always paired with the
  same tier's `-deep` text.
- Stance chips reuse the ramp semantically: allowed = chill pair,
  conditional = uptight pair, banned = hostile pair. Red-flag notices use
  the hostile pair. This is deliberate — severity is one language
  everywhere.
- Meters band a single axis onto the ramp by value (`axisBand`: one tier
  color per 20 points).

### Type

- `--font-sans`: system stack (`ui-sans-serif, system-ui, …`). All prose,
  headings, UI.
- `--font-mono`: system mono stack (`ui-monospace, SF Mono, Menlo, …`).
  **Every number the product asserts** — dues, fines, rule counts, dates,
  percentages, formulas — renders in mono with `tabular-nums`. That's the
  "citations" texture; a stat set in the sans face is a bug.
- No webfonts, no font fetches, by policy. The design leans on weight,
  case, and tracking instead of typeface variety.

Two typographic utilities in `globals.css`:

- `.cite` — mono + tabular numerals + slight negative tracking. For data.
- `.label-micro` — 11px mono, uppercase, `0.08em` tracking. For section
  labels, chips, title blocks, metadata. This is the system's strongest
  identity signal after the glyph; use it for labels, never for prose.

Scale: Tailwind defaults (`text-xs` 12 → `text-4xl` 36). Page titles
`text-3xl font-bold tracking-tight`; section heads are either `text-lg
font-bold` or a `.label-micro` in `ink-faint` — prefer the micro-label
when the section is data, the bold sans when it's testimony.

### Spacing, radius, elevation

- **Spacing:** Tailwind's 4px scale. Cards pad `p-3`/`p-4`; page gutter
  `px-4`; max content width `max-w-6xl` (`max-w-2xl` for prose pages).
- **Radius:** drafted, not bubbly. `2px` chips → `3px` inputs/buttons →
  `4px` cards. Nothing rounder; no pills, no circles.
- **Elevation:** flat by default; hairline borders do the separating. One
  shadow token, `shadow-plot` (`0 1px 2px …0.05, 0 4px 14px …0.06`), for
  cards that invite interaction. Never stack shadows.

### Motif inventory (what makes it feel surveyed)

- Dotted-grid ground on `body` (radial-gradient at 26px, barely there).
- Tick marks every 10 points on meters (repeating-linear-gradient).
- Dotted leaders (`.leader`) between label and value in the parcel record.
- `§` reference numbers on parcel-record rows.
- Dashed borders = property lines (footer rule, empty states, ghost fence).
- Tier-colored `border-l-4` spine on community cards and verdict panels.

---

## Voice

- Headlines are declarative: "Know the board before you sign."
- Section labels are bureaucratic-deadpan: "Parcel record," "Resident
  testimony," "Dealbreaker index," "The docket."
- Board stance notes are written **in the board's own voice** and quoted —
  the character assassination is self-inflicted.
- Reviews cite specifics: dollar amounts, section numbers, dates, color
  names. "The board is mean" is off-brand; "a $50 fine 40 minutes past
  pickup, with a timestamped photo" is the brand.
- Never lorem ipsum, never placeholder names, never emoji in UI (lucide
  icons at 11–15px, `strokeWidth` 2.5 at chip size).

## Accessibility & restraint (non-negotiable)

- `prefers-reduced-motion` is respected globally; there is **no**
  decorative animation to begin with — only hover color transitions.
- Focus is one language: 2px `survey` outline, 2px offset, on
  `:focus-visible` (set globally in `globals.css`).
- Every colored-text token in use passes AA on its background; verify any
  new pair before adding it.
- Meters carry `role="meter"` + value attributes; glyphs carry labels or
  are hidden; icons are `aria-hidden` with adjacent text.
- Every layout must hold at **360px with zero horizontal scroll** (grids
  collapse to one column; the compare board compresses to chip grids).

## Data honesty

The demo-data notice lives in the header strip on every page, in the
footer, and in long form on `/about`. It is not dismissible and must not
be removed until real data replaces seed data. No fictional claim may
reference a real HOA, address, or person — seed locations are city-level
only, reviewer identities are role + tenure only.

## Extending the system

Adding a community: append to a file in `lib/seed/` (typed as
`Community`); the tier, flags, meters, and "why this tier" line derive
automatically — set `strictness`/`toxicity` and let `lib/vibe.ts` speak.
Write the 10 stance notes in the board's voice and give the card a
`tagline` that would survive being read aloud by a skeptical friend.

Adding a screen: paper ground, one `max-w-6xl` (or `2xl`) column,
micro-label section heads, mono data, and — only if a verdict appears —
the fence. If a new screen needs a color that isn't ink, survey, or a
ramp pair, the design has drifted; stop and reconsider.
