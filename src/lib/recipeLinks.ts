import type { Recipe, Temperature } from "../types";

export interface RecipeSelection {
  recipeId: string;
  temperature: Temperature;
}

export function parseRecipeSelection(
  search: string,
  recipes: ReadonlyArray<Pick<Recipe, "id">>,
): RecipeSelection | null {
  const params = new URLSearchParams(search);
  const recipeId = params.get("recipe");
  if (!recipeId || !recipes.some((recipe) => recipe.id === recipeId)) return null;

  return {
    recipeId,
    temperature: params.get("temperature") === "Hot" ? "Hot" : "Iced",
  };
}

export function getRecipeShareUrl(
  recipeId: string,
  temperature: Temperature,
  origin: string,
  pathname: string,
): string {
  const params = new URLSearchParams({ recipe: recipeId, temperature });
  return `${origin}${pathname}?${params.toString()}`;
}

export const RECIPE_PATH = "/recipe";

export function isRecipePath(pathname: string): boolean {
  return pathname.replace(/\/+$/, "") === RECIPE_PATH;
}

