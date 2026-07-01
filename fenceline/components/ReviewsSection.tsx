"use client";

import Link from "next/link";
import { PenLine } from "lucide-react";
import type { Review } from "@/lib/types";
import { useLocalReviews } from "@/lib/reviews";
import { recommendPct } from "@/lib/vibe";
import { ReviewCard } from "./ReviewCard";

/**
 * Seed reviews plus anything the visitor has filed from this browser
 * (localStorage — the demo has no backend). Renders seed-only on the
 * server; local reviews merge in after mount.
 */
export function ReviewsSection({
  slug,
  seedReviews,
}: {
  slug: string;
  seedReviews: Review[];
}) {
  const local = useLocalReviews(slug);
  const all = [...local, ...seedReviews];
  const pct = recommendPct(all);
  const approvePct =
    all.length > 0
      ? Math.round((all.filter((r) => r.boardApproval).length / all.length) * 100)
      : null;

  return (
    <section aria-label="Resident reviews">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-ink">
            Resident testimony
            <span className="cite ml-2 text-sm font-normal text-ink-faint">
              ({all.length} on record)
            </span>
          </h2>
          {pct !== null && (
            <p className="cite mt-1 text-xs text-ink-soft">
              {pct}% would recommend · {approvePct}% approve of the board
            </p>
          )}
        </div>
        <Link
          href={`/hoa/${slug}/review/`}
          className="inline-flex items-center gap-1.5 rounded-[3px] bg-survey px-3 py-2 text-sm font-semibold text-white hover:bg-survey-deep"
        >
          <PenLine size={14} aria-hidden />
          File a review
        </Link>
      </div>

      {local.length > 0 && (
        <p className="label-micro mt-3 rounded-[3px] border border-survey/30 bg-survey-tint px-2.5 py-1.5 text-survey-deep">
          Includes {local.length} review{local.length === 1 ? "" : "s"} filed
          from this browser — stored locally, visible only to you.
        </p>
      )}

      <div className="mt-3 space-y-3">
        {all.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </section>
  );
}
