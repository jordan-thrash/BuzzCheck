import type { Community } from "@/lib/types";
import { TOPICS, TOPIC_LABELS } from "@/lib/types";
import { StanceChip } from "./StanceChip";

/**
 * The 10 dealbreaker topics, each with the board's ruling and the board's
 * own one-line justification — quoted verbatim, which is usually damning
 * or charming enough on its own.
 */
export function StanceList({ community }: { community: Community }) {
  return (
    <section aria-label="Dealbreaker index">
      <h2 className="label-micro text-ink-faint">
        Dealbreaker index — 10 topics, the board&apos;s own words
      </h2>
      <ul className="mt-2 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2">
        {TOPICS.map((topic) => {
          const s = community.stances[topic];
          return (
            <li key={topic} className="bg-card p-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-ink">
                  {TOPIC_LABELS[topic]}
                </h3>
                <StanceChip stance={s.stance} />
              </div>
              <p className="mt-1.5 text-xs leading-snug text-ink-soft">
                <span className="text-ink-faint">Board: </span>
                &ldquo;{s.note}&rdquo;
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
