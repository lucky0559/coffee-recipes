import type { Recipe } from "../types";
import { CATEGORY_STYLES } from "../data/categories";

interface RecipeCardProps {
  recipe: Recipe;
  isToday: boolean;
  onSelect: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, isToday, onSelect }: RecipeCardProps) {
  const { pill } = CATEGORY_STYLES[recipe.category];

  return (
    <button
      type="button"
      onClick={() => onSelect(recipe)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-espresso-900/8 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3 p-5 pb-0">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-xs font-medium text-espresso-400">
            {recipe.number}
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream-50"
            style={{ backgroundColor: pill }}
          >
            {recipe.category}
          </span>
          {recipe.isNew && (
            <span className="rounded-full bg-espresso-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream-50">
              New
            </span>
          )}
        </div>
        {isToday && (
          <span className="rounded-full bg-cream-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-espresso-800">
            Today
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 pt-3">
        <h3 className="font-display text-lg font-semibold leading-snug text-espresso-950">
          {recipe.name}
        </h3>
        <ul className="space-y-1.5 text-sm text-espresso-700">
          {recipe.ingredients.map((ing) => (
            <li key={ing.name} className="flex items-baseline gap-2">
              <span className="shrink-0">{ing.name}</span>
              <span className="flex-1 border-b border-dotted border-espresso-900/15" />
              <span className="shrink-0 font-medium text-espresso-500">{ing.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
