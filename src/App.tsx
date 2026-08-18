import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { CoffeeOfTheDay } from "./components/CoffeeOfTheDay";
import { RecipeGrid } from "./components/RecipeGrid";
import { RecipeModal } from "./components/RecipeModal";
import { recipes } from "./data/recipes";
import { getCoffeeOfTheDay, getUpcomingQueue, queueIndexForDate } from "./lib/coffeeOfTheDay";
import type { Recipe } from "./types";

function App() {
  const [selected, setSelected] = useState<Recipe | null>(null);

  const today = useMemo(() => new Date(), []);
  const coffeeOfTheDay = useMemo(() => getCoffeeOfTheDay(recipes, today), [today]);
  const queue = useMemo(() => getUpcomingQueue(recipes, today), [today]);
  const position = useMemo(() => queueIndexForDate(recipes.length, today) + 1, [today]);

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <CoffeeOfTheDay
          recipe={coffeeOfTheDay}
          queue={queue}
          position={position}
          total={recipes.length}
          onSelect={setSelected}
          onViewRecipe={() => setSelected(coffeeOfTheDay)}
        />

        <RecipeGrid recipes={recipes} todayId={coffeeOfTheDay.id} onSelect={setSelected} />
      </main>

      <footer className="border-t border-espresso-900/8 py-8 text-center text-xs text-espresso-500">
        Brewline — one coffee at a time, in order.
      </footer>

      {selected && <RecipeModal recipe={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;
