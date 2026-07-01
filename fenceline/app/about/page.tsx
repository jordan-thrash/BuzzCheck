import type { Metadata } from "next";
import type { VibeTier } from "@/lib/types";
import { TIERS } from "@/lib/vibe";
import { FenceGlyph } from "@/components/FenceGlyph";
import { TierLegend } from "@/components/TierLegend";

export const metadata: Metadata = { title: "How it works" };

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-ink">
        How fenceline works
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">
        An HOA&apos;s personality is the biggest undisclosed feature of any
        home it governs. You&apos;ll learn the dues at closing and the rules
        at your first violation — unless somebody who lives there tells you
        first. That&apos;s the site: residents tell you first, with receipts.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">The vibe scale</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Every community gets a verdict on a five-tier scale, drawn as a
        fence: the taller and redder it grows, the worse your weekends get.
        It is never stars and never a score out of five — a 3.6-star HOA
        tells you nothing, but &ldquo;Overbearing&rdquo; tells you to read
        the fine schedule before you fall for the kitchen.
      </p>
      <div className="mt-4">
        <TierLegend />
      </div>

      <h2 className="mt-10 text-lg font-bold text-ink">
        Two axes, never merged
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Residents rate two things, both 0–100, both &ldquo;higher is
        worse&rdquo;:
      </p>
      <dl className="mt-3 space-y-3">
        <div className="rounded-[4px] border border-line bg-card p-3">
          <dt className="text-sm font-semibold text-ink">Strictness</dt>
          <dd className="mt-1 text-sm text-ink-soft">
            How heavy the rulebook is and how hard it&apos;s enforced. A
            142-rule community that inspects monthly scores high even if
            everyone is polite about it.
          </dd>
        </div>
        <div className="rounded-[4px] border border-line bg-card p-3">
          <dt className="text-sm font-semibold text-ink">Toxicity</dt>
          <dd className="mt-1 text-sm text-ink-soft">
            Selective enforcement, hostility, litigiousness. The difference
            between a strict-but-fair building and a board that fines its
            enemies. This is the axis that ruins lives, so it weighs heavier.
          </dd>
        </div>
      </dl>
      <p className="cite mt-3 rounded-[3px] border border-line bg-well px-3 py-2 text-xs text-ink-soft">
        verdict = 0.4 × strictness + 0.6 × toxicity → banded into five tiers
        (&lt;20, &lt;40, &lt;60, &lt;80, ≥80)
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        The two numbers are always shown separately. A strict-but-decent HOA
        and a lax-but-vindictive one can land in the same tier — the meters
        tell you which one you&apos;re buying into.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">Red flags</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Some thresholds get flagged automatically, no judgment call involved:
      </p>
      <ul className="cite mt-3 space-y-1.5 text-sm text-ink-soft">
        <li>› more than 90 rules on file</li>
        <li>› average fine of $150 or more</li>
        <li>› board response time over 4 weeks</li>
        <li>› toxicity of 60 or higher</li>
      </ul>

      <h2 className="mt-10 text-lg font-bold text-ink">Anonymity</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Reviews carry a role and a tenure (&ldquo;Owner, 6 yrs&rdquo;) and
        nothing else. Boards can&apos;t subpoena what we never collected.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">
        About the data on this site
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        fenceline is pre-launch. Every community, review, number, board
        quote, and gnome on this site is <strong>fictional</strong> — written
        to demonstrate the product, not to describe anyone. No claim here
        attaches to any real HOA, address, or person. When real data ships,
        this notice gets replaced by a methodology page, not deleted.
      </p>

      <div className="mt-12 flex items-end gap-1.5" aria-hidden>
        {TIERS.map((t) => (
          <FenceGlyph key={t.key} tier={t.id as VibeTier} width={40} showLabel={false} />
        ))}
      </div>
    </div>
  );
}
