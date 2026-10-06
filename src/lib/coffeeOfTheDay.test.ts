import { describe, expect, it } from "vitest";

import {
  daysSinceEpoch,
  getAvailableTemperature,
  getCoffeeOfTheDay,
  getDefaultTemperature,
  getRotatingRecipes,
  getUpcomingQueue,
  queueIndexForDate,
} from "./coffeeOfTheDay";
import { recipes } from "../data/recipes";
import type { Recipe } from "../types";

function localDate(year: number, month: number, day: number, hour = 12): Date {
  return new Date(year, month, day, hour);
}

describe("coffee of the day rotation", () => {
  it("counts local calendar days from the rotation anchor", () => {
    expect(daysSinceEpoch(localDate(2026, 8, 23, 0))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 8, 23, 23))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 8, 27))).toBe(4);
    expect(daysSinceEpoch(localDate(2026, 8, 22))).toBe(-1);
  });

  it("normalizes queue positions across the end and beginning of the line", () => {
    const anchor = localDate(2026, 8, 23);

    expect(queueIndexForDate(13, anchor)).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 9, 5))).toBe(12);
    expect(queueIndexForDate(13, localDate(2026, 9, 6))).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 8, 22))).toBe(12);
    expect(queueIndexForDate(0, anchor)).toBe(0);
    expect(queueIndexForDate(-1, anchor)).toBe(0);
  });

  it("serves Biscoff on 2026-10-06 and Matcha Caramel the day after", () => {
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 6)).id).toBe("biscoff");
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 7)).id).toBe("matcha-caramel");
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 8)).id).toBe("cheesecake");
  });

  it("includes recipes with at least one temperature build in the rotation", () => {
    const unavailableRecipe: Recipe = {
      id: "unavailable",
      number: "00",
      name: "Unavailable",
      category: "Sweet",
      description: "",
    };
    const rotatingRecipes = getRotatingRecipes([...recipes, unavailableRecipe]);

    expect(rotatingRecipes).toHaveLength(15);
    expect(rotatingRecipes.map(({ id }) => id)).toContain("gula-melaka");
    expect(rotatingRecipes.map(({ id }) => id)).not.toContain("unavailable");
    expect(getUpcomingQueue(recipes, localDate(2026, 8, 23)).map(({ id }) => id)).toContain(
      "gula-melaka",
    );
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 8, 28)).id).toBe("gula-melaka");
  });

  it("keeps Iced-only recipes apart in the library order that the rotation follows", () => {
    const rotation = getRotatingRecipes(recipes);
    const icedOnlyPositions = rotation
      .map((recipe, index) => (recipe.hot === undefined ? index : -1))
      .filter((index) => index >= 0);

    expect(rotation.map(({ id }) => id)).toEqual(recipes.map(({ id }) => id));
    expect(icedOnlyPositions).toHaveLength(3);
    icedOnlyPositions.forEach((position, i) => {
      const next = icedOnlyPositions[(i + 1) % icedOnlyPositions.length];
      const gap = (next - position + rotation.length) % rotation.length;
      expect(gap).toBeGreaterThanOrEqual(3);
    });
  });

  it("defaults to a recipe's recommended build, else Hot, else Iced for Iced-only recipes", () => {
    const byId = (id: string) => recipes.find((recipe) => recipe.id === id)!;

    expect(getDefaultTemperature(byId("biscoff"))).toBe("Iced");
    expect(getDefaultTemperature(byId("cheesecake"))).toBe("Hot");
    expect(getDefaultTemperature(byId("gula-melaka"))).toBe("Iced");
    expect(
      getDefaultTemperature({ ...byId("cheesecake"), recommended: ["Iced"], iced: undefined }),
    ).toBe("Hot");
  });

  it("falls back to an available build for partial recipes", () => {
    const gulaMelaka = recipes.find((recipe) => recipe.id === "gula-melaka");

    expect(gulaMelaka).toBeDefined();
    expect(getAvailableTemperature(gulaMelaka!, "Hot")).toBe("Iced");
    expect(getAvailableTemperature(gulaMelaka!, "Iced")).toBe("Iced");
  });

  it("returns today's recipe and the wrapped serving queue", () => {
    const sample = recipes.slice(0, 3);
    const date = localDate(2026, 8, 25);

    expect(getCoffeeOfTheDay(sample, date).id).toBe("sea-salt");
    expect(getUpcomingQueue(sample, date).map((recipe) => recipe.id)).toEqual([
      "sea-salt",
      "cheesecake",
      "caramel",
    ]);
    expect(getUpcomingQueue([], date)).toEqual([]);
  });
});
