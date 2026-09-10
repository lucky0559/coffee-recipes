import { Heart, Search, ShieldCheck, X } from "lucide-react";
import type { Recipe, Temperature } from "../types";
import { defaultTemperatureForRecipePosition } from "../lib/coffeeOfTheDay";
import {
  DEFAULT_RECIPE_FILTERS,
  type BuildPreference,
  type CategoryFilter,
  type RecipeFilters,
} from "../lib/recipeFilters";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  visibleRecipes: Recipe[];
  date: Date;
  todayId: string;
  filters: RecipeFilters;
  buildPreference: BuildPreference;
  favoriteIds: ReadonlySet<string>;
  recentRecipes: Recipe[];
  onSelect: (recipe: Recipe, temperature?: Temperature) => void;
  onFiltersChange: (filters: RecipeFilters) => void;
  onBuildPreferenceChange: (preference: BuildPreference) => void;
  onToggleFavorite: (recipeId: string) => void;
}

const categories: CategoryFilter[] = ["All", "Sweet", "Savory", "Matcha", "Classic"];
const buildPreferences: Array<{ value: BuildPreference; label: string }> = [
  { value: "Scheduled", label: "Schedule" },
  { value: "Hot", label: "Hot" },
  { value: "Iced", label: "Iced" },
];

export function RecipeGrid({
  recipes,
  visibleRecipes,
  date,
  todayId,
  filters,
  buildPreference,
  favoriteIds,
  recentRecipes,
  onSelect,
  onFiltersChange,
  onBuildPreferenceChange,
  onToggleFavorite,
}: RecipeGridProps) {
  const updateFilter = <Key extends keyof RecipeFilters>(key: Key, value: RecipeFilters[Key]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => onFiltersChange(DEFAULT_RECIPE_FILTERS);

  return (
    <section id="recipes" className="mt-14 scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-espresso-950">All recipes</h2>
          <p className="mt-1 text-sm text-espresso-600">
            {visibleRecipes.length === recipes.length
              ? `${recipes.length} coffees in the rotation`
              : `${visibleRecipes.length} of ${recipes.length} recipes shown`}
          </p>
        </div>
        <div
          role="group"
          aria-label="Preferred build temperature"
          className="flex items-center gap-0.5 rounded-full border border-espresso-900/10 bg-cream-100 p-1 text-xs font-semibold text-espresso-600"
        >
          {buildPreferences.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onBuildPreferenceChange(value)}
              aria-pressed={buildPreference === value}
              className={`rounded-full px-3 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
                buildPreference === value ? "bg-espresso-900 text-cream-50" : "hover:bg-cream-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {recentRecipes.length > 0 && (
        <div className="mb-6 border-b border-espresso-900/10 pb-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-espresso-600">
              Recently opened
            </h3>
            <span className="text-xs text-espresso-500">Saved on this device</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {recentRecipes.map((recipe) => (
              <button
                key={recipe.id}
                type="button"
                onClick={() =>
                  onSelect(recipe, buildPreference === "Scheduled" ? undefined : buildPreference)
                }
                className="shrink-0 rounded-full border border-espresso-900/15 bg-cream-50 px-3 py-2 text-sm font-medium text-espresso-800 transition hover:border-espresso-900/30 hover:bg-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
              >
                {recipe.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-7 space-y-3 rounded-2xl border border-espresso-900/10 bg-cream-100/70 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="recipe-search" className="sr-only">
            Search recipes and ingredients
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-500"
            />
            <input
              id="recipe-search"
              type="search"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Search recipes, ingredients, or substitutions"
              className="w-full rounded-xl border border-espresso-900/15 bg-cream-50 py-2.5 pl-10 pr-10 text-sm text-espresso-950 outline-none transition placeholder:text-espresso-500 focus:border-amber-glow focus:ring-2 focus:ring-amber-glow/25"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => updateFilter("query", "")}
                aria-label="Clear recipe search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-espresso-500 transition hover:bg-espresso-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => updateFilter("favoritesOnly", !filters.favoritesOnly)}
            aria-pressed={filters.favoritesOnly}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
              filters.favoritesOnly
                ? "border-espresso-900 bg-espresso-900 text-cream-50"
                : "border-espresso-900/15 bg-cream-50 text-espresso-800 hover:border-espresso-900/30"
            }`}
          >
            <Heart aria-hidden="true" className={`h-4 w-4 ${filters.favoritesOnly ? "fill-current" : ""}`} />
            Saved {favoriteIds.size > 0 && `(${favoriteIds.size})`}
          </button>
          <button
            type="button"
            onClick={() => updateFilter("allergenFreeOnly", !filters.allergenFreeOnly)}
            aria-pressed={filters.allergenFreeOnly}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
              filters.allergenFreeOnly
                ? "border-espresso-900 bg-espresso-900 text-cream-50"
                : "border-espresso-900/15 bg-cream-50 text-espresso-800 hover:border-espresso-900/30"
            }`}
          >
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            Allergen-free build
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Recipe category">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.12em] text-espresso-500">
            Category
          </span>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => updateFilter("category", category)}
              aria-pressed={filters.category === category}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
                filters.category === category
                  ? "border-espresso-900 bg-espresso-900 text-cream-50"
                  : "border-espresso-900/15 bg-cream-50 text-espresso-700 hover:border-espresso-900/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRecipes.map((recipe) => {
            const position = recipes.findIndex(({ id }) => id === recipe.id);
            return (
              <RecipeCard
                key={`${recipe.id}-${buildPreference}-${date.toDateString()}`}
                recipe={recipe}
                isToday={recipe.id === todayId}
                defaultTemperature={
                  buildPreference === "Scheduled"
                    ? defaultTemperatureForRecipePosition(recipes.length, position, date)
                    : buildPreference
                }
                isFavorite={favoriteIds.has(recipe.id)}
                onSelect={onSelect}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-espresso-900/20 bg-cream-100/60 px-6 py-12 text-center">
          <h3 className="font-display text-xl font-semibold text-espresso-950">No recipes found</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-espresso-600">
            Try a different search or clear a filter to see more of the rotation.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 rounded-full bg-espresso-900 px-4 py-2 text-sm font-semibold text-cream-50 transition hover:bg-espresso-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
