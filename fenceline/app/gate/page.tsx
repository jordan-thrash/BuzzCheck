import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { GateForm } from "@/components/GateForm";

export const metadata: Metadata = { title: "Early access" };

export default function GatePage() {
  return (
    <div className="mx-auto max-w-sm py-10">
      <Wordmark size="lg" />
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">
        Early access
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        fenceline is pre-launch and invite-only — the neighborly kind of
        gate, not the guard-shack kind.
      </p>
      <div className="mt-6">
        <GateForm />
      </div>
    </div>
  );
}
