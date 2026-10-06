import { describe, expect, it } from "vitest";

import {
  daysSinceEpoch,
  defaultTemperatureForDate,
  defaultTemperatureForRecipePosition,
  getAvailableTemperature,
  getCoffeeOfTheDay,
  getRotatingRecipes,
  getUpcomingQueue,
  queueIndexForDate,
  scheduledTemperatureForDate,
  scheduledTemperatureForPosition,
} from "./coffeeOfTheDay";
import { recipes } from "../data/recipes";
import type { Recipe } from "../types";

function localDate(year: number, month: number, day: number, hour = 12): Date {
  return new Date(year, month, day, hour);
}

describe("coffee of the day rotation", () => {
  it("counts local calendar days from the rotation anchor", () => {
    expect(daysSinceEpoch(localDate(2026, 8, 11, 0))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 8, 11, 23))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 8, 15))).toBe(4);
    expect(daysSinceEpoch(localDate(2026, 8, 10))).toBe(-1);
  });

  it("normalizes queue positions across the end and beginning of the line", () => {
    const anchor = localDate(2026, 8, 11);

    expect(queueIndexForDate(13, anchor)).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 8, 23))).toBe(12);
    expect(queueIndexForDate(13, localDate(2026, 8, 24))).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 8, 10))).toBe(12);
    expect(queueIndexForDate(0, anchor)).toBe(0);
    expect(queueIndexForDate(-1, anchor)).toBe(0);
  });

  it("starts today's featured recipe on Matcha", () => {
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 8, 15)).id).toBe("matcha");
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
    expect(getUpcomingQueue(recipes, localDate(2026, 8, 11)).map(({ id }) => id)).toContain(
      "gula-melaka",
    );
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 8, 16)).id).toBe("gula-melaka");
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

  it("never serves Iced on two days in a row, including around Iced-only recipes", () => {
    const rotation = getRotatingRecipes(recipes);
    const iced = (date: Date) => {
      const position = queueIndexForDate(rotation.length, date);
      return (
        getAvailableTemperature(
          rotation[position],
          scheduledTemperatureForDate(rotation, date),
        ) === "Iced"
      );
    };

    // Several cycles, so the wrap from the end of the line to the start is covered too.
    let consecutiveIced = 0;
    let longestRun = 0;
    for (let day = 0; day < rotation.length * 4; day += 1) {
      consecutiveIced = iced(localDate(2026, 8, 11 + day)) ? consecutiveIced + 1 : 0;
      longestRun = Math.max(longestRun, consecutiveIced);
    }

    expect(longestRun).toBe(1);
  });

  it("alternates Hot and Iced around the Iced-only recipes with no long runs", () => {
    const rotation = getRotatingRecipes(recipes);
    const pattern = (date: Date) =>
      rotation
        .map((recipe, i) =>
          getAvailableTemperature(recipe, scheduledTemperatureForPosition(rotation, i, date))[0],
        )
        .join("");

    // One Hot, Hot pair is unavoidable between the two Iced-only recipes that are 3 apart.
    expect(pattern(localDate(2026, 8, 11))).toBe("HIHIHIHIHIHHIHI");
    // Same pattern in every cycle, unlike the no-Iced-only fallback that flips each cycle.
    expect(pattern(localDate(2026, 8, 26))).toBe("HIHIHIHIHIHHIHI");
    expect(pattern(localDate(2026, 9, 6))).toBe("HIHIHIHIHIHHIHI");
  });

  it("flips the alternation each cycle when no recipe is Iced-only", () => {
    const twoBuild = getRotatingRecipes(recipes.filter((recipe) => recipe.hot && recipe.iced));
    const first = scheduledTemperatureForPosition(twoBuild, 0, localDate(2026, 8, 11));
    const afterReset = scheduledTemperatureForPosition(
      twoBuild,
      0,
      localDate(2026, 8, 11 + twoBuild.length),
    );

    expect(first).toBe("Hot");
    expect(afterReset).toBe("Iced");
  });

  it("falls back to Hot for an empty rotation", () => {
    expect(scheduledTemperatureForDate([], localDate(2026, 8, 11))).toBe("Hot");
    expect(scheduledTemperatureForPosition([], 0, localDate(2026, 8, 11))).toBe("Hot");
  });

  it("falls back to an available build for partial recipes", () => {
    const gulaMelaka = recipes.find((recipe) => recipe.id === "gula-melaka");

    expect(gulaMelaka).toBeDefined();
    expect(getAvailableTemperature(gulaMelaka!, "Hot")).toBe("Iced");
    expect(getAvailableTemperature(gulaMelaka!, "Iced")).toBe("Iced");
  });

  it("returns today's recipe and the wrapped serving queue", () => {
    const sample = recipes.slice(0, 3);
    const date = localDate(2026, 8, 13);

    expect(getCoffeeOfTheDay(sample, date).id).toBe("sea-salt");
    expect(getUpcomingQueue(sample, date).map((recipe) => recipe.id)).toEqual([
      "sea-salt",
      "cheesecake",
      "caramel",
    ]);
    expect(getUpcomingQueue([], date)).toEqual([]);
  });

  it("alternates builds within an odd-length cycle and flips after reset", () => {
    expect(defaultTemperatureForDate(13, localDate(2026, 8, 11))).toBe("Hot");
    expect(defaultTemperatureForDate(13, localDate(2026, 8, 12))).toBe("Iced");
    expect(defaultTemperatureForDate(13, localDate(2026, 8, 23))).toBe("Hot");
    expect(defaultTemperatureForDate(13, localDate(2026, 8, 24))).toBe("Iced");
    expect(defaultTemperatureForDate(13, localDate(2026, 8, 10))).toBe("Iced");
  });

  it("handles even recipe counts, normalized positions, and empty lines", () => {
    const anchor = localDate(2026, 8, 11);

    expect(defaultTemperatureForRecipePosition(12, 0, anchor)).toBe("Hot");
    expect(defaultTemperatureForRecipePosition(12, 11, localDate(2026, 8, 22))).toBe("Iced");
    expect(defaultTemperatureForDate(12, localDate(2026, 8, 23))).toBe("Iced");
    expect(defaultTemperatureForRecipePosition(13, -1, anchor)).toBe("Hot");
    expect(defaultTemperatureForDate(0, anchor)).toBe("Hot");
    expect(defaultTemperatureForDate(-1, anchor)).toBe("Hot");
  });
});
