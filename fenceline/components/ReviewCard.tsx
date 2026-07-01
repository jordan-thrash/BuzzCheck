import { ThumbsDown, ThumbsUp } from "lucide-react";
import type { Review } from "@/lib/types";
import { shortDate } from "@/lib/format";
import { TierBadge } from "./TierBadge";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[4px] border border-line bg-card p-4 shadow-plot">
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="cite text-xs text-ink-soft">
          <span className="font-semibold text-ink">{review.author}</span>
          <span className="text-ink-faint"> · {shortDate(review.date)}</span>
        </div>
        <TierBadge tier={review.tierRead} glyphWidth={32} />
      </header>

      <p className="mt-3 text-sm leading-relaxed text-ink">{review.body}</p>

      {(review.pros?.length || review.cons?.length) ? (
        <div className="mt-3 grid gap-3 border-t border-dotted border-line-strong pt-3 sm:grid-cols-2">
          {review.pros && review.pros.length > 0 && (
            <div>
              <h4 className="label-micro text-chill-deep">Pros</h4>
              <ul className="mt-1 space-y-1">
                {review.pros.map((p) => (
                  <li key={p} className="text-xs leading-snug text-ink-soft">
                    + {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons && review.cons.length > 0 && (
            <div>
              <h4 className="label-micro text-hostile-deep">Cons</h4>
              <ul className="mt-1 space-y-1">
                {review.cons.map((c) => (
                  <li key={c} className="text-xs leading-snug text-ink-soft">
                    − {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}

      <footer className="label-micro mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-dotted border-line-strong pt-2.5">
        <span
          className={`inline-flex items-center gap-1 font-bold ${
            review.recommend ? "text-chill-deep" : "text-hostile-deep"
          }`}
        >
          {review.recommend ? (
            <ThumbsUp size={11} strokeWidth={2.5} aria-hidden />
          ) : (
            <ThumbsDown size={11} strokeWidth={2.5} aria-hidden />
          )}
          {review.recommend ? "Would recommend" : "Would not recommend"}
        </span>
        <span className="text-ink-faint">
          Approves of board: {review.boardApproval ? "yes" : "no"}
        </span>
      </footer>
    </article>
  );
}
