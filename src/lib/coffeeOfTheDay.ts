import type { Recipe } from "../types";

// Anchored so the rotation lands on Sea Salt on 2026-08-18, per house request.
const ROTATION_EPOCH_UTC = Date.UTC(2024, 0, 2);
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

export function getCoffeeOfTheDay(recipes: Recipe[], date: Date = new Date()): Recipe {
  return recipes[queueIndexForDate(recipes.length, date)];
}

/** Returns the full serving order starting from today, for showing "what's next in line". */
export function getUpcomingQueue(recipes: Recipe[], date: Date = new Date()): Recipe[] {
  const startIndex = queueIndexForDate(recipes.length, date);
  return recipes.map((_, i) => recipes[(startIndex + i) % recipes.length]);
}
