import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-dashed border-line-strong bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-2 text-sm text-ink-soft">
            Know the board before you sign. Built for buyers, not boards.
          </p>
          <p className="label-micro mt-3 text-ink-faint">
            Demo data — all communities, reviews & events are fictional.
            No claim here attaches to any real HOA, address, or person.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-1.5 text-sm">
            <li><Link className="text-ink-soft hover:text-survey hover:underline underline-offset-4" href="/about/">How the vibe scale works</Link></li>
            <li><Link className="text-ink-soft hover:text-survey hover:underline underline-offset-4" href="/compare/">Compare communities</Link></li>
            <li><Link className="text-ink-soft hover:text-survey hover:underline underline-offset-4" href="/feed/">Latest reviews</Link></li>
            <li><Link className="text-ink-soft hover:text-survey hover:underline underline-offset-4" href="/gate/">Early access</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
