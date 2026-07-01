"use client";

import Link from "next/link";
import type { Community, Review } from "@/lib/types";
import { communityTier, tierInfo } from "@/lib/vibe";
import { useLocalReviewStore } from "@/lib/reviews";
import { ReviewCard } from "./ReviewCard";

interface FeedEntry {
  review: Review;
  community: Community;
}

/** Every review on the site, newest first — seed plus this browser's own filings. */
export function FeedList({ communities }: { communities: Community[] }) {
  const local = useLocalReviewStore();

  const entries: FeedEntry[] = communities
    .flatMap((community) => [
      ...(local[community.slug] ?? []).map((review) => ({ review, community })),
      ...community.reviews.map((review) => ({ review, community })),
    ])
    .sort((a, b) => b.review.date.localeCompare(a.review.date));

  return (
    <ol className="mt-6 space-y-4">
      {entries.map(({ review, community }) => {
        const info = tierInfo(communityTier(community));
        return (
          <li key={review.id}>
            <p className="mb-1 flex flex-wrap items-baseline gap-x-2 text-sm">
              <Link
                href={`/hoa/${community.slug}/`}
                className="font-semibold text-ink underline-offset-4 hover:text-survey hover:underline"
              >
                {community.name}
              </Link>
              <span className="label-micro text-ink-faint">
                {community.location}
              </span>
              <span className={`label-micro font-bold ${info.textClass}`}>
                {info.name}
              </span>
            </p>
            <ReviewCard review={review} />
          </li>
        );
      })}
    </ol>
  );
}
