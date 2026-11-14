import { useMemo, useRef, useState } from "react";
import { CoffeeOfTheDayPreview } from "../components/CoffeeOfTheDayPreview";
import { Header } from "../components/Header";
import { RecipeBackdrop } from "../components/RecipeBackdrop";
import { RecommendedIcon } from "../components/RecommendedIcon";
import { CATEGORY_STYLES } from "../data/categories";
import { recipes } from "../data/recipes";
import {
  getAvailableTemperature,
  getCoffeeOfTheDay,
  getRotatingRecipes,
  scheduledTemperatureForDate,
} from "../lib/coffeeOfTheDay";
import {
  DRINK_TYPES,
  filterByDrinkType,
  getDrinkType,
  type DrinkType,
} from "../lib/recipeFilters";
import { RECIPE_PATH } from "../lib/recipeLinks";
import { useCurrentDate } from "../lib/useCurrentDate";
import { useOnlineStatus } from "../lib/useOnlineStatus";
import type { Recipe, Temperature } from "../types";

function getServedTemperatures(recipe: Recipe): Temperature[] {
  return (["Hot", "Iced"] as const).filter((temperature) =>
    temperature === "Hot" ? recipe.hot : recipe.iced,
  );
}

function RecommendedHint() {
  return (
    <aside aria-label="What the house pick badge means" className="mt-4 flex items-center gap-2.5">
      <RecommendedIcon className="h-6 w-6 shrink-0 object-contain" />
      <p className="text-sm text-espresso-700">
        <span className="font-semibold text-espresso-950">House pick:</span> our bestsellers. Order
        the temperature on the badge.
      </p>
    </aside>
  );
}

// Matcha and Refresher are drink types on their own; everything else is a coffee, so the
// flavor category reads "Sweet coffee" and matches the Coffee filter.
function getCategoryLabel(recipe: Recipe): string {
  return getDrinkType(recipe) === "Coffee" ? `${recipe.category} coffee` : recipe.category;
}

const SECRET_CLICK_COUNT = 5;
const SECRET_CLICK_WINDOW_MS = 1500;

// Hidden shortcut: quickly clicking the "The menu" label opens the full recipe page.
function useSecretRecipeShortcut(): () => void {
  const clicks = useRef({ count: 0, lastAt: 0 });

  return () => {
    const now = Date.now();
    const count = now - clicks.current.lastAt > SECRET_CLICK_WINDOW_MS ? 1 : clicks.current.count + 1;
    clicks.current = { count, lastAt: now };
    if (count >= SECRET_CLICK_COUNT) window.location.assign(RECIPE_PATH);
  };
}

function DrinkCard({ recipe }: { recipe: Recipe }) {
  const temperature = getAvailableTemperature(recipe, "Iced");
  const { pill } = CATEGORY_STYLES[recipe.category];
  const isRecommended = (recipe.recommended?.length ?? 0) > 0;

  return (
    <li>
      <article className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-cream-50/20 bg-espresso-950 shadow-sm">
        <RecipeBackdrop recipeId={recipe.id} temperature={temperature} surface="card" />

        <div className="relative z-10 flex flex-wrap items-center gap-2.5 p-5 pb-0">
          <span className="font-display text-xs font-medium text-cream-50/75">{recipe.number}</span>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream-50"
            style={{ backgroundColor: pill }}
          >
            {getCategoryLabel(recipe)}
          </span>
          {isRecommended && (
            <span
              role="img"
              aria-label={`Recommended bestseller: ${recipe.recommended?.join(" / ")}`}
              className="inline-flex h-7 items-center gap-1.5 rounded-full bg-cream-50/90 pl-1 pr-2.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-espresso-950 shadow-sm"
            >
              <RecommendedIcon className="h-5 w-5 shrink-0 object-contain" />
              <span aria-hidden="true">{recipe.recommended?.join(" / ")}</span>
            </span>
          )}
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-2 p-5">
          <h3 className="font-display text-xl font-semibold leading-snug text-cream-50 drop-shadow-sm">
            {recipe.name}
          </h3>
          <p className="text-sm leading-relaxed text-cream-50/90">{recipe.description}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-cream-50/75">
            {getServedTemperatures(recipe).join(" · ")}
          </p>
        </div>
      </article>
    </li>
  );
}

export function HomePage() {
  const isOnline = useOnlineStatus();
  const onMenuLabelClick = useSecretRecipeShortcut();
  const [drinkType, setDrinkType] = useState<DrinkType>("All");
  const visibleRecipes = useMemo(() => filterByDrinkType(recipes, drinkType), [drinkType]);

  const today = useCurrentDate();
  const rotatingRecipes = useMemo(() => getRotatingRecipes(recipes), []);
  const coffeeOfTheDay = useMemo(
    () => getCoffeeOfTheDay(rotatingRecipes, today),
    [rotatingRecipes, today],
  );
  const scheduledTemperature = useMemo(
    () => scheduledTemperatureForDate(rotatingRecipes, today),
    [rotatingRecipes, today],
  );

  return (
    <div className="min-h-screen bg-cream-50">
      <Header isOnline={isOnline} />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-6 sm:pt-10">
        <CoffeeOfTheDayPreview
          recipe={coffeeOfTheDay}
          temperature={getAvailableTemperature(coffeeOfTheDay, scheduledTemperature)}
          date={today}
        />
        <section aria-labelledby="drinks-heading" className="flex flex-col gap-2">
          <p
            onClick={onMenuLabelClick}
            className="w-fit select-none text-xs font-semibold uppercase tracking-[0.2em] text-espresso-500"
          >
            The menu
          </p>
          <h1
            id="drinks-heading"
            className="font-display text-2xl font-semibold tracking-tight text-espresso-950 sm:text-3xl"
          >
            {recipes.length} drinks to choose from
          </h1>
          <p className="max-w-2xl text-base text-espresso-700">
            What each one tastes like, served hot or iced.
          </p>
        </section>

        <div
          role="group"
          aria-label="Filter drinks by type"
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          {DRINK_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDrinkType(type)}
              aria-pressed={drinkType === type}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
                drinkType === type
                  ? "border-espresso-900 bg-espresso-900 text-cream-50"
                  : "border-espresso-900/15 bg-cream-50 text-espresso-700 hover:border-espresso-900/30"
              }`}
            >
              {type}
            </button>
          ))}
          <span className="ml-1 text-sm text-espresso-500" aria-live="polite">
            {visibleRecipes.length} {visibleRecipes.length === 1 ? "drink" : "drinks"}
          </span>
        </div>

        <RecommendedHint />

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRecipes.map((recipe) => (
            <DrinkCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </main>

      <footer className="border-t border-espresso-900/8 py-8 text-center text-xs text-espresso-500">
        Brewline — one coffee at a time, in order.
      </footer>
    </div>
  );
}
