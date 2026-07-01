import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { COMMUNITIES, getCommunity } from "@/lib/seed";
import { communityTier, tierInfo, whyThisTier } from "@/lib/vibe";
import { TYPE_LABELS } from "@/lib/format";
import { FenceGlyph } from "@/components/FenceGlyph";
import { AxisMeter } from "@/components/AxisMeter";
import { ParcelRecord } from "@/components/ParcelRecord";
import { RedFlags } from "@/components/RedFlags";
import { StanceList } from "@/components/StanceList";
import { ReviewsSection } from "@/components/ReviewsSection";

export function generateStaticParams() {
  return COMMUNITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) return { title: "Parcel not found" };
  const tier = tierInfo(communityTier(community));
  return {
    title: `${community.name}, ${community.location} — ${tier.name}`,
    description: whyThisTier(community),
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  const tier = communityTier(community);
  const info = tierInfo(tier);

  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-ink-soft underline-offset-4 hover:text-survey hover:underline"
      >
        <ArrowLeft size={14} aria-hidden />
        Back to the directory
      </Link>

      <header className="mt-4">
        <p className="label-micro text-ink-faint">
          {community.location} · {TYPE_LABELS[community.type]} ·{" "}
          {community.homes.toLocaleString("en-US")} homes · est.{" "}
          {community.founded}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
          {community.name}
        </h1>
      </header>

      {/* The verdict */}
      <section
        aria-label="Verdict"
        className={`mt-5 rounded-[4px] border border-line border-l-4 ${info.borderClass} bg-card p-4 shadow-plot sm:p-5`}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <FenceGlyph tier={tier} width={128} />
          <div className="min-w-0 flex-1 basis-56">
            <p className="label-micro text-ink-faint">Verdict</p>
            <p className={`text-2xl font-bold ${info.textClass}`}>{info.name}</p>
            <p className="mt-1 text-sm leading-snug text-ink-soft">
              {whyThisTier(community)}
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-5 border-t border-dotted border-line-strong pt-4 sm:grid-cols-2">
          <AxisMeter
            label="Strictness"
            value={community.strictness}
            caption="How heavy the rulebook is, and how hard it's enforced."
          />
          <AxisMeter
            label="Toxicity"
            value={community.toxicity}
            caption="Selective enforcement, hostility, litigiousness. Weighs heavier."
          />
        </div>
      </section>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
        {community.blurb}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-8">
          <StanceList community={community} />
          <ReviewsSection slug={community.slug} seedReviews={community.reviews} />
        </div>
        <div className="space-y-6 lg:sticky lg:top-6">
          <ParcelRecord community={community} />
          <RedFlags community={community} />
          <Link
            href={`/compare/?a=${community.slug}`}
            className="block rounded-[3px] border border-survey px-3 py-2 text-center text-sm font-semibold text-survey hover:bg-survey-tint"
          >
            Compare with another HOA
          </Link>
        </div>
      </div>
    </>
  );
}
