import { TIERS } from "@/lib/vibe";
import type { VibeTier } from "@/lib/types";
import { FenceGlyph } from "./FenceGlyph";

/**
 * The five-tier key, shown once on the directory so a first-time visitor
 * learns the scale before scanning the grid.
 */
export function TierLegend() {
  return (
    <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-5">
      {TIERS.map((t) => (
        <li
          key={t.key}
          className="flex items-center gap-2.5 bg-card px-3 py-2 sm:flex-col sm:items-start sm:gap-1.5"
        >
          <FenceGlyph tier={t.id as VibeTier} width={44} showLabel={false} />
          <div>
            <p className={`label-micro font-bold ${t.textClass}`}>{t.name}</p>
            <p className="mt-0.5 hidden text-xs leading-snug text-ink-faint lg:block">
              {t.gloss}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
