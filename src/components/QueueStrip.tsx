import type { Recipe } from "../types";
import { RecipeBackdrop } from "./RecipeBackdrop";

interface QueueStripProps {
  queue: Recipe[];
  onSelect: (recipe: Recipe) => void;
}

const dayLabel = (offset: number) => {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return `In ${offset} days`;
};

export function QueueStrip({ queue, onSelect }: QueueStripProps) {
  const preview = queue.slice(0, 6);

  return (
    <div className="mt-8">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-espresso-50/60">
        Next up in the line
      </p>
      <div className="queue-scroll flex gap-3 overflow-x-auto pb-2">
        {preview.map((recipe, i) => (
          <button
            key={recipe.id}
            type="button"
            onClick={() => onSelect(recipe)}
            className={`group relative flex min-w-[132px] flex-col gap-2 overflow-hidden rounded-2xl border px-4 py-3 text-left transition ${
              i === 0
                ? "border-cream-50/40 bg-cream-50/15"
                : "border-cream-50/10 bg-cream-50/5 hover:border-cream-50/25 hover:bg-cream-50/10"
            }`}
          >
            <RecipeBackdrop recipeId={recipe.id} temperature="Iced" surface="queue" />
            <span className="relative z-10 text-[11px] font-medium uppercase tracking-wide text-espresso-50/55">
              {dayLabel(i)}
            </span>
            <span className="relative z-10 font-display text-sm font-medium leading-snug text-cream-50">
              {recipe.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
