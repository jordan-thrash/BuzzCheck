import { Flag } from "lucide-react";
import type { Community } from "@/lib/types";
import { redFlags } from "@/lib/vibe";

/**
 * Auto-surfaced tripwires, styled like violation notices — because
 * that's what they are, just pointed the other way for once.
 */
export function RedFlags({ community }: { community: Community }) {
  const flags = redFlags(community);
  if (flags.length === 0) return null;
  return (
    <section aria-label="Red flags">
      <h2 className="label-micro text-hostile-deep">
        Red flags · {flags.length} on file
      </h2>
      <ul className="mt-2 space-y-2">
        {flags.map((f) => (
          <li
            key={f.id}
            className="rounded-[3px] border border-hostile/40 bg-hostile-tint/60 p-3"
          >
            <p className="label-micro flex items-center gap-1.5 font-bold text-hostile-deep">
              <Flag size={12} strokeWidth={2.5} aria-hidden />
              {f.label}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{f.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
