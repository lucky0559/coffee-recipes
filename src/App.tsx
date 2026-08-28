import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { CoffeeOfTheDay } from "./components/CoffeeOfTheDay";
import { RecipeGrid } from "./components/RecipeGrid";
import { RecipeModal } from "./components/RecipeModal";
import { recipes } from "./data/recipes";
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
  const [selected, setSelected] = useState<SelectedRecipe | null>(null);

  const today = useCurrentDate();
  const coffeeOfTheDay = useMemo(() => getCoffeeOfTheDay(recipes, today), [today]);
  const queue = useMemo(() => getUpcomingQueue(recipes, today), [today]);
  const position = useMemo(() => queueIndexForDate(recipes.length, today) + 1, [today]);
  const defaultTemperature = useMemo(
    () => defaultTemperatureForDate(recipes.length, today),
    [today],
  );

  const selectRecipe = (recipe: Recipe, temperature?: Temperature) => {
    const recipePosition = recipes.findIndex(({ id }) => id === recipe.id);
    const scheduledTemperature =
      recipePosition < 0
        ? "Hot"
        : defaultTemperatureForRecipePosition(recipes.length, recipePosition, today);

    setSelected({
      recipe,
      temperature: temperature ?? scheduledTemperature,
    });
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <CoffeeOfTheDay
          recipe={coffeeOfTheDay}
          date={today}
          queue={queue}
          position={position}
          total={recipes.length}
          defaultTemperature={defaultTemperature}
          onSelect={selectRecipe}
          onViewRecipe={(temperature) => setSelected({ recipe: coffeeOfTheDay, temperature })}
        />

        <RecipeGrid
          recipes={recipes}
          date={today}
          todayId={coffeeOfTheDay.id}
          onSelect={selectRecipe}
        />
      </main>

      <footer className="border-t border-espresso-900/8 py-8 text-center text-xs text-espresso-500">
        Brewline — one coffee at a time, in order.
      </footer>

      {selected && (
        <RecipeModal
          recipe={selected.recipe}
          initialTemperature={selected.temperature}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default App;
