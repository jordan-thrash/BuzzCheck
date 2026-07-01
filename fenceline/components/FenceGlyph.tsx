import type { VibeTier } from "@/lib/types";
import { TIERS } from "@/lib/vibe";

/**
 * The signature vibe-scale mark: a five-picket fence read left to right.
 * Pickets grow taller as the tier worsens; tier N fills pickets 0…N in the
 * tier's ramp color, the rest stay as ghost outlines. A Chill community is
 * one short green picket; a Hostile one is a five-picket red wall.
 * Silhouette carries the reading even without color.
 */
export function FenceGlyph({
  tier,
  width = 60,
  showLabel = true,
  className,
}: {
  tier: VibeTier;
  /** Rendered width in px; height scales at 34/60. */
  width?: number;
  /** When false, the SVG is decorative (a text label must sit adjacent). */
  showLabel?: boolean;
  className?: string;
}) {
  const info = TIERS[tier];
  const heights = [13, 17, 21, 25, 29];
  const pickets = heights.map((h, i) => {
    const x = 4 + i * 11; // 8px picket + 3px gap
    const top = 32 - h;
    const filled = i <= tier;
    return (
      <path
        key={i}
        d={`M${x} ${top + 3} L${x + 4} ${top} L${x + 8} ${top + 3} L${x + 8} 32 L${x} 32 Z`}
        fill={filled ? info.color : "var(--color-card)"}
        stroke={filled ? "none" : "var(--color-line-strong)"}
        strokeWidth={filled ? 0 : 1.2}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 60 34"
      width={width}
      height={Math.round((width * 34) / 60)}
      className={className}
      role={showLabel ? "img" : undefined}
      aria-label={
        showLabel ? `Vibe: ${info.name}, tier ${tier + 1} of 5` : undefined
      }
      aria-hidden={showLabel ? undefined : true}
    >
      {/* rails */}
      <rect x="2" y="21.5" width="56" height="2" fill="var(--color-line)" />
      <rect x="2" y="27.5" width="56" height="2" fill="var(--color-line)" />
      {pickets}
      {/* ground line */}
      <rect x="0" y="32" width="60" height="1.5" fill="var(--color-ink-faint)" />
    </svg>
  );
}
