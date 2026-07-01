import type { Metadata } from "next";
import { COMMUNITIES } from "@/lib/seed";
import { CompareBoard } from "@/components/CompareBoard";

export const metadata: Metadata = { title: "Compare" };

export default function ComparePage() {
  return (
    <>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Side by side
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Line up two or three HOAs and read the fences. Same axes, same
          numbers, no averaging — the differences do the talking.
        </p>
      </header>
      <div className="mt-6">
        <CompareBoard communities={COMMUNITIES} />
      </div>
    </>
  );
}
