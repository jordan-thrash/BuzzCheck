# Fenceline — Progress Log

An append-only log of build cycles. Newest entries on top. Each cycle records
**what** changed, **why**, what was **verified**, and what's **still weak**.

> North star: a buyer/renter opens Fenceline and within 30 seconds gets an honest
> read on what living under a specific HOA is actually like — strict, toxic, or chill.

---

## Cycle 1 — Foundation: the artifact, the swatch, and the core flows
**Date:** 2026-06-29

**What changed**
- Created `fenceline.html` — a self-contained, open-and-run prototype (no build step).
- Established the **signature swatch-strip rating**: the "approved palette" scale
  Chill → Mellow → Strict → Tense → Toxic, used as the legend, on every directory
  card, in a large swatch panel on the detail page, on each review, and as the
  rating control in the post-review form.
- Seeded **8 fictional communities**, each with a distinct, believable personality
  (chill volunteer board → litigious nightmare board), with concrete, specific copy
  (wrong-brown mulch + paint-chip code, $50 trash-can fine 40 min late, 3 weeks for a
  white storm door, liens over $410).
- Built the **core flows**: search (name/city/blurb), sort (vibe/dues/rules/fine/
  response/reviews), open a community, and **post a review** persisted to
  `localStorage` so submissions survive a reload.
- Shipped several high-value backlog items in the first pass because they define the
  product, not decorate it:
  - **"Will I get fined for ___?" lookup** — per-HOA Allowed / Conditional / Banned
    map over the requests buyers actually ask (chickens, RV, solar, STR, paint, etc.).
  - **Strictness vs. Toxicity** shown as two honest axes/meters, separate from the
    single blended vibe swatch.
  - **Review distribution histogram** with automatic "divided board" detection.
  - **Auto-surfaced red flags** (>90 rules, ≥$150 fine, ≥4-wk response, high toxicity).
  - **"How the vibe score works"** credibility disclosure dialog.
- Data rendered in a **mono face** (dues, rule counts, fines, response times) to echo
  violation codes / citations.
- Restraint held: boldness spent only on the swatch; everything else is quiet greige,
  hairline borders, one subtle card hover. `prefers-reduced-motion` respected.
- Accessibility: skip link, visible focus rings, semantic buttons/articles, ARIA
  labels on the swatch controls, keyboard-operable throughout, hash-based routing with
  working back/forward.
- Left the unrelated BuzzCheck files untouched (different project that pre-existed on
  this repo); Fenceline ships as additive new files.

**Why**
- Cycle 1 has to make the north star real end-to-end, not just scaffold it. A buyer
  needs the vibe read, the fined-for answers, and real reviews on first open — so those
  came first. The fined-for lookup and the strict/toxic split are the two ideas that
  most differentiate Fenceline from a star-rating site, so they're in from day one.

**Verified**
- Rendered headless (Chromium/Playwright): no console errors on load.
- Core flows click through: search filters, sort reorders, opening a community renders
  the full detail page, posting a review persists and re-renders the histogram.
- Holds up at 390px mobile width (datarow collapses to 2-col, axes stack).
- Keyboard focus visible; reduced-motion disables transitions.

**Still weak / noticed**
- Only 8 communities — directory could feel richer with more, and with variety in
  amenities/types (condo vs. SFH vs. 55+).
- No compare mode yet (side-by-side 2–3 communities).
- Reviews aren't sortable/filterable yet (recency vs. verified-first).
- No loading/error states (data is inline so there's no async, but contribute-a-
  community flow would need them).
- Fined-for lookup isn't searchable across communities ("who allows chickens?").
- No way to add a brand-new community (contribute flow).
