"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";

/**
 * The early-access gate. During the public demo the gate is open and the
 * access code is printed right on the page — the screen exists to prove
 * the pattern, not to keep anyone out.
 */
export function GateForm() {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "open" | "wrong">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toLowerCase() === "picket") {
      try {
        window.localStorage.setItem("fenceline:gate", "open");
      } catch {
        // Storage blocked — the gate still opens for this visit.
      }
      setState("open");
    } else {
      setState("wrong");
    }
  }

  if (state === "open") {
    return (
      <div className="rounded-[4px] border border-chill/40 bg-chill-tint p-4">
        <p className="text-sm font-semibold text-chill-deep">
          Gate&apos;s open. Welcome to the neighborhood.
        </p>
        <Link
          href="/"
          className="mt-2 inline-block text-sm font-semibold text-survey underline underline-offset-4 hover:text-survey-deep"
        >
          Head to the directory
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <label>
        <span className="mb-1 block text-sm font-semibold text-ink">
          Access code
        </span>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setState("idle");
            }}
            autoComplete="off"
            className="h-10 w-full rounded-[3px] border border-line-strong bg-paper px-3 text-sm text-ink placeholder:text-ink-faint"
            placeholder="••••••"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-[3px] bg-survey px-3 text-sm font-semibold text-white hover:bg-survey-deep"
          >
            <KeyRound size={14} aria-hidden />
            Enter
          </button>
        </div>
      </label>
      {state === "wrong" && (
        <p className="mt-2 text-sm text-hostile-deep" role="alert">
          Not it. The code is printed below — this is the demo, not the DMV.
        </p>
      )}
      <p className="cite mt-3 text-xs text-ink-faint">
        Demo access code: <span className="text-ink">picket</span> — the gate
        is open during pre-launch.
      </p>
    </form>
  );
}
