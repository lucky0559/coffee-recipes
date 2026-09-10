import { describe, expect, it } from "vitest";
import {
  MAX_RECENT_RECIPES,
  parseRecipePreferences,
  rememberRecipe,
  serializeRecipePreferences,
  toggleFavorite,
} from "./recipePreferences";

describe("recipe preferences", () => {
  it("recovers safely from malformed or unsupported storage data", () => {
    expect(parseRecipePreferences("not-json")).toEqual({
      favorites: [],
      recentRecipeIds: [],
      preferredTemperature: null,
    });
    expect(parseRecipePreferences(JSON.stringify({ favorites: ["a", 2], preferredTemperature: "Warm" })))
      .toEqual({ favorites: ["a"], recentRecipeIds: [], preferredTemperature: null });
  });

  it("toggles favorites without duplicates", () => {
    expect(toggleFavorite(["a"], "a")).toEqual([]);
    expect(toggleFavorite(["a"], "b")).toEqual(["a", "b"]);
  });

  it("puts the latest recipe first and caps history", () => {
    const ids = Array.from({ length: MAX_RECENT_RECIPES + 2 }, (_, index) => String(index));
    const recent = ids.reduce(rememberRecipe, [] as string[]);

    expect(recent).toHaveLength(MAX_RECENT_RECIPES);
    expect(rememberRecipe(recent, "1")[0]).toBe("1");
    expect(serializeRecipePreferences({
      favorites: ["a"],
      recentRecipeIds: ["b"],
      preferredTemperature: "Iced",
    })).toContain('"preferredTemperature":"Iced"');
  });
});
