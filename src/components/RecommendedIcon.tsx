interface RecommendedIconProps {
  className?: string;
}

/** A small shield-and-ribbon mark for recipes the collection recommends. */
export function RecommendedIcon({ className }: RecommendedIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 15.8 7.6 21l4.4-2.35L16.4 21l-1.15-5.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M12 3.15 18.25 6v5.05c0 4.02-2.47 7.58-6.25 9.68-3.78-2.1-6.25-5.66-6.25-9.68V6L12 3.15Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m8.7 12.15 2.15 2.15 4.5-4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}
