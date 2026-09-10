import { Heart, Snowflake, Flame } from "lucide-react";
import { useState } from "react";
import type { Recipe, Temperature } from "../types";
import { CATEGORY_STYLES } from "../data/categories";
import { RecipeBackdrop } from "./RecipeBackdrop";

interface RecipeCardProps {
  recipe: Recipe;
  isToday: boolean;
  defaultTemperature: Temperature;
  isFavorite: boolean;
  onSelect: (recipe: Recipe, temperature?: Temperature) => void;
  onToggleFavorite: (recipeId: string) => void;
}

export function RecipeCard({
  recipe,
  isToday,
  defaultTemperature,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: RecipeCardProps) {
  const { pill } = CATEGORY_STYLES[recipe.category];
  const [temperature, setTemperature] = useState<Temperature>(defaultTemperature);
  const build = temperature === "Iced" ? recipe.iced : recipe.hot;

  return (
    <article className="group relative flex min-h-[350px] flex-col overflow-hidden rounded-2xl border border-cream-50/20 bg-espresso-950 text-left shadow-sm transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <RecipeBackdrop recipeId={recipe.id} temperature={temperature} surface="card" />

      <div className="relative z-10 flex items-start justify-between gap-3 p-5 pb-0">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-xs font-medium text-cream-50/75">
            {recipe.number}
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream-50"
            style={{ backgroundColor: pill }}
          >
            {recipe.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isToday ? (
            <span className="rounded-full bg-cream-50/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-espresso-950">
              Today
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => onToggleFavorite(recipe.id)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Remove ${recipe.name} from saved recipes` : `Save ${recipe.name}`}
            className="rounded-full bg-espresso-950/45 p-2 text-cream-50/85 backdrop-blur-sm transition hover:bg-espresso-950/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-espresso-950"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-3 p-5 pt-3">
        <button
          type="button"
          onClick={() => onSelect(recipe, temperature)}
          aria-label={`Open ${recipe.name} recipe`}
          className="flex flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 focus-visible:ring-offset-2 focus-visible:ring-offset-espresso-950"
        >
          <span
            role="heading"
            aria-level={3}
            className="font-display text-lg font-semibold leading-snug text-cream-50 drop-shadow-sm"
          >
            {recipe.name}
          </span>
          <span role="list" className="mt-3 flex flex-col gap-1.5 text-sm text-cream-50/90">
            {build.ingredients.map((ing) => (
              <span key={ing.name} role="listitem" className="flex items-baseline gap-2">
                <span className="shrink-0">{ing.name}</span>
                <span className="flex-1 border-b border-dotted border-cream-50/30" />
                <span className="shrink-0 font-medium text-cream-50">{ing.amount}</span>
              </span>
            ))}
          </span>
          {build.note && <span className="mt-3 block text-xs text-cream-50/70">{build.note}</span>}
        </button>

        <div
          role="group"
          aria-label={`${recipe.name} build temperature`}
          className="flex w-fit items-center gap-0.5 rounded-full bg-espresso-950/45 p-0.5 text-[10px] font-semibold uppercase tracking-wide text-cream-50/75 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setTemperature("Hot")}
            aria-pressed={temperature === "Hot"}
            className={`flex items-center gap-1 rounded-full px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 ${
              temperature === "Hot" ? "bg-cream-50 text-espresso-950" : ""
            }`}
          >
            <Flame className="h-3 w-3" />
            Hot
          </button>
          <button
            type="button"
            onClick={() => setTemperature("Iced")}
            aria-pressed={temperature === "Iced"}
            className={`flex items-center gap-1 rounded-full px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50 ${
              temperature === "Iced" ? "bg-cream-50 text-espresso-950" : ""
            }`}
          >
            <Snowflake className="h-3 w-3" />
            Iced
          </button>
        </div>
      </div>
    </article>
  );
}
