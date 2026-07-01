export type CommunityType =
  | "single-family"
  | "condo"
  | "55+"
  | "townhome"
  | "equestrian"
  | "coastal";

export type Stance = "allowed" | "conditional" | "banned";

/** The 10 dealbreaker topics, in canonical display order. */
export const TOPICS = [
  "backyard-chickens",
  "rv-boat-parking",
  "short-term-rentals",
  "solar-panels",
  "exterior-paint",
  "fence-height",
  "yard-signs",
  "basketball-hoops",
  "holiday-lights",
  "flagpole",
] as const;

export type TopicId = (typeof TOPICS)[number];

export const TOPIC_LABELS: Record<TopicId, string> = {
  "backyard-chickens": "Backyard chickens",
  "rv-boat-parking": "RV / boat parking",
  "short-term-rentals": "Short-term rentals",
  "solar-panels": "Solar panels",
  "exterior-paint": "Exterior paint",
  "fence-height": "Fence height",
  "yard-signs": "Yard & political signs",
  "basketball-hoops": "Basketball hoops",
  "holiday-lights": "Holiday lights",
  "flagpole": "Flagpole",
};

export interface TopicStance {
  stance: Stance;
  /** One line, written in the board's own voice. */
  note: string;
}

/** 0 = Chill … 4 = Hostile */
export type VibeTier = 0 | 1 | 2 | 3 | 4;

export interface Review {
  id: string;
  /** Anonymous label only — e.g. "Owner, 6 yrs". Never a real name. */
  author: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** The reviewer's own read of the community, derived from their two axis ratings. */
  tierRead: VibeTier;
  body: string;
  pros?: string[];
  cons?: string[];
  recommend: boolean;
  /** Whether the reviewer approves of the current board. */
  boardApproval: boolean;
}

export interface Community {
  slug: string;
  name: string;
  /** Fictional location, e.g. "Plano, TX". */
  location: string;
  type: CommunityType;
  /** 0–100. Higher is worse: how heavy the rulebook is and how hard it's enforced. */
  strictness: number;
  /** 0–100. Higher is worse: selective enforcement, hostility, litigiousness. */
  toxicity: number;
  duesMonthly: number;
  ruleCount: number;
  avgFine: number;
  /** Board response time, in weeks. */
  responseWeeks: number;
  homes: number;
  founded: number;
  /** One wry line for the directory card — this community's hook. */
  tagline: string;
  blurb: string;
  stances: Record<TopicId, TopicStance>;
  reviews: Review[];
}
