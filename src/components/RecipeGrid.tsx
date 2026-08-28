import type { Recipe, Temperature } from "../types";
import { defaultTemperatureForRecipePosition } from "../lib/coffeeOfTheDay";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  date: Date;
  todayId: string;
  onSelect: (recipe: Recipe, temperature?: Temperature) => void;
}

export function RecipeGrid({ recipes, date, todayId, onSelect }: RecipeGridProps) {
  return (
    <section id="recipes" className="mt-14 scroll-mt-24">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-espresso-950">
            All recipes
          </h2>
          <p className="mt-1 text-sm text-espresso-600">
            {recipes.length} coffees in the rotation
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, position) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isToday={recipe.id === todayId}
            defaultTemperature={defaultTemperatureForRecipePosition(recipes.length, position, date)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
