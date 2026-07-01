import { Flag } from "lucide-react";
import type { Community } from "@/lib/types";
import { money, TYPE_LABELS, weeks } from "@/lib/format";

/**
 * "By the numbers" as a surveyor's title block: mono labels, dotted
 * leaders, tabular values. Values that trip a red-flag threshold are
 * marked in place — the receipt and the warning are the same row.
 */
export function ParcelRecord({ community }: { community: Community }) {
  const rows: {
    label: string;
    value: string;
    ref: string;
    flagged?: boolean;
  }[] = [
    { label: "Monthly dues", value: `${money(community.duesMonthly)}/mo`, ref: "§1.1" },
    {
      label: "Rules on file",
      value: String(community.ruleCount),
      ref: "§2.0",
      flagged: community.ruleCount > 90,
    },
    {
      label: "Average fine",
      value: money(community.avgFine),
      ref: "§2.4",
      flagged: community.avgFine >= 150,
    },
    {
      label: "Board response",
      value: weeks(community.responseWeeks),
      ref: "§3.2",
      flagged: community.responseWeeks > 4,
    },
    { label: "Homes", value: community.homes.toLocaleString("en-US"), ref: "§4.0" },
    { label: "Founded", value: String(community.founded), ref: "§4.1" },
    { label: "Type", value: TYPE_LABELS[community.type], ref: "§4.2" },
  ];

  return (
    <section
      aria-label="By the numbers"
      className="rounded-[4px] border border-line-strong bg-card shadow-plot"
    >
      <header className="border-b border-line-strong bg-well px-3 py-2">
        <h2 className="label-micro font-bold text-ink-soft">
          Parcel record — by the numbers
        </h2>
      </header>
      <dl className="px-3 py-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline gap-2 border-b border-dotted border-line py-1.5 text-sm last:border-b-0"
          >
            <dt className="flex items-baseline gap-2 text-ink-soft">
              <span className="cite text-xs text-ink-faint">{row.ref}</span>
              {row.label}
            </dt>
            <span aria-hidden className="leader" />
            <dd
              className={`cite flex items-center gap-1.5 font-semibold ${
                row.flagged ? "text-hostile-deep" : "text-ink"
              }`}
            >
              {row.flagged && (
                <Flag size={11} strokeWidth={2.5} aria-label="Red flag" />
              )}
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
