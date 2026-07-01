import type { VibeTier } from "@/lib/types";
import { tierInfo } from "@/lib/vibe";
import { FenceGlyph } from "./FenceGlyph";

/** Inline tier word with its glyph — the compact verdict used in lists and reviews. */
export function TierBadge({
  tier,
  glyphWidth = 36,
}: {
  tier: VibeTier;
  glyphWidth?: number;
}) {
  const info = tierInfo(tier);
  return (
    <span className="inline-flex items-center gap-2">
      <FenceGlyph tier={tier} width={glyphWidth} showLabel={false} />
      <span className={`label-micro font-bold ${info.textClass}`}>
        {info.name}
      </span>
    </span>
  );
}
