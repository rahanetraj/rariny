type WovenDividerProps = {
  color?: "laterite" | "ravinala" | "or" | "indigo";
  className?: string;
};

const COLOR_MAP: Record<NonNullable<WovenDividerProps["color"]>, string> = {
  laterite: "var(--color-laterite)",
  ravinala: "var(--color-ravinala)",
  or: "var(--color-or)",
  indigo: "var(--color-indigo)",
};

/**
 * Bande de chevrons inspirée des tissages lamba akotifahana — élément signature du site.
 */
export default function WovenDivider({
  color = "laterite",
  className = "",
}: WovenDividerProps) {
  const stroke = COLOR_MAP[color];

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`w-full overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 240 16"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-4"
      >
        <pattern
          id={`woven-${color}`}
          x="0"
          y="0"
          width="24"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 8 L6 0 L12 8 L18 0 L24 8"
            fill="none"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M0 8 L6 16 L12 8 L18 16 L24 8"
            fill="none"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinecap="round"
            opacity="0.45"
          />
        </pattern>
        <rect width="240" height="16" fill={`url(#woven-${color})`} />
      </svg>
    </div>
  );
}
