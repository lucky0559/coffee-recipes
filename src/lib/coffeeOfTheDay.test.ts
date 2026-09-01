import { describe, expect, it } from "vitest";

import {
  daysSinceEpoch,
  defaultTemperatureForDate,
  defaultTemperatureForRecipePosition,
  getCoffeeOfTheDay,
  getUpcomingQueue,
  queueIndexForDate,
} from "./coffeeOfTheDay";
import { recipes } from "../data/recipes";

function localDate(year: number, month: number, day: number, hour = 12): Date {
  return new Date(year, month, day, hour);
}

describe("coffee of the day rotation", () => {
  it("counts local calendar days from the rotation anchor", () => {
    expect(daysSinceEpoch(localDate(2026, 7, 16, 0))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 7, 16, 23))).toBe(0);
    expect(daysSinceEpoch(localDate(2026, 7, 20))).toBe(4);
    expect(daysSinceEpoch(localDate(2026, 7, 15))).toBe(-1);
  });

  it("normalizes queue positions across the end and beginning of the line", () => {
    const anchor = localDate(2026, 7, 16);

    expect(queueIndexForDate(13, anchor)).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 7, 28))).toBe(12);
    expect(queueIndexForDate(13, localDate(2026, 7, 29))).toBe(0);
    expect(queueIndexForDate(13, localDate(2026, 7, 15))).toBe(12);
    expect(queueIndexForDate(0, anchor)).toBe(0);
    expect(queueIndexForDate(-1, anchor)).toBe(0);
  });

  it("returns today's recipe and the wrapped serving queue", () => {
    const sample = recipes.slice(0, 3);
    const date = localDate(2026, 7, 18);

    expect(getCoffeeOfTheDay(sample, date).id).toBe("sea-salt");
    expect(getUpcomingQueue(sample, date).map((recipe) => recipe.id)).toEqual([
      "sea-salt",
      "cheesecake",
      "caramel",
    ]);
    expect(getUpcomingQueue([], date)).toEqual([]);
  });

  it("alternates builds within a 13-recipe cycle and flips after reset", () => {
    expect(defaultTemperatureForDate(13, localDate(2026, 7, 16))).toBe("Hot");
    expect(defaultTemperatureForDate(13, localDate(2026, 7, 17))).toBe("Iced");
    expect(defaultTemperatureForDate(13, localDate(2026, 7, 28))).toBe("Hot");
    expect(defaultTemperatureForDate(13, localDate(2026, 7, 29))).toBe("Iced");
    expect(defaultTemperatureForDate(13, localDate(2026, 7, 15))).toBe("Iced");
  });

  it("handles even recipe counts, normalized positions, and empty lines", () => {
    const anchor = localDate(2026, 7, 16);

    expect(defaultTemperatureForRecipePosition(12, 0, anchor)).toBe("Hot");
    expect(defaultTemperatureForRecipePosition(12, 11, localDate(2026, 7, 27))).toBe("Iced");
    expect(defaultTemperatureForDate(12, localDate(2026, 7, 28))).toBe("Iced");
    expect(defaultTemperatureForRecipePosition(13, -1, anchor)).toBe("Hot");
    expect(defaultTemperatureForDate(0, anchor)).toBe("Hot");
    expect(defaultTemperatureForDate(-1, anchor)).toBe("Hot");
  });
});
