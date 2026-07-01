import Link from "next/link";
import { Flag } from "lucide-react";
import type { Community } from "@/lib/types";
import { communityTier, redFlags, tierInfo } from "@/lib/vibe";
import { money, TYPE_LABELS, weeks } from "@/lib/format";
import { FenceGlyph } from "./FenceGlyph";

/**
 * The directory unit. Built so a column of these sorts visually by vibe
 * before a single word is read: tier-colored spine, fence glyph, tier word.
 */
export function CommunityCard({ community }: { community: Community }) {
  const tier = communityTier(community);
  const info = tierInfo(tier);
  const flagCount = redFlags(community).length;

  return (
    <Link
      href={`/hoa/${community.slug}/`}
      className="group block rounded-[4px]"
    >
      <article
        className={`h-full rounded-[4px] border border-line border-l-4 ${info.borderClass} bg-card p-4 shadow-plot transition-colors group-hover:border-r-survey group-hover:border-y-survey`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-ink group-hover:text-survey">
              {community.name}
            </h3>
            <p className="label-micro mt-0.5 text-ink-faint">
              {community.location} · {TYPE_LABELS[community.type]}
            </p>
          </div>
          <FenceGlyph tier={tier} width={54} className="shrink-0" />
        </div>

        <p className="mt-2.5">
          <span className={`label-micro font-bold ${info.textClass}`}>
            {info.name}
          </span>
          <span className="mt-0.5 block text-sm leading-snug text-ink-soft">
            {community.tagline}
          </span>
        </p>

        <dl className="cite mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-dotted border-line-strong pt-2.5 text-xs text-ink-soft">
          <div>
            <dt className="sr-only">Monthly dues</dt>
            <dd>{money(community.duesMonthly)}/mo</dd>
          </div>
          <div>
            <dt className="sr-only">Rule count</dt>
            <dd>{community.ruleCount} rules</dd>
          </div>
          <div>
            <dt className="sr-only">Average fine</dt>
            <dd>{money(community.avgFine)} avg fine</dd>
          </div>
          <div>
            <dt className="sr-only">Board response time</dt>
            <dd>{weeks(community.responseWeeks)} resp</dd>
          </div>
          {flagCount > 0 && (
            <div className="ml-auto">
              <dt className="sr-only">Red flags</dt>
              <dd className="flex items-center gap-1 font-semibold text-hostile-deep">
                <Flag size={11} strokeWidth={2.5} aria-hidden />
                {flagCount} {flagCount === 1 ? "flag" : "flags"}
              </dd>
            </div>
          )}
        </dl>
      </article>
    </Link>
  );
}
