import Link from "next/link";

/** Ghost fence: five unfilled pickets — a parcel with nothing on it. */
function GhostFence() {
  const heights = [13, 17, 21, 25, 29];
  return (
    <svg viewBox="0 0 60 34" width={120} height={68} aria-hidden>
      <rect x="2" y="21.5" width="56" height="2" fill="var(--color-line)" />
      <rect x="2" y="27.5" width="56" height="2" fill="var(--color-line)" />
      {heights.map((h, i) => {
        const x = 4 + i * 11;
        const top = 32 - h;
        return (
          <path
            key={i}
            d={`M${x} ${top + 3} L${x + 4} ${top} L${x + 8} ${top + 3} L${x + 8} 32 L${x} 32 Z`}
            fill="var(--color-card)"
            stroke="var(--color-line-strong)"
            strokeWidth={1.2}
            strokeDasharray="3 2"
          />
        );
      })}
      <rect x="0" y="32" width="60" height="1.5" fill="var(--color-ink-faint)" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="flex justify-center">
        <GhostFence />
      </div>
      <p className="label-micro mt-6 text-ink-faint">Error 404</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">
        This parcel isn&apos;t on the plat.
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Whatever was here got denied, demolished, or fined out of existence.
        The directory has everything that survived.
      </p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-[3px] bg-survey px-4 py-2.5 text-sm font-semibold text-white hover:bg-survey-deep"
      >
        Back to the directory
      </Link>
    </div>
  );
}
