interface RecommendedIconProps {
  className?: string;
}

/** A generated leaf-and-ribbon mark for recipes the collection recommends. */
export function RecommendedIcon({ className }: RecommendedIconProps) {
  return (
    <img
      aria-hidden="true"
      alt=""
      className={className}
      decoding="async"
      draggable={false}
      src="/recommended-house-pick.png"
    />
  );
}
