import type { Category, Recipe, Temperature } from "../types";

export type CategoryFilter = Category | "All";
export type BuildPreference = Temperature | "Scheduled";

export interface RecipeFilters {
  query: string;
  category: CategoryFilter;
  favoritesOnly: boolean;
  allergenFreeOnly: boolean;
}

export const DEFAULT_RECIPE_FILTERS: RecipeFilters = {
  query: "",
  category: "All",
  favoritesOnly: false,
  allergenFreeOnly: false,
};

function buildSearchText(recipe: Recipe): string {
  const builds = [recipe.hot, recipe.iced];
  return [
    recipe.name,
    recipe.category,
    ...builds.flatMap((build) => [
      build.note ?? "",
      ...build.ingredients.flatMap(({ name, amount }) => [name, amount]),
      ...build.substitutions.flatMap(({ ingredient, alternatives }) => [
        ingredient,
        ...alternatives,
      ]),
    ]),
  ]
    .join(" ")
    .toLocaleLowerCase();
}

function buildHasNoListedAllergens(recipe: Recipe, preference: BuildPreference): boolean {
  if (preference === "Hot") return recipe.hot.allergens.length === 0;
  if (preference === "Iced") return recipe.iced.allergens.length === 0;

  return recipe.hot.allergens.length === 0 || recipe.iced.allergens.length === 0;
}

export function filterRecipes(
  recipes: Recipe[],
  filters: RecipeFilters,
  favoriteIds: ReadonlySet<string>,
  buildPreference: BuildPreference = "Scheduled",
): Recipe[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return recipes.filter((recipe) => {
    if (filters.category !== "All" && recipe.category !== filters.category) return false;
    if (filters.favoritesOnly && !favoriteIds.has(recipe.id)) return false;
    if (filters.allergenFreeOnly && !buildHasNoListedAllergens(recipe, buildPreference)) {
      return false;
    }
    return query.length === 0 || buildSearchText(recipe).includes(query);
  });
}
