import type { Community, VibeTier } from "./types";

/**
 * The five-tier vibe scale. Never stars, never a 1–5 number.
 * Derived from the two axes — toxicity weighs heavier than strictness.
 */
export const TIERS = [
  {
    id: 0,
    key: "chill",
    name: "Chill",
    /** Canonical ramp fill (reserved semantic color). */
    color: "var(--color-chill)",
    /** AA-safe text variant on paper. */
    textClass: "text-chill-deep",
    tintClass: "bg-chill-tint",
    borderClass: "border-chill",
    gloss: "The board mostly mows the median and stays out of your life.",
  },
  {
    id: 1,
    key: "mellow",
    name: "Mellow",
    color: "var(--color-mellow)",
    textClass: "text-mellow-deep",
    tintClass: "bg-mellow-tint",
    borderClass: "border-mellow",
    gloss: "Rules exist and get enforced, but a human answers the email.",
  },
  {
    id: 2,
    key: "uptight",
    name: "Uptight",
    color: "var(--color-uptight)",
    textClass: "text-uptight-deep",
    tintClass: "bg-uptight-tint",
    borderClass: "border-uptight",
    gloss: "Expect paperwork, paint palettes, and the occasional petty fine.",
  },
  {
    id: 3,
    key: "overbearing",
    name: "Overbearing",
    color: "var(--color-overbearing)",
    textClass: "text-overbearing-deep",
    tintClass: "bg-overbearing-tint",
    borderClass: "border-overbearing",
    gloss: "The rulebook is a lifestyle and the board patrols it personally.",
  },
  {
    id: 4,
    key: "hostile",
    name: "Hostile",
    color: "var(--color-hostile)",
    textClass: "text-hostile-deep",
    tintClass: "bg-hostile-tint",
    borderClass: "border-hostile",
    gloss: "Selective enforcement, liens, lawyers. This HOA will sue you.",
  },
] as const;

export type TierInfo = (typeof TIERS)[number];

export function tierInfo(tier: VibeTier): TierInfo {
  return TIERS[tier];
}

/**
 * The one scoring rule on the site: toxicity outweighs strictness.
 * score = 0.4 × strictness + 0.6 × toxicity, banded into five tiers.
 */
export function vibeScore(strictness: number, toxicity: number): number {
  return 0.4 * strictness + 0.6 * toxicity;
}

export function deriveTier(strictness: number, toxicity: number): VibeTier {
  const s = vibeScore(strictness, toxicity);
  if (s < 20) return 0;
  if (s < 40) return 1;
  if (s < 60) return 2;
  if (s < 80) return 3;
  return 4;
}

export function communityTier(c: Community): VibeTier {
  return deriveTier(c.strictness, c.toxicity);
}

/** Band a single 0–100 axis value onto the same five-step ramp (for meters). */
export function axisBand(value: number): VibeTier {
  return Math.min(4, Math.floor(value / 20)) as VibeTier;
}

/**
 * One line under the verdict explaining *why* this tier —
 * keyed on the tier plus which axis is doing the damage.
 */
export function whyThisTier(c: Community): string {
  const tier = communityTier(c);
  const toxDriven = c.toxicity >= c.strictness;
  const lines: Record<number, [string, string]> = {
    // [strictness-driven, toxicity-driven]
    0: [
      "A short rulebook, loosely held. Nobody here is measuring your grass.",
      "A short rulebook, loosely held. Nobody here is measuring your grass.",
    ],
    1: [
      "The rulebook has some weight, but enforcement stays polite and predictable.",
      "Enforcement can get chatty, but the rulebook itself is light.",
    ],
    2: [
      "A heavy rulebook enforced by the letter — fair, but relentless about the letter.",
      "The rules are manageable; the mood of their enforcement is not always.",
    ],
    3: [
      "A dense rulebook enforced with enthusiasm bordering on hobby.",
      "It's less the rule count than who the rules get aimed at.",
    ],
    4: [
      "Maximum rulebook, maximum enforcement, and counsel on retainer.",
      "Selective enforcement with legal follow-through. The fines are personal here.",
    ],
  };
  return lines[tier][toxDriven ? 1 : 0];
}

export interface RedFlag {
  id: string;
  /** Short mono heading, violation-notice style. */
  label: string;
  /** The receipt: one specific sentence. */
  detail: string;
}

/** Auto-surfaced thresholds. These are the product's fixed tripwires. */
export function redFlags(c: Community): RedFlag[] {
  const flags: RedFlag[] = [];
  if (c.ruleCount > 90) {
    flags.push({
      id: "rules",
      label: `Rulebook · ${c.ruleCount} rules`,
      detail: `${c.ruleCount} enforceable rules on file. Past 90, compliance is a part-time job.`,
    });
  }
  if (c.avgFine >= 150) {
    flags.push({
      id: "fines",
      label: `Fine schedule · $${c.avgFine} avg`,
      detail: `Average fine of $${c.avgFine}. That's not a nudge, that's a revenue line.`,
    });
  }
  if (c.responseWeeks > 4) {
    flags.push({
      id: "response",
      label: `Stonewall · ${c.responseWeeks}-week response`,
      detail: `The board averages ${c.responseWeeks} weeks to answer. Your fine arrives faster.`,
    });
  }
  if (c.toxicity >= 60) {
    flags.push({
      id: "toxicity",
      label: `Selective enforcement · ${c.toxicity}/100`,
      detail: `Toxicity of ${c.toxicity}. Residents report enforcement that depends on who you are.`,
    });
  }
  return flags;
}

/** Share of reviews that recommend, as a whole percentage — or null if no reviews. */
export function recommendPct(
  reviews: { recommend: boolean }[]
): number | null {
  if (reviews.length === 0) return null;
  return Math.round(
    (reviews.filter((r) => r.recommend).length / reviews.length) * 100
  );
}
