import type { Community } from "../types";
import { CHILL_MELLOW } from "./chill-mellow";
import { UPTIGHT } from "./uptight";
import { OVERBEARING_HOSTILE } from "./overbearing-hostile";

/**
 * The full demo directory: 12 fictional communities.
 * Every community, person, review, and event in this dataset is invented.
 * Nothing here refers to a real HOA, address, or person.
 */
export const COMMUNITIES: Community[] = [
  ...CHILL_MELLOW,
  ...UPTIGHT,
  ...OVERBEARING_HOSTILE,
];

export function getCommunity(slug: string): Community | undefined {
  return COMMUNITIES.find((c) => c.slug === slug);
}
