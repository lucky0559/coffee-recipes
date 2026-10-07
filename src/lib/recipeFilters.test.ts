import { describe, expect, it } from "vitest";
import { recipes } from "../data/recipes";
import { DEFAULT_RECIPE_FILTERS, filterByDrinkType, filterRecipes } from "./recipeFilters";

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

describe("drink type filter", () => {
  it("splits the menu into coffee, matcha, and refresher drinks", () => {
    const matchaIds = filterByDrinkType(recipes, "Matcha").map(({ id }) => id);
    const coffeeIds = filterByDrinkType(recipes, "Coffee").map(({ id }) => id);
    const refresherIds = filterByDrinkType(recipes, "Refresher").map(({ id }) => id);

    expect(refresherIds).toEqual(["guava-spark-espresso", "calamansi-aerocano"]);
    expect(matchaIds).toEqual([
      "matcha",
      "matcha-spiced",
      "dirty-matcha",
      "matcha-caramel",
      "matcha-strawberry-cloud",
    ]);
    expect(coffeeIds).not.toContain("matcha");
    expect(coffeeIds).toContain("biscoff");
    expect(coffeeIds).not.toContain("guava-spark-espresso");
    expect(coffeeIds.length + matchaIds.length + refresherIds.length).toBe(recipes.length);
    expect(filterByDrinkType(recipes, "All")).toBe(recipes);
  });
});
