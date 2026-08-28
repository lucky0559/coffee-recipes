import { useState } from "react";
import { Snowflake, Flame } from "lucide-react";
import type { Recipe, Temperature } from "../types";
import { CATEGORY_STYLES } from "../data/categories";
import { RecipeBackdrop } from "./RecipeBackdrop";

interface RecipeCardProps {
  recipe: Recipe;
  isToday: boolean;
  onSelect: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, isToday, onSelect }: RecipeCardProps) {
  const { pill } = CATEGORY_STYLES[recipe.category];
  const [temperature, setTemperature] = useState<Temperature>("Hot");
  const build = temperature === "Iced" ? recipe.iced : recipe.hot;

  return (
    <button
      type="button"
      onClick={() => onSelect(recipe)}
      className="group relative flex min-h-[350px] flex-col overflow-hidden rounded-2xl border border-cream-50/20 bg-espresso-950 text-left shadow-sm transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
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
        {isToday && (
          <span className="rounded-full bg-cream-50/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-espresso-950">
            Today
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-3 p-5 pt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-snug text-cream-50 drop-shadow-sm">
            {recipe.name}
          </h3>
          <span
            role="group"
            className="flex shrink-0 items-center gap-0.5 rounded-full bg-espresso-950/45 p-0.5 text-[10px] font-semibold uppercase tracking-wide text-cream-50/75 backdrop-blur-sm"
          >
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setTemperature("Hot");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  setTemperature("Hot");
                }
              }}
              className={`flex items-center gap-1 rounded-full px-2 py-1 transition ${
                temperature === "Hot" ? "bg-cream-50 text-espresso-950" : ""
              }`}
            >
              <Flame className="h-3 w-3" />
              Hot
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setTemperature("Iced");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  setTemperature("Iced");
                }
              }}
              className={`flex items-center gap-1 rounded-full px-2 py-1 transition ${
                temperature === "Iced" ? "bg-cream-50 text-espresso-950" : ""
              }`}
            >
              <Snowflake className="h-3 w-3" />
              Iced
            </span>
          </span>
        </div>
        <ul className="space-y-1.5 text-sm text-cream-50/90">
          {build.ingredients.map((ing) => (
            <li key={ing.name} className="flex items-baseline gap-2">
              <span className="shrink-0">{ing.name}</span>
              <span className="flex-1 border-b border-dotted border-cream-50/30" />
              <span className="shrink-0 font-medium text-cream-50">{ing.amount}</span>
            </li>
          ))}
        </ul>
        {build.note && (
          <p className="text-xs text-cream-50/70">{build.note}</p>
        )}
      </div>
    </button>
  );
}
