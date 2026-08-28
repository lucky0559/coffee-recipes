import type { Recipe, Temperature } from "../types";

// Anchored so the rotation lands on Matcha on 2026-08-20, per house request.
const ROTATION_EPOCH_UTC = Date.UTC(2026, 7, 16);
const MS_PER_DAY = 86_400_000;

/**
 * Days elapsed since the rotation epoch, counted by local calendar date
 * (not by 24h windows) so the coffee of the day changes exactly at local
 * midnight regardless of time zone or time-of-day the app is opened.
 */
export function daysSinceEpoch(date: Date): number {
  const localMidnightUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((localMidnightUTC - ROTATION_EPOCH_UTC) / MS_PER_DAY);
}

/**
 * The queue index for a given date. Recipes are served in a fixed order
 * and advance one position per day, wrapping back to the start once the
 * whole line has been served — like a rotating queue, not a random draw.
 */
export function queueIndexForDate(recipeCount: number, date: Date): number {
  if (recipeCount <= 0) return 0;
  const offset = daysSinceEpoch(date) % recipeCount;
  return offset < 0 ? offset + recipeCount : offset;
}

/**
 * The default build alternates within each recipe rotation. The first
 * rotation starts Hot; each new rotation flips its starting build so a
 * reset can begin Iced when the current rotation ends on Iced (including
 * the current 13-recipe rotation).
 */
export function defaultTemperatureForRecipePosition(
  recipeCount: number,
  positionInRotation: number,
  date: Date,
): Temperature {
  if (recipeCount <= 0) return "Hot";

  const elapsedDays = daysSinceEpoch(date);
  const rotationIndex = Math.floor(elapsedDays / recipeCount);
  const normalizedPosition = ((positionInRotation % recipeCount) + recipeCount) % recipeCount;
  const alternatingPosition = rotationIndex + normalizedPosition;

  return alternatingPosition % 2 === 0 ? "Hot" : "Iced";
}

export function defaultTemperatureForDate(
  recipeCount: number,
  date: Date,
): Temperature {
  if (recipeCount <= 0) return "Hot";

  return defaultTemperatureForRecipePosition(
    recipeCount,
    queueIndexForDate(recipeCount, date),
    date,
  );
}

export function getCoffeeOfTheDay(recipes: Recipe[], date: Date = new Date()): Recipe {
  return recipes[queueIndexForDate(recipes.length, date)];
}

/** Returns the full serving order starting from today, for showing "what's next in line". */
export function getUpcomingQueue(recipes: Recipe[], date: Date = new Date()): Recipe[] {
  const startIndex = queueIndexForDate(recipes.length, date);
  return recipes.map((_, i) => recipes[(startIndex + i) % recipes.length]);
}
