# Fenceline — Progress Log

An append-only log of build cycles. Newest entries on top. Each cycle records
**what** changed, **why**, what was **verified**, and what's **still weak**.

> North star: a buyer/renter opens Fenceline and within 30 seconds gets an honest
> read on what living under a specific HOA is actually like — strict, toxic, or chill.

---

## Cycle 3 — Cross-community "dealbreaker" search + unified stances data
**Date:** 2026-06-29

**What changed**
- Refactored the per-HOA `fined` arrays (6 ad-hoc, inconsistent topics each) into a
  **complete `stances` map** covering the same **10 canonical dealbreaker topics** for
  every community: chickens, RV/boat, short-term rental, solar, paint, fence, yard signs,
  basketball hoop, holiday lights, flagpole. 80 short, in-character verdict+note pairs —
  real content, no placeholders. This makes coverage complete and consistent.
- Added the **"I want to be able to…" dealbreaker lens** on the directory — the flip side
  of the per-HOA lookup. Pick a topic and every card grows a verdict strip
  (Allowed / Conditional / Banned + the one-line note); the directory **re-sorts
  allowed-first**, a **"Hide where it's banned"** filter appears, and the count line reads
  "where you can keep backyard chickens — 2 allow or permit with conditions." This is
  discovery by dealbreaker, which is how buyers with a hard requirement actually shop.
- The per-community **"Will I get fined for…?"** lookup now renders all 10 topics from the
  same `stances` data; **compare** rows do too — one source of truth, three surfaces.
- Sort control disables while a lens is active (the lens drives order).

**Why**
- The fined-for lookup is the killer transparency feature, but per-community it only helps
  once you're already looking at a community. A buyer whose dealbreaker is "I need to keep
  my boat" wants to start from the dealbreaker and see who allows it. Cross-community
  search closes that loop and turns the directory into a real shortlisting tool.

**Subtracted**
- Removed the `COMPARE_TOPICS` keyword list and the `verdictFor()` fuzzy-matching hack —
  compare now reads `stances` directly. Also retired the grab-bag of one-off topics
  (Clothesline, Mailbox style, Pressure-washing, Storm door, Desert landscaping, Trash-can
  storage, Vegetable garden) in favor of the consistent 10. Less code, cleaner data.

**Verified**
- Headless, no console errors. 10 chips; activating one adds a verdict row to all 8 cards,
  disables sort, sorts allowed-first; "Hide banned" narrows chickens→2, STR→3; Clear
  restores. Detail lookup renders 10 items; compare renders 18 rows (8 metrics + 10
  topics). Screenshot reviewed.

**Still weak / noticed**
- Reviews still not sortable/filterable (verified-first / recency).
- Directory has search + lens but no combined filter panel (tier + dues + lens together).
- Still 8 communities; with full stances, more communities now scale cleanly.
- No contribute-a-community flow.

## Cycle 2 — Compare mode (pin 2–3 communities, side by side)
**Date:** 2026-06-29

**What changed**
- Added **Compare mode**, the top backlog item. A buyer choosing between neighborhoods
  can now pin up to 3 communities and see them side by side.
- Each directory card grew a quiet **"+ Compare" / "✓ Comparing"** footer button.
  Restructured the card from a single `<button>` into a container holding a `card-open`
  button (opens detail) and a sibling `card-compare` button — no nested buttons, valid
  and keyboard-accessible.
- A **sticky compare tray** appears when ≥1 is pinned: swatch-dot chips with remove (×),
  a live "n of 3 pinned" count, Clear, and a Compare button (disabled until 2+).
- The **compare view** is a semantic `<table>`: swatch-strip column headers, then rows
  for vibe, strictness, toxicity, dues, rules, avg fine, board response, red flags, and
  six canonical "fined-for" topics (chickens, RV/boat, STR, solar, paint, fence) matched
  loosely against each HOA's stance and shown as Allowed/Conditional/Banned pills.
- **Encodes the philosophy:** lower dues/rules/fines/response and lower *toxicity* get a
  green "◀" best marker — but strictness deliberately does NOT, because strict isn't bad,
  toxic is. Header copy says so explicitly.
- Hash-routed (`#compare`) with working back/forward; horizontal-scroll on mobile.

**Why**
- Comparison is the decision a buyer actually makes — rarely "is this HOA good?" but
  "which of these two should I sign for?" Putting dues, fines, and dealbreaker stances in
  one glance is the most direct service to the north star after the core read itself.

**Subtracted**
- Removed the card's `translateY(-1px)` hover lift. Extra motion reads as AI filler; the
  brief says spend boldness only on the swatch. Hover is now just a quiet border/shadow.

**Verified**
- Headless: no console errors. Pin 2 and 3, open compare (14 rows, correct columns,
  10 verdict pills), back, then open a detail page — all work. Tray show/hide and the
  2+ gate behave. Full-page screenshot reviewed.

**Still weak / noticed**
- Reviews still not sortable/filterable (verified-first, recency).
- No cross-community "who allows chickens?" search yet — compare answers it for a chosen
  few, but not for discovery.
- Only 8 communities; compare would shine with more variety (condo/55+/townhome).
- Compare can't be reached from a detail page (only from the directory tray).

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
