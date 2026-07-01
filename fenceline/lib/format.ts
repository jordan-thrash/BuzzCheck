import type { CommunityType } from "./types";

export function money(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function weeks(n: number): string {
  return n === 1 ? "1 wk" : `${n} wks`;
}

export const TYPE_LABELS: Record<CommunityType, string> = {
  "single-family": "Single-family",
  condo: "Condo",
  "55+": "55+ active adult",
  townhome: "Townhome",
  equestrian: "Equestrian",
  coastal: "Coastal",
};

/** "2025-11-04" → "Nov 2025" (UTC-stable, no Date locale surprises). */
export function shortDate(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[(m ?? 1) - 1]} ${y}`;
}
