import type { Metadata } from "next";
import { COMMUNITIES } from "@/lib/seed";
import { FeedList } from "@/components/FeedList";

export const metadata: Metadata = { title: "Feed" };

export default function FeedPage() {
  return (
    <>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          The docket
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Every review on file, newest first. Grievances with receipts,
          praise with caveats, and the occasional garden gnome custody
          dispute.
        </p>
      </header>
      <FeedList communities={COMMUNITIES} />
    </>
  );
}
