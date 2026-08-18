import { ListOrdered, Sparkles } from "lucide-react";
import type { Recipe } from "../types";
import { CATEGORY_STYLES } from "../data/categories";
import { QueueStrip } from "./QueueStrip";

interface CoffeeOfTheDayProps {
  recipe: Recipe;
  queue: Recipe[];
  position: number;
  total: number;
  onSelect: (recipe: Recipe) => void;
  onViewRecipe: () => void;
}

const todayLabel = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
}).format(new Date());

export function CoffeeOfTheDay({
  recipe,
  queue,
  position,
  total,
  onSelect,
  onViewRecipe,
}: CoffeeOfTheDayProps) {
  const [from, to] = CATEGORY_STYLES[recipe.category].accent;

  return (
    <section
      className="relative overflow-hidden rounded-[28px] px-6 py-10 text-cream-50 shadow-[0_30px_60px_-25px_rgba(28,19,13,0.55)] sm:px-10 sm:py-12"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: to }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream-50/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-cream-50/90">
            Coffee of the day
          </span>
          <span className="text-xs font-medium text-cream-50/70">{todayLabel}</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="font-display text-sm text-cream-50/60">{recipe.number}</span>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {recipe.name}
          </h1>
        </div>

        <ul className="mt-5 flex max-w-md flex-col gap-2 text-cream-50/90">
          {recipe.ingredients.map((ing) => (
            <li key={ing.name} className="flex items-baseline gap-2 text-sm">
              <span>{ing.name}</span>
              <span className="flex-1 border-b border-dotted border-cream-50/25" />
              <span className="font-medium text-cream-50">{ing.amount}</span>
            </li>
          ))}
        </ul>
        {recipe.note && (
          <p className="mt-3 flex items-start gap-2 text-xs text-cream-50/70">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{recipe.note}</span>
          </p>
        )}

        <div className="mt-6 flex items-center gap-2 text-sm text-cream-50/85">
          <ListOrdered className="h-4 w-4" strokeWidth={2} />
          <span>
            #{position} of {total} in the line
          </span>
        </div>

        <button
          type="button"
          onClick={onViewRecipe}
          className="mt-6 inline-flex items-center rounded-full bg-cream-50 px-6 py-3 text-sm font-semibold text-espresso-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
        >
          View full recipe
        </button>

        <QueueStrip queue={queue} onSelect={onSelect} />
      </div>
    </section>
  );
}
