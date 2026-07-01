"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Community, Review } from "@/lib/types";
import { deriveTier, tierInfo } from "@/lib/vibe";
import { addLocalReview } from "@/lib/reviews";
import { FenceGlyph } from "./FenceGlyph";

const ROLES = ["Owner", "Renter", "Former owner", "Former renter"] as const;

const inputClass =
  "w-full rounded-[3px] border border-line-strong bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-faint";

/**
 * A resident rates both axes and writes the receipt. The tier is derived
 * live from their two sliders — the same formula the site uses — so the
 * composer doubles as a lesson in how the scale works.
 */
export function Composer({ community }: { community: Community }) {
  const router = useRouter();
  const [strictness, setStrictness] = useState(community.strictness);
  const [toxicity, setToxicity] = useState(community.toxicity);
  const [role, setRole] = useState<(typeof ROLES)[number]>("Owner");
  const [tenure, setTenure] = useState("");
  const [body, setBody] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [boardApproval, setBoardApproval] = useState(false);
  const [error, setError] = useState("");

  const tier = deriveTier(strictness, toxicity);
  const info = tierInfo(tier);
  const author = useMemo(
    () => (tenure.trim() ? `${role}, ${tenure.trim()}` : role),
    [role, tenure]
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (body.trim().length < 40) {
      setError(
        "The receipt is the review — give it at least a sentence or two (40+ characters)."
      );
      return;
    }
    const review: Review = {
      id: `local-${community.slug}-${Date.now()}`,
      author,
      date: new Date().toISOString().slice(0, 10),
      tierRead: tier,
      body: body.trim(),
      pros: pros.trim() ? pros.split("\n").map((s) => s.trim()).filter(Boolean) : undefined,
      cons: cons.trim() ? cons.split("\n").map((s) => s.trim()).filter(Boolean) : undefined,
      recommend,
      boardApproval,
    };
    addLocalReview(community.slug, review);
    router.push(`/hoa/${community.slug}/`);
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-6">
      {/* Axis ratings + live verdict */}
      <fieldset className="rounded-[4px] border border-line bg-card p-4 shadow-plot">
        <legend className="label-micro px-1 text-ink-faint">
          Your read — rate both axes
        </legend>

        <label className="block">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-ink">Strictness</span>
            <span className="cite text-sm text-ink-soft">{strictness} / 100</span>
          </div>
          <p className="text-xs text-ink-faint">
            How heavy is the rulebook, and how hard is it enforced? Higher is worse.
          </p>
          <input
            type="range"
            min={0}
            max={100}
            value={strictness}
            onChange={(e) => setStrictness(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </label>

        <label className="mt-4 block">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-ink">Toxicity</span>
            <span className="cite text-sm text-ink-soft">{toxicity} / 100</span>
          </div>
          <p className="text-xs text-ink-faint">
            Selective enforcement, hostility, litigiousness. Higher is worse — and
            weighs heavier in the verdict.
          </p>
          <input
            type="range"
            min={0}
            max={100}
            value={toxicity}
            onChange={(e) => setToxicity(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </label>

        <div
          className={`mt-4 flex items-center gap-4 rounded-[3px] border border-line border-l-4 ${info.borderClass} bg-paper p-3`}
          role="status"
          aria-live="polite"
        >
          <FenceGlyph tier={tier} width={72} />
          <div>
            <p className="label-micro text-ink-faint">Your verdict reads as</p>
            <p className={`text-lg font-bold ${info.textClass}`}>{info.name}</p>
          </div>
        </div>
      </fieldset>

      {/* Identity — anonymous by construction */}
      <fieldset className="rounded-[4px] border border-line bg-card p-4 shadow-plot">
        <legend className="label-micro px-1 text-ink-faint">
          Who&apos;s talking — no names, ever
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="mb-1 block text-sm font-semibold text-ink">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as (typeof ROLES)[number])}
              className={inputClass}
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold text-ink">
              Tenure
            </span>
            <input
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="6 yrs / 18 mo / 2019–2024"
              className={inputClass}
            />
          </label>
        </div>
        <p className="cite mt-2 text-xs text-ink-faint">
          Will appear as: <span className="text-ink">{author}</span>
        </p>
      </fieldset>

      {/* The receipt */}
      <fieldset className="rounded-[4px] border border-line bg-card p-4 shadow-plot">
        <legend className="label-micro px-1 text-ink-faint">The receipt</legend>
        <label>
          <span className="mb-1 block text-sm font-semibold text-ink">
            What happened
          </span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            placeholder="Be specific — dates, dollar amounts, rule sections. 'They fined me $50 for trash cans out 40 minutes late, with a timestamped photo' beats 'the board is mean.'"
            className={inputClass}
          />
        </label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label>
            <span className="mb-1 block text-sm font-semibold text-ink">
              Pros <span className="font-normal text-ink-faint">(one per line, optional)</span>
            </span>
            <textarea
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              rows={3}
              placeholder="Snow removal is genuinely fast"
              className={inputClass}
            />
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold text-ink">
              Cons <span className="font-normal text-ink-faint">(one per line, optional)</span>
            </span>
            <textarea
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              rows={3}
              placeholder="Appeals process is decorative"
              className={inputClass}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={recommend}
              onChange={(e) => setRecommend(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-survey)]"
            />
            I&apos;d recommend living here
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={boardApproval}
              onChange={(e) => setBoardApproval(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-survey)]"
            />
            I approve of the current board
          </label>
        </div>
      </fieldset>

      {error && (
        <p className="rounded-[3px] border border-hostile/40 bg-hostile-tint px-3 py-2 text-sm text-hostile-deep" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-[3px] bg-survey px-4 py-2.5 text-sm font-semibold text-white hover:bg-survey-deep"
        >
          File the review
        </button>
        <p className="text-xs text-ink-faint">
          Demo mode: saved to this browser only (localStorage), never uploaded.
        </p>
      </div>
    </form>
  );
}
