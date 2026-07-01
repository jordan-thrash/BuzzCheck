"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Community, CommunityType, TopicId, VibeTier } from "@/lib/types";
import { TOPICS, TOPIC_LABELS } from "@/lib/types";
import { communityTier, TIERS, vibeScore } from "@/lib/vibe";
import { TYPE_LABELS } from "@/lib/format";
import { CommunityCard } from "./CommunityCard";

type SortKey =
  | "vibe-best"
  | "vibe-worst"
  | "dues-low"
  | "dues-high"
  | "rules"
  | "response"
  | "name";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "vibe-best", label: "Vibe — chill first" },
  { key: "vibe-worst", label: "Vibe — hostile first" },
  { key: "dues-low", label: "Dues — low to high" },
  { key: "dues-high", label: "Dues — high to low" },
  { key: "rules", label: "Fewest rules" },
  { key: "response", label: "Fastest board" },
  { key: "name", label: "Name A–Z" },
];

const DUES_CAPS = [
  { value: 0, label: "Any dues" },
  { value: 100, label: "≤ $100/mo" },
  { value: 250, label: "≤ $250/mo" },
  { value: 400, label: "≤ $400/mo" },
  { value: 700, label: "≤ $700/mo" },
];

const selectClass =
  "h-9 w-full rounded-[3px] border border-line-strong bg-card px-2 text-sm text-ink";

export function Directory({ communities }: { communities: Community[] }) {
  const [query, setQuery] = useState("");
  const [tiers, setTiers] = useState<Set<VibeTier>>(new Set());
  const [maxDues, setMaxDues] = useState(0);
  const [mustAllow, setMustAllow] = useState<TopicId | "">("");
  const [type, setType] = useState<CommunityType | "">("");
  const [sort, setSort] = useState<SortKey>("vibe-best");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = communities.filter((c) => {
      if (q && !`${c.name} ${c.location}`.toLowerCase().includes(q)) return false;
      if (tiers.size > 0 && !tiers.has(communityTier(c))) return false;
      if (maxDues > 0 && c.duesMonthly > maxDues) return false;
      if (mustAllow && c.stances[mustAllow].stance !== "allowed") return false;
      if (type && c.type !== type) return false;
      return true;
    });
    const score = (c: Community) => vibeScore(c.strictness, c.toxicity);
    return filtered.sort((a, b) => {
      switch (sort) {
        case "vibe-best": return score(a) - score(b);
        case "vibe-worst": return score(b) - score(a);
        case "dues-low": return a.duesMonthly - b.duesMonthly;
        case "dues-high": return b.duesMonthly - a.duesMonthly;
        case "rules": return a.ruleCount - b.ruleCount;
        case "response": return a.responseWeeks - b.responseWeeks;
        case "name": return a.name.localeCompare(b.name);
      }
    });
  }, [communities, query, tiers, maxDues, mustAllow, type, sort]);

  function toggleTier(t: VibeTier) {
    setTiers((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  return (
    <div>
      {/* Controls */}
      <div className="rounded-[4px] border border-line bg-card p-3 shadow-plot">
        <div className="relative">
          <Search
            size={15}
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by community or town…"
            aria-label="Search communities"
            className="h-10 w-full rounded-[3px] border border-line-strong bg-paper pl-8 pr-3 text-sm text-ink placeholder:text-ink-faint"
          />
        </div>

        <fieldset className="mt-3">
          <legend className="label-micro mb-1.5 text-ink-faint">
            Filter by vibe
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {TIERS.map((t) => {
              const active = tiers.has(t.id as VibeTier);
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTier(t.id as VibeTier)}
                  className={`label-micro inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 font-bold transition-colors ${
                    active
                      ? `${t.tintClass} ${t.textClass} border-current`
                      : "border-line-strong bg-card text-ink-soft hover:border-ink-faint"
                  }`}
                >
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-[1px]"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          <label>
            <span className="label-micro mb-1 block text-ink-faint">Max dues</span>
            <select
              value={maxDues}
              onChange={(e) => setMaxDues(Number(e.target.value))}
              className={selectClass}
            >
              {DUES_CAPS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="label-micro mb-1 block text-ink-faint">Must allow</span>
            <select
              value={mustAllow}
              onChange={(e) => setMustAllow(e.target.value as TopicId | "")}
              className={selectClass}
            >
              <option value="">Anything</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>{TOPIC_LABELS[t]}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="label-micro mb-1 block text-ink-faint">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CommunityType | "")}
              className={selectClass}
            >
              <option value="">All types</option>
              {(Object.keys(TYPE_LABELS) as CommunityType[]).map((t) => (
                <option key={t} value={t}>{TYPE_LABELS[t]}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="label-micro mb-1 block text-ink-faint">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={selectClass}
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Results */}
      <p className="label-micro mt-5 text-ink-faint" role="status">
        {results.length} of {communities.length} parcels on file
      </p>
      {results.length > 0 ? (
        <ul className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {results.map((c) => (
            <li key={c.slug}>
              <CommunityCard community={c} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 rounded-[4px] border border-dashed border-line-strong bg-card p-8 text-center">
          <p className="font-semibold text-ink">No parcels match that filter.</p>
          <p className="mt-1 text-sm text-ink-soft">
            Loosen a constraint — even the chillest HOA can&apos;t allow everything.
          </p>
        </div>
      )}
    </div>
  );
}
