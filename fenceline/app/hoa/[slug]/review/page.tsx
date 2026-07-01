import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { COMMUNITIES, getCommunity } from "@/lib/seed";
import { Composer } from "@/components/Composer";

export function generateStaticParams() {
  return COMMUNITIES.map((c) => ({ slug: c.slug }));
}

export const metadata: Metadata = { title: "File a review" };

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  return (
    <>
      <Link
        href={`/hoa/${community.slug}/`}
        className="inline-flex items-center gap-1 text-sm text-ink-soft underline-offset-4 hover:text-survey hover:underline"
      >
        <ArrowLeft size={14} aria-hidden />
        Back to {community.name}
      </Link>
      <header className="mt-4 max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          File a review — {community.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Rate both axes, then write the receipt. Reviews are anonymous by
          construction: a role and a tenure, never a name.
        </p>
      </header>
      <div className="mt-6">
        <Composer community={community} />
      </div>
    </>
  );
}
