import { axisBand, TIERS } from "@/lib/vibe";

/**
 * A survey-ruler meter for one 0–100 axis. Higher is worse on both axes,
 * so the fill takes the ramp color of the value's band. Ticks every 10.
 */
export function AxisMeter({
  label,
  value,
  caption,
}: {
  label: string;
  value: number;
  caption: string;
}) {
  const band = TIERS[axisBand(value)];
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={`${label}: ${value} of 100`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="label-micro text-ink-soft">{label}</span>
        <span className="cite text-sm font-semibold text-ink">
          {value}
          <span className="text-ink-faint"> / 100</span>
        </span>
      </div>
      <div
        className="relative mt-1.5 h-2.5 rounded-[2px] border border-line-strong bg-card"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, transparent 0, transparent calc(10% - 1px), var(--color-line) calc(10% - 1px), var(--color-line) 10%)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-l-[1px]"
          style={{ width: `${value}%`, backgroundColor: band.color }}
        />
      </div>
      <p className="mt-1 text-xs text-ink-faint">{caption}</p>
    </div>
  );
}
