import { useEffect, useRef, useState } from "react";
import { Flame, Snowflake, Sparkles, X } from "lucide-react";
import type { Recipe, Temperature } from "../types";
import { CATEGORY_STYLES } from "../data/categories";

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [from, to] = CATEGORY_STYLES[recipe.category].accent;
  const [temperature, setTemperature] = useState<Temperature>("Hot");
  const build = temperature === "Iced" ? recipe.iced : recipe.hot;

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-3xl bg-cream-50 shadow-2xl">
        <div
          className="relative flex items-start justify-between rounded-t-3xl p-6 text-cream-50"
          style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-cream-50/80">
              <span>{recipe.number}</span>
              <span>·</span>
              <span>{recipe.category}</span>
            </div>
            <h2 id="recipe-modal-title" className="font-display mt-2 text-2xl font-semibold">
              {recipe.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close recipe"
            className="shrink-0 rounded-full bg-cream-50/15 p-2 transition hover:bg-cream-50/25"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-espresso-900">
              Build
            </h3>
            <div
              role="group"
              className="flex shrink-0 items-center gap-0.5 rounded-full bg-espresso-900/8 p-0.5 text-[11px] font-semibold uppercase tracking-wide text-espresso-600"
            >
              <button
                type="button"
                onClick={() => setTemperature("Hot")}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition ${
                  temperature === "Hot" ? "bg-espresso-900 text-cream-50" : ""
                }`}
              >
                <Flame className="h-3 w-3" />
                Hot
              </button>
              <button
                type="button"
                onClick={() => setTemperature("Iced")}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition ${
                  temperature === "Iced" ? "bg-espresso-900 text-cream-50" : ""
                }`}
              >
                <Snowflake className="h-3 w-3" />
                Iced
              </button>
            </div>
          </div>
          <ul className="mt-3 space-y-2.5 text-sm text-espresso-700">
            {build.ingredients.map((ing) => (
              <li key={ing.name} className="flex items-baseline gap-2">
                <span>{ing.name}</span>
                <span className="flex-1 border-b border-dotted border-espresso-900/15" />
                <span className="font-medium text-espresso-900">{ing.amount}</span>
              </li>
            ))}
          </ul>

          {build.note && (
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-espresso-950/5 p-3 text-sm text-espresso-700">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-espresso-500" />
              <span>{build.note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
