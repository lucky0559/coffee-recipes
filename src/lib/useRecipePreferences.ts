import { useCallback, useEffect, useState } from "react";
import type { Temperature } from "../types";
import {
  DEFAULT_RECIPE_PREFERENCES,
  RECIPE_PREFERENCES_KEY,
  parseRecipePreferences,
  rememberRecipe as rememberRecipeId,
  serializeRecipePreferences,
  toggleFavorite as toggleFavoriteId,
  type RecipePreferences,
} from "./recipePreferences";

function readPreferences(): RecipePreferences {
  if (typeof window === "undefined") return DEFAULT_RECIPE_PREFERENCES;

  try {
    return parseRecipePreferences(window.localStorage.getItem(RECIPE_PREFERENCES_KEY));
  } catch {
    return DEFAULT_RECIPE_PREFERENCES;
  }
}

export function useRecipePreferences() {
  const [preferences, setPreferences] = useState<RecipePreferences>(readPreferences);

  useEffect(() => {
    try {
      window.localStorage.setItem(RECIPE_PREFERENCES_KEY, serializeRecipePreferences(preferences));
    } catch {
      // Private browsing and storage-disabled contexts should remain usable in memory.
    }
  }, [preferences]);

  const toggleFavorite = useCallback((recipeId: string) => {
    setPreferences((current) => ({
      ...current,
      favorites: toggleFavoriteId(current.favorites, recipeId),
    }));
  }, []);

  const rememberRecipe = useCallback((recipeId: string) => {
    setPreferences((current) => ({
      ...current,
      recentRecipeIds: rememberRecipeId(current.recentRecipeIds, recipeId),
    }));
  }, []);

  const setPreferredTemperature = useCallback((preferredTemperature: Temperature | null) => {
    setPreferences((current) => ({ ...current, preferredTemperature }));
  }, []);

  return {
    ...preferences,
    isFavorite: (recipeId: string) => preferences.favorites.includes(recipeId),
    toggleFavorite,
    rememberRecipe,
    setPreferredTemperature,
  };
}
