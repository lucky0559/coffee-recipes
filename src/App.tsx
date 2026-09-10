import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { CoffeeOfTheDay } from "./components/CoffeeOfTheDay";
import { RecipeGrid } from "./components/RecipeGrid";
import { RecipeModal } from "./components/RecipeModal";
import { recipes } from "./data/recipes";
import {
  DEFAULT_RECIPE_FILTERS,
  filterRecipes,
  type BuildPreference,
  type RecipeFilters,
} from "./lib/recipeFilters";
import { parseRecipeSelection, getRecipeShareUrl } from "./lib/recipeLinks";
import { useRecipePreferences } from "./lib/useRecipePreferences";
import {
  defaultTemperatureForDate,
  defaultTemperatureForRecipePosition,
  getCoffeeOfTheDay,
  getUpcomingQueue,
  queueIndexForDate,
} from "./lib/coffeeOfTheDay";
import type { Recipe, Temperature } from "./types";

interface SelectedRecipe {
  recipe: Recipe;
  temperature: Temperature;
}

function getRecipeFromUrl(availableRecipes: Recipe[] = recipes): SelectedRecipe | null {
  if (typeof window === "undefined") return null;

  const selection = parseRecipeSelection(window.location.search, availableRecipes);
  if (!selection) return null;

  const recipe = availableRecipes.find(({ id }) => id === selection.recipeId);
  return recipe ? { recipe, temperature: selection.temperature } : null;
}

function useCurrentDate(): Date {
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    let timeoutId: number;

    const scheduleNextMidnight = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timeoutId = window.setTimeout(() => {
        setToday(new Date());
        scheduleNextMidnight();
      }, Math.max(1, nextMidnight.getTime() - now.getTime()));
    };

    scheduleNextMidnight();
    return () => window.clearTimeout(timeoutId);
  }, []);

  return today;
}

function App() {
  const [selected, setSelected] = useState<SelectedRecipe | null>(() => getRecipeFromUrl(recipes));
  const [filters, setFilters] = useState<RecipeFilters>(DEFAULT_RECIPE_FILTERS);
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const preferences = useRecipePreferences();
  const { rememberRecipe } = preferences;
  const selectedRecipeId = selected?.recipe.id;
  const favoriteIds = useMemo(() => new Set(preferences.favorites), [preferences.favorites]);

  const today = useCurrentDate();
  const coffeeOfTheDay = useMemo(() => getCoffeeOfTheDay(recipes, today), [today]);
  const queue = useMemo(() => getUpcomingQueue(recipes, today), [today]);
  const position = useMemo(() => queueIndexForDate(recipes.length, today) + 1, [today]);
  const scheduledTemperature = useMemo(
    () => defaultTemperatureForDate(recipes.length, today),
    [today],
  );
  const buildPreference: BuildPreference = preferences.preferredTemperature ?? "Scheduled";
  const featuredTemperature = preferences.preferredTemperature ?? scheduledTemperature;
  const visibleRecipes = useMemo(
    () => filterRecipes(recipes, filters, favoriteIds, buildPreference),
    [buildPreference, favoriteIds, filters],
  );
  const recentRecipes = useMemo(
    () =>
      preferences.recentRecipeIds
        .map((id) => recipes.find((recipe) => recipe.id === id))
        .filter((recipe): recipe is Recipe => recipe !== undefined),
    [preferences.recentRecipeIds],
  );

  useEffect(() => {
    const syncSelectionFromUrl = () => setSelected(getRecipeFromUrl(recipes));
    window.addEventListener("popstate", syncSelectionFromUrl);
    return () => window.removeEventListener("popstate", syncSelectionFromUrl);
  }, []);

  useEffect(() => {
    if (selectedRecipeId) rememberRecipe(selectedRecipeId);
  }, [rememberRecipe, selectedRecipeId]);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const selectRecipe = useCallback(
    (recipe: Recipe, temperature?: Temperature) => {
      const recipePosition = recipes.findIndex(({ id }) => id === recipe.id);
      const scheduled =
        recipePosition < 0
          ? "Hot"
          : defaultTemperatureForRecipePosition(recipes.length, recipePosition, today);
      const resolvedTemperature = temperature ?? preferences.preferredTemperature ?? scheduled;

      setSelected({ recipe, temperature: resolvedTemperature });
      preferences.rememberRecipe(recipe.id);

      if (typeof window !== "undefined") {
        const nextUrl = getRecipeShareUrl(
          recipe.id,
          resolvedTemperature,
          window.location.origin,
          window.location.pathname,
        );
        if (window.location.href !== nextUrl) {
          window.history.pushState(
            { recipeId: recipe.id, temperature: resolvedTemperature },
            "",
            nextUrl,
          );
        }
      }
    },
    [preferences, today],
  );

  const closeRecipe = useCallback(() => {
    setSelected(null);
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`);
    }
  }, []);

  const updateSelectedTemperature = useCallback((temperature: Temperature) => {
    setSelected((current) => (current ? { ...current, temperature } : current));
    if (typeof window !== "undefined" && selected) {
      const nextUrl = getRecipeShareUrl(
        selected.recipe.id,
        temperature,
        window.location.origin,
        window.location.pathname,
      );
      window.history.replaceState(
        { recipeId: selected.recipe.id, temperature },
        "",
        nextUrl,
      );
    }
  }, [selected]);

  const showSaved = () => {
    setFilters({ ...DEFAULT_RECIPE_FILTERS, favoritesOnly: true });
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    document.getElementById("recipes")?.scrollIntoView({ block: "start", behavior });
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header
        isOnline={isOnline}
        savedCount={favoriteIds.size}
        onShowSaved={showSaved}
      />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <CoffeeOfTheDay
          key={`${coffeeOfTheDay.id}-${featuredTemperature}`}
          recipe={coffeeOfTheDay}
          date={today}
          queue={queue}
          position={position}
          total={recipes.length}
          defaultTemperature={featuredTemperature}
          preferredTemperature={preferences.preferredTemperature}
          isFavorite={preferences.isFavorite(coffeeOfTheDay.id)}
          onSelect={selectRecipe}
          onViewRecipe={(temperature) => selectRecipe(coffeeOfTheDay, temperature)}
          onToggleFavorite={preferences.toggleFavorite}
        />

        <RecipeGrid
          recipes={recipes}
          visibleRecipes={visibleRecipes}
          date={today}
          todayId={coffeeOfTheDay.id}
          filters={filters}
          buildPreference={buildPreference}
          favoriteIds={favoriteIds}
          recentRecipes={recentRecipes}
          onSelect={selectRecipe}
          onFiltersChange={setFilters}
          onBuildPreferenceChange={(preference) =>
            preferences.setPreferredTemperature(preference === "Scheduled" ? null : preference)
          }
          onToggleFavorite={preferences.toggleFavorite}
        />
      </main>

      <footer className="border-t border-espresso-900/8 py-8 text-center text-xs text-espresso-500">
        Brewline — one coffee at a time, in order.
      </footer>

      {selected && (
        <RecipeModal
          key={selected.recipe.id}
          recipe={selected.recipe}
          temperature={selected.temperature}
          isFavorite={preferences.isFavorite(selected.recipe.id)}
          onClose={closeRecipe}
          onToggleFavorite={preferences.toggleFavorite}
          onTemperatureChange={updateSelectedTemperature}
        />
      )}
    </div>
  );
}

export default App;
