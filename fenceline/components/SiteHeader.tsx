import Link from "next/link";
import { Wordmark } from "./Wordmark";

const NAV = [
  { href: "/", label: "Directory" },
  { href: "/compare/", label: "Compare" },
  { href: "/feed/", label: "Feed" },
  { href: "/about/", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-card">
      {/* The demo-data note is part of the product, not a dismissible toast. */}
      <p className="label-micro border-b border-line bg-well px-4 py-1.5 text-center text-ink-soft">
        Pre-launch demo — every community and review on this site is fictional
      </p>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="rounded-[2px]">
          <Wordmark />
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-4 sm:gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-ink-soft underline-offset-4 hover:text-survey hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
