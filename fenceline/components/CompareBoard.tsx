"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Community } from "@/lib/types";
import { TOPICS, TOPIC_LABELS } from "@/lib/types";
import { communityTier, tierInfo } from "@/lib/vibe";
import { money, weeks } from "@/lib/format";
import { FenceGlyph } from "./FenceGlyph";
import { StanceChip } from "./StanceChip";

const EMPTY = "";
const selectClass =
  "h-9 w-full rounded-[3px] border border-line-strong bg-card px-2 text-sm text-ink";

function Board({ communities }: { communities: Community[] }) {
  const searchParams = useSearchParams();
  // The first column can be pre-seeded from /compare/?a=<slug> links on profiles.
  const [slugs, setSlugs] = useState<string[]>(() => {
    const a = searchParams.get("a");
    const valid = a && communities.some((c) => c.slug === a);
    return [valid ? a : EMPTY, EMPTY, EMPTY];
  });

  const chosen = slugs
    .map((s) => communities.find((c) => c.slug === s))
    .filter((c): c is Community => Boolean(c));

  const cols =
    chosen.length === 3 ? "grid-cols-3" : chosen.length === 2 ? "grid-cols-2" : "grid-cols-1";

  const metricRow = (
    label: string,
    render: (c: Community) => React.ReactNode
  ) => (
    <div className="border-t border-dotted border-line-strong py-2">
      <p className="label-micro text-ink-faint">{label}</p>
      <div className={`mt-1 grid gap-2 ${cols}`}>
        {chosen.map((c) => (
          <div key={c.slug} className="cite text-sm font-semibold text-ink">
            {render(c)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-3">
        {slugs.map((slug, i) => (
          <label key={i}>
            <span className="label-micro mb-1 block text-ink-faint">
              Parcel {String.fromCharCode(65 + i)}
              {i === 2 ? " (optional)" : ""}
            </span>
            <select
              value={slug}
              onChange={(e) =>
                setSlugs((prev) => {
                  const next = [...prev];
                  next[i] = e.target.value;
                  return next;
                })
              }
              className={selectClass}
            >
              <option value={EMPTY}>—</option>
              {communities.map((c) => (
                <option
                  key={c.slug}
                  value={c.slug}
                  disabled={slugs.includes(c.slug) && slug !== c.slug}
                >
                  {c.name} ({c.location})
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      {chosen.length < 2 ? (
        <div className="mt-6 rounded-[4px] border border-dashed border-line-strong bg-card p-8 text-center">
          <p className="font-semibold text-ink">Pick at least two parcels.</p>
          <p className="mt-1 text-sm text-ink-soft">
            The fences line up side by side — the shorter, greener one wins.
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-[4px] border border-line bg-card p-4 shadow-plot">
          {/* Verdicts */}
          <div className={`grid gap-2 ${cols}`}>
            {chosen.map((c) => {
              const tier = communityTier(c);
              const info = tierInfo(tier);
              return (
                <div key={c.slug} className="min-w-0">
                  <Link
                    href={`/hoa/${c.slug}/`}
                    className="block truncate text-sm font-semibold text-ink underline-offset-4 hover:text-survey hover:underline"
                  >
                    {c.name}
                  </Link>
                  <p className="label-micro text-ink-faint">{c.location}</p>
                  <FenceGlyph tier={tier} width={64} className="mt-2" />
                  <p className={`label-micro mt-1 font-bold ${info.textClass}`}>
                    {info.name}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            {metricRow("Strictness (0–100, higher is worse)", (c) => c.strictness)}
            {metricRow("Toxicity (0–100, higher is worse)", (c) => c.toxicity)}
            {metricRow("Monthly dues", (c) => `${money(c.duesMonthly)}/mo`)}
            {metricRow("Rules on file", (c) => c.ruleCount)}
            {metricRow("Average fine", (c) => money(c.avgFine))}
            {metricRow("Board response", (c) => weeks(c.responseWeeks))}
            {metricRow("Homes", (c) => c.homes.toLocaleString("en-US"))}
          </div>

          {/* Dealbreakers */}
          <h2 className="label-micro mt-6 text-ink-faint">Dealbreaker index</h2>
          <div className="mt-1">
            {TOPICS.map((topic) => (
              <div
                key={topic}
                className="border-t border-dotted border-line-strong py-2"
              >
                <p className="text-xs font-semibold text-ink">
                  {TOPIC_LABELS[topic]}
                </p>
                <div className={`mt-1.5 grid gap-2 ${cols}`}>
                  {chosen.map((c) => (
                    <div key={c.slug}>
                      <StanceChip stance={c.stances[topic].stance} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CompareBoard({ communities }: { communities: Community[] }) {
  // useSearchParams requires a Suspense boundary under static export.
  return (
    <Suspense fallback={null}>
      <Board communities={communities} />
    </Suspense>
  );
}
