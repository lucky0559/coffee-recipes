import { Flame, Snowflake } from "lucide-react";
import { CATEGORY_STYLES } from "../data/categories";
import type { RotatingRecipe } from "../lib/coffeeOfTheDay";
import type { Temperature } from "../types";
import { RecipeBackdrop } from "./RecipeBackdrop";

interface CoffeeOfTheDayPreviewProps {
  recipe: RotatingRecipe;
  temperature: Temperature;
  date: Date;
}

// The home-page teaser for today's drink: name, look and temperature only. The recipe
// (ingredients, notes, full-recipe link) stays on the recipe page.
export function CoffeeOfTheDayPreview({ recipe, temperature, date }: CoffeeOfTheDayPreviewProps) {
  const [from, to] = CATEGORY_STYLES[recipe.category].accent;
  const TemperatureIcon = temperature === "Hot" ? Flame : Snowflake;
  const todayLabel = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <section
      aria-labelledby="coffee-of-the-day-heading"
      className="relative mb-10 overflow-hidden rounded-[28px] bg-espresso-950 px-6 py-10 text-cream-50 shadow-[0_30px_60px_-25px_rgba(28,19,13,0.55)] sm:px-10 sm:py-12"
    >
      <RecipeBackdrop
        recipeId={recipe.id}
        temperature={temperature}
        accent={[from, to]}
        surface="featured"
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream-50/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-cream-50/90">
            Coffee of the day
          </span>
          <span className="text-xs font-medium text-cream-50/70">{todayLabel}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-display text-sm text-cream-50/60">{recipe.number}</span>
          <h2
            id="coffee-of-the-day-heading"
            className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            {recipe.name}
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-cream-50/90 sm:text-base">
          {recipe.description}
        </p>

        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cream-50/80">
          <TemperatureIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Served {temperature} today
        </p>
      </div>
    </section>
  );
}
