import type { Temperature } from "../types";

export const RECIPE_PREFERENCES_KEY = "brewline.recipe-preferences";
export const MAX_RECENT_RECIPES = 6;

export interface RecipePreferences {
  favorites: string[];
  recentRecipeIds: string[];
  preferredTemperature: Temperature | null;
}

export const DEFAULT_RECIPE_PREFERENCES: RecipePreferences = {
  favorites: [],
  recentRecipeIds: [],
  preferredTemperature: null,
};

function uniqueStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return [...new Set(value.filter((item): item is string => typeof item === "string"))];
}

export function parseRecipePreferences(raw: string | null): RecipePreferences {
  if (!raw) return DEFAULT_RECIPE_PREFERENCES;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_RECIPE_PREFERENCES;

    const candidate = parsed as {
      favorites?: unknown;
      recentRecipeIds?: unknown;
      preferredTemperature?: unknown;
    };

    return {
      favorites: uniqueStrings(candidate.favorites),
      recentRecipeIds: uniqueStrings(candidate.recentRecipeIds).slice(0, MAX_RECENT_RECIPES),
      preferredTemperature:
        candidate.preferredTemperature === "Hot" || candidate.preferredTemperature === "Iced"
          ? candidate.preferredTemperature
          : null,
    };
  } catch {
    return DEFAULT_RECIPE_PREFERENCES;
  }
}

export function serializeRecipePreferences(preferences: RecipePreferences): string {
  return JSON.stringify(preferences);
}

export function toggleFavorite(favorites: string[], recipeId: string): string[] {
  return favorites.includes(recipeId)
    ? favorites.filter((id) => id !== recipeId)
    : [...favorites, recipeId];
}

export function rememberRecipe(recentRecipeIds: string[], recipeId: string): string[] {
  return [recipeId, ...recentRecipeIds.filter((id) => id !== recipeId)].slice(
    0,
    MAX_RECENT_RECIPES,
  );
}
