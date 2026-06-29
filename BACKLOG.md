# Fenceline — Backlog

Prioritized by impact on the **north star** (honest read on a specific HOA in <30s).
Re-rank every cycle. `[x]` = shipped (kept here briefly for memory, then pruned).

## Shipped in Cycle 1
- [x] Swatch-strip rating (Chill→Toxic) as the signature element
- [x] Seed directory (8 communities) with specific, non-lorem copy
- [x] Search + sort the directory
- [x] Open a community → full detail page
- [x] Post a review, persisted to localStorage
- [x] "Will I get fined for ___?" lookup (Allowed/Conditional/Banned)
- [x] Strictness vs. Toxicity as two separate axes
- [x] Review distribution histogram + divided-board detection
- [x] Auto-surfaced red flags
- [x] "How the vibe score works" disclosure

## Shipped in Cycle 2
- [x] Compare mode — pin 2–3, side-by-side table with fined-for stances

## Shipped in Cycle 3
- [x] Unified 10-topic `stances` data for every community
- [x] Cross-community "dealbreaker" lens (where can I keep chickens?) + hide-banned

## Next up (high leverage)
1. **More seed communities (→ ~12–14)** with type variety (condo HOA, 55+, townhome,
   master-planned). Now that stances + reviews are structured, more communities make the
   directory, lens, and compare all feel alive — and make the lens results meaningful
   (right now some topics return only 2–3 matches).
2. **Sort & filter reviews** — recency vs. verified-first; filter to verified residents.
   Trust signals: weight/badge verified, show recency prominently.
3. **Combined filter panel** — tier + dues range alongside the lens, so a buyer can say
   "chill-ish AND allows chickens AND under $150/mo." Pairs with the lens.
4. **Tighten the lens count copy** when hide-banned is on (currently slightly redundant).

## Later (polish & credibility)
6. **Contribute-a-community flow** — add a new HOA + its fined-for stances, persisted.
   Needs empty/loading/error states and validation.
7. **Helpful/agree voting on reviews** + "most helpful" sort.
8. **Review recency signal** on cards ("last reviewed 2 weeks ago" / "stale").
9. **Shareable deep links** polish (already hash-routed; add copy-link affordance).
10. **Accessibility deep pass** — screen-reader walkthrough of swatch semantics, form
    error focus management, dialog focus trap.
11. **"Trend" hint** — is the board getting stricter/calmer? (derive from review dates).
12. **Print / save-as-PDF view** of a community's read for sharing with a partner/agent.

## Guardrail reminders
- Keep all communities & people fictional; keep the visible "demo data" note.
- Don't drift to a template; protect the greige + swatch identity.
- Each cycle: ship ONE coherent improvement, and SUBTRACT one thing that isn't earning
  its place. Leave it openable at every commit.
