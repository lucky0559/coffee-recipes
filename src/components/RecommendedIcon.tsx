interface RecommendedIconProps {
  className?: string;
}

/** A small rosette-and-ribbon mark for recipes the collection recommends. */
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
        d="m8.3 15.45-1.15 5.4L12 18.4l4.85 2.45-1.15-5.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M12 3.8c.8 0 1.15.8 1.75 1.05.62.25 1.35-.2 1.82.27.47.47.02 1.2.27 1.82.25.6 1.05.95 1.05 1.75s-.8 1.15-1.05 1.75c-.25.62.2 1.35-.27 1.82-.47.47-1.2.02-1.82.27-.6.25-.95 1.05-1.75 1.05s-1.15-.8-1.75-1.05c-.62-.25-1.35.2-1.82-.27-.47-.47-.02-1.2-.27-1.82-.25-.6-1.05-.95-1.05-1.75s.8-1.15 1.05-1.75c.25-.62-.2-1.35.27-1.82.47-.47 1.2-.02 1.82-.27C10.85 4.6 11.2 3.8 12 3.8Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="m9.15 8.75 2.05 2.05 3.65-3.65"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}
