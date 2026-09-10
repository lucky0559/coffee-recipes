import { describe, expect, it } from "vitest";
import { recipes } from "../data/recipes";
import { DEFAULT_RECIPE_FILTERS, filterRecipes } from "./recipeFilters";

describe("recipe discovery filters", () => {
  it("matches names, ingredients, notes, and substitutions", () => {
    expect(
      filterRecipes(recipes, { ...DEFAULT_RECIPE_FILTERS, query: "biscoff" }, new Set()).map(
        ({ id }) => id,
      ),
    ).toEqual(["biscoff"]);
    expect(
      filterRecipes(recipes, { ...DEFAULT_RECIPE_FILTERS, query: "coconut cream" }, new Set()).map(
        ({ id }) => id,
      ),
    ).toContain("cheesecake");
  });

  it("combines category, saved, and build allergen filters", () => {
    const saved = new Set(["matcha", "biscoff"]);
    expect(
      filterRecipes(
        recipes,
        { ...DEFAULT_RECIPE_FILTERS, category: "Matcha", favoritesOnly: true },
        saved,
      ).map(({ id }) => id),
    ).toEqual(["matcha"]);
    expect(
      filterRecipes(
        recipes,
        { ...DEFAULT_RECIPE_FILTERS, allergenFreeOnly: true },
        new Set(),
        "Hot",
      ).map(({ id }) => id),
    ).toContain("matcha");
  });
});
