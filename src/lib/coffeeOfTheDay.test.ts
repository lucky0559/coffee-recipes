import { describe, expect, it } from "vitest";

import {
  daysSinceEpoch,
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
    expect(daysSinceEpoch(localDate(2026, 8, 22, 0))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 8, 22, 23))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 8, 26))).toBe(4);
    expect(daysSinceEpoch(localDate(2026, 8, 21))).toBe(-1);
  });

  it("normalizes queue positions across the end and beginning of the line", () => {
    const anchor = localDate(2026, 8, 22);

    expect(queueIndexForDate(13, anchor)).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 9, 4))).toBe(12);
    expect(queueIndexForDate(13, localDate(2026, 9, 5))).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 8, 21))).toBe(12);
    expect(queueIndexForDate(0, anchor)).toBe(0);
    expect(queueIndexForDate(-1, anchor)).toBe(0);
  });

  it("restarts the line on Cheesecake on 2026-10-08", () => {
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 7)).id).toBe("matcha-strawberry-cloud");
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 8)).id).toBe("cheesecake");
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 9)).id).toBe("caramel");
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 5)).id).toBe("biscoff");
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

    expect(rotatingRecipes).toHaveLength(16);
    expect(rotatingRecipes.map(({ id }) => id)).toContain("gula-melaka");
    expect(rotatingRecipes.map(({ id }) => id)).not.toContain("unavailable");
    expect(getUpcomingQueue(recipes, localDate(2026, 8, 22)).map(({ id }) => id)).toContain(
      "gula-melaka",
    );
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 8, 27)).id).toBe("gula-melaka");
  });

  it("keeps Iced-only recipes apart in the library order that the rotation follows", () => {
    const rotation = getRotatingRecipes(recipes);
    const icedOnlyPositions = rotation
      .map((recipe, index) => (recipe.hot === undefined ? index : -1))
      .filter((index) => index >= 0);

    expect(rotation.map(({ id }) => id)).toEqual(recipes.map(({ id }) => id));
    expect(icedOnlyPositions).toHaveLength(4);
    icedOnlyPositions.forEach((position, i) => {
      const next = icedOnlyPositions[(i + 1) % icedOnlyPositions.length];
      const gap = (next - position + rotation.length) % rotation.length;
      expect(gap).toBeGreaterThanOrEqual(3);
    });
  });

  describe("scheduled Hot/Iced build", () => {
    const build = { ingredients: [], allergens: [], substitutions: [] };
    const both = (id: string): Recipe => ({
      id,
      number: "00",
      name: id,
      category: "Sweet",
      description: "",
      hot: build,
      iced: build,
    });
    const icedOnly = (id: string): Recipe => ({ ...both(id), hot: undefined });
    // Day 0 of cycle `cycle` for a line of `count` drinks (epoch is 2026-09-22).
    const cycleDay = (cycle: number, count: number, offset: number) =>
      localDate(2026, 8, 22 + cycle * count + offset);
    const pattern = (rotation: Recipe[], cycle: number) =>
      rotation
        .map((recipe, i) =>
          getAvailableTemperature(
            recipe,
            scheduledTemperatureForPosition(rotation, i, cycleDay(cycle, rotation.length, i)),
          )[0],
        )
        .join("");

    it("alternates only the both-build drinks and keeps Iced-only drinks Iced", () => {
      const line = [
        both("1"),
        both("2"),
        icedOnly("3"),
        both("4"),
        icedOnly("5"),
        both("6"),
      ];

      // Hot, Iced, Iced-only, Hot, Iced-only, Iced
      expect(pattern(line, 0)).toBe("HIIHII");
    });

    it("starts the next pass Iced when an even count of both-build drinks started Hot", () => {
      const line = [both("1"), both("2"), icedOnly("3"), both("4"), icedOnly("5"), both("6")];

      expect(pattern(line, 0)).toBe("HIIHII");
      expect(pattern(line, 1)).toBe("IHIIIH");
      expect(pattern(line, 2)).toBe("HIIHII");
    });

    it("continues the alternation across the reset for an odd count of both-build drinks", () => {
      const line = [both("1"), both("2"), icedOnly("3"), both("4")];

      expect(pattern(line, 0)).toBe("HIIH");
      expect(pattern(line, 1)).toBe("IHII");
    });

    it("schedules the real menu around its Iced-only drinks", () => {
      const rotation = getRotatingRecipes(recipes);

      // Gula Melaka #06, Guava Spark Espresso #10, Calamansi Aerocano #13 and
      // Matcha Strawberry Cloud #16 are Iced-only.
      expect(pattern(rotation, 0)).toBe("HIHIHIIHIIHIIHII");
      expect(pattern(rotation, 1)).toBe("IHIHIIHIHIIHIIHI");
    });

    it("uses the schedule for a date's recipe and falls back to Hot for an empty line", () => {
      const rotation = getRotatingRecipes(recipes);

      // 2026-10-06 is queue index 14, the last both-build drink, on its first pass.
      expect(scheduledTemperatureForDate(rotation, localDate(2026, 9, 6))).toBe("Iced");
      expect(scheduledTemperatureForDate([], localDate(2026, 9, 6))).toBe("Hot");
      expect(scheduledTemperatureForPosition([], 0, localDate(2026, 9, 6))).toBe("Hot");
    });
  });

  it("serves the Iced-only Matcha Strawberry Cloud as the new last recipe in the line", () => {
    const rotation = getRotatingRecipes(recipes);
    const last = rotation[rotation.length - 1];

    // 2026-10-07 is day 15 since the anchor, so queue index 15 of the 16-recipe line.
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 7)).id).toBe("matcha-strawberry-cloud");
    expect(last.id).toBe("matcha-strawberry-cloud");
    expect(scheduledTemperatureForDate(rotation, localDate(2026, 9, 7))).toBe("Iced");
    // 2026-10-08 wraps to Cheesecake, the first both-build drink of the second loop, which starts Iced.
    expect(getCoffeeOfTheDay(recipes, localDate(2026, 9, 8)).id).toBe("cheesecake");
    expect(scheduledTemperatureForDate(rotation, localDate(2026, 9, 8))).toBe("Iced");
    expect(scheduledTemperatureForDate(rotation, localDate(2026, 9, 9))).toBe("Hot");
  });

  it("falls back to an available build for partial recipes", () => {
    const gulaMelaka = recipes.find((recipe) => recipe.id === "gula-melaka");

    expect(gulaMelaka).toBeDefined();
    expect(getAvailableTemperature(gulaMelaka!, "Hot")).toBe("Iced");
    expect(getAvailableTemperature(gulaMelaka!, "Iced")).toBe("Iced");
  });

  it("returns today's recipe and the wrapped serving queue", () => {
    const sample = recipes.slice(0, 3);
    const date = localDate(2026, 8, 24);

    expect(getCoffeeOfTheDay(sample, date).id).toBe("sea-salt");
    expect(getUpcomingQueue(sample, date).map((recipe) => recipe.id)).toEqual([
      "sea-salt",
      "cheesecake",
      "caramel",
    ]);
    expect(getUpcomingQueue([], date)).toEqual([]);
  });
});
