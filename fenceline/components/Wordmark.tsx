/**
 * The brand mark: three survey-blue pickets and the lowercase wordmark.
 * The mark never uses ramp colors — severity stays reserved for verdicts.
 */
export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        viewBox="0 0 26 22"
        width={size === "lg" ? 26 : 20}
        height={size === "lg" ? 22 : 17}
        aria-hidden
      >
        <path
          d="M2 9 L5.5 6 L9 9 L9 20 L2 20 Z"
          fill="var(--color-survey)"
        />
        <path
          d="M11 6 L14.5 3 L18 6 L18 20 L11 20 Z"
          fill="var(--color-survey)"
        />
        <path
          d="M20 9 L23.5 6 L26 8.1 L26 20 L20 20 Z"
          fill="var(--color-survey)"
          opacity={0.45}
        />
      </svg>
      <span
        className={`font-semibold tracking-tight text-ink ${
          size === "lg" ? "text-2xl" : "text-lg"
        }`}
      >
        fenceline
      </span>
    </span>
  );
}
