import { describe, expect, it } from "vitest";

import { recipes } from "./recipes";
import { getRecipeImage } from "./recipeImages";

const expectedRecipeLine = [
  { id: "cheesecake", category: "Sweet" },
  { id: "caramel", category: "Sweet" },
  { id: "sea-salt", category: "Savory" },
  { id: "caramelized-patis", category: "Savory" },
  { id: "matcha", category: "Matcha" },
  { id: "spanish", category: "Classic" },
  { id: "matcha-spiced", category: "Matcha" },
  { id: "kape-tibuok", category: "Classic" },
  { id: "spanish-cinnamon", category: "Classic" },
  { id: "salted-caramel", category: "Sweet" },
  { id: "dirty-matcha", category: "Matcha" },
  { id: "biscoff", category: "Sweet" },
  { id: "matcha-caramel", category: "Matcha" },
] as const;

describe("recipe data", () => {
  it("keeps the 13-item serving line ordered and uniquely numbered", () => {
    expect(recipes).toHaveLength(13);
    expect(recipes.map(({ id, category }) => ({ id, category }))).toEqual(expectedRecipeLine);
    expect(new Set(recipes.map((recipe) => recipe.id)).size).toBe(recipes.length);
    expect(new Set(recipes.map((recipe) => recipe.number)).size).toBe(recipes.length);

    recipes.forEach((recipe, index) => {
      expect(recipe.number).toBe(String(index + 1).padStart(2, "0"));
    });
  });

  it("provides non-empty ingredient data for both temperature builds", () => {
    recipes.forEach((recipe) => {
      [recipe.hot, recipe.iced].forEach((build) => {
        expect(build.ingredients.length).toBeGreaterThan(0);

        build.ingredients.forEach((ingredient) => {
          expect(ingredient.name.trim()).not.toBe("");
          expect(ingredient.amount.trim()).not.toBe("");
        });

        if (build.note !== undefined) {
          expect(build.note.trim()).not.toBe("");
        }
      });
    });
  });

  it("keeps Matcha Spiced syrup in the iced drink build", () => {
    const matchaSpiced = recipes.find((recipe) => recipe.id === "matcha-spiced");

    expect(matchaSpiced?.iced.ingredients).toContainEqual({
      name: "Spiced Biscuit Syrup",
      amount: "15 ml",
    });
    expect(matchaSpiced?.iced.note).not.toContain("spiced biscuit syrup");
  });

  it("keeps syrup out of Hot Salted Caramel and uses 10 ml caramel sauce", () => {
    const saltedCaramel = recipes.find((recipe) => recipe.id === "salted-caramel");

    expect(
      saltedCaramel?.hot.ingredients.some(({ name }) => name === "Caramel Syrup"),
    ).toBe(false);
    expect(saltedCaramel?.hot.ingredients).toContainEqual({
      name: "Caramel Sauce",
      amount: "10 ml",
    });
  });

  it("keeps Iced Salted Caramel flavors in their intended drink and foam builds", () => {
    const saltedCaramel = recipes.find((recipe) => recipe.id === "salted-caramel");

    expect(
      saltedCaramel?.iced.ingredients.some(({ name }) => name === "Vanilla Syrup"),
    ).toBe(false);
    expect(saltedCaramel?.iced.ingredients).toContainEqual({
      name: "Caramel Syrup",
      amount: "20 ml",
    });
    expect(saltedCaramel?.iced.ingredients).toContainEqual({
      name: "Caramel Sauce",
      amount: "drizzle",
    });
    expect(saltedCaramel?.iced.note).toBe(
      "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 10 ml, sea salt pinch",
    );
    expect(saltedCaramel?.iced.note).not.toContain("caramel sauce");
    expect(saltedCaramel?.iced.note).not.toContain("caramel syrup");
  });

  it("keeps Iced Dirty Matcha mixture milk separate from the main milk", () => {
    const dirtyMatcha = recipes.find((recipe) => recipe.id === "dirty-matcha");

    expect(dirtyMatcha?.iced.ingredients).toContainEqual({
      name: "Milk (for matcha powder mixture)",
      amount: "60 ml",
    });
    expect(dirtyMatcha?.iced.ingredients).toContainEqual({
      name: "Milk",
      amount: "100 ml",
    });
    expect(dirtyMatcha?.iced.ingredients).toContainEqual({
      name: "Honey/Blue Agave",
      amount: "15 ml",
    });
    expect(
      dirtyMatcha?.iced.ingredients.some(({ name }) => name === "Water"),
    ).toBe(false);
    expect(dirtyMatcha?.iced.note).toContain(
      "combine the matcha powder with 60 ml milk before adding 100 ml milk and honey",
    );
  });

  it("maps every recipe to a Hot and Iced local image", () => {
    recipes.forEach((recipe) => {
      expect(getRecipeImage(recipe.id, "Hot")).toBe(`/recipes/${recipe.id}-hot.webp`);
      expect(getRecipeImage(recipe.id, "Iced")).toBe(`/recipes/${recipe.id}.webp`);
    });
  });
});
