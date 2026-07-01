import { COMMUNITIES } from "@/lib/seed";
import { Directory } from "@/components/Directory";
import { TierLegend } from "@/components/TierLegend";

export default function HomePage() {
  return (
    <>
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Know the board before you sign.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Every HOA has a personality. Sellers won&apos;t mention it and the
          listing can&apos;t show it — so residents report it here, with
          receipts: dues, fines, rule counts, and how long the board takes to
          answer an email.
        </p>
      </section>

      <section className="mt-6" aria-label="How to read the vibe scale">
        <h2 className="label-micro mb-2 text-ink-faint">
          The vibe scale — read the fence
        </h2>
        <TierLegend />
      </section>

      <section className="mt-6" aria-label="Community directory">
        <Directory communities={COMMUNITIES} />
      </section>
    </>
  );
}
