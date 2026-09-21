# Brewline coffee rotation defaults

Status: Implemented; code verification passed; browser QA not rerun for this partial-build UI change
Last updated: 2026-09-21
Scope: Make the Coffee of the Day and recipe-list default builds alternate Hot/Iced through the available-build recipe line, include recipes with either build, start today on Matcha, and carry the correct available build into the next rotation reset.

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative recipe data | src/data/recipes.ts | The library contains 13 recipes in a fixed order; the Iced-only Gula Melaka entry participates in the daily line. |
| Repository-verified queue behavior | src/lib/coffeeOfTheDay.ts | The queue filters out only recipes missing both builds, then advances by local calendar date from the 2026-09-11 anchor and wraps at the 13-recipe available-build count; 2026-09-15 resolves to Matcha. |
| Repository-verified UI behavior | src/App.tsx, RecipeGrid.tsx, RecipeCard.tsx, CoffeeOfTheDay.tsx, QueueStrip.tsx, RecipeModal.tsx | The featured panel and queue use recipes with at least one build; scheduled temperatures fall back to the available build, while cards and the full-recipe modal expose only builds present on each recipe. |
| User requirement | Start today on Matcha while preserving the Hot → Iced → Hot pattern and reset behavior | 2026-09-15 resolves to Matcha; the first cycle starts Hot by build, each recipe alternates, and each new cycle flips its starting build. |
| Explicit even-count interpretation | User specifically requested Iced on reset when an even-length line ends Iced | For an even count whose first cycle ends Iced, the next cycle starts Iced, producing a repeated Iced boundary as requested. |
| Task-board state | No task board or issue reference exists in the repository | No stale board state was available to override the implementation. |

## Roadmap and ownership

| Task | Surface / owner | Status | Acceptance evidence |
| --- | --- | --- | --- |
| Inspect the queue and featured build state | src/lib/coffeeOfTheDay.ts, src/App.tsx, src/components/ / implementation | Complete | Existing date-based queue, partial-build behavior, and all Hot/Iced consumers were identified. |
| Include recipes with an available build in the daily line | getRotatingRecipes / implementation | Complete | Recipes with Hot or Iced builds enter the featured item, queue, and rotation count; recipes with neither build remain excluded. |
| Add a date-based default build function | defaultTemperatureForDate / implementation | Complete | The helper returns Hot/Iced for the cycle index plus the position within that cycle. |
| Apply defaults to the featured recipe | App.tsx, CoffeeOfTheDay.tsx / implementation | Complete | The featured recipe initializes and resets to its scheduled build; manual changes remain available for the current day. |
| Apply defaults to the recipe list | RecipeGrid.tsx, RecipeCard.tsx / implementation | Complete | Cards use their position in the current rotation phase and reset with the line. |
| Apply defaults to the upcoming queue | QueueStrip.tsx / implementation | Complete | Preview images and queue selections use the scheduled build for each future day, including a reset boundary. |
| Preserve the featured build in the full recipe | RecipeModal.tsx / implementation | Complete | “View full recipe” opens with the currently selected featured build. |
| Refresh at local midnight | useCurrentDate in App.tsx / implementation | Complete | The date, recipe, queue, position, and scheduled build are recalculated after the next local midnight without requiring a reload. |
| Verify and publish the implementation record | lint, build, focused checks, these docs / implementation | Complete | Focused rotation tests, Oxlint, TypeScript, Vite production build, and service-worker asset generation pass; browser QA was not rerun for this partial-build UI change. |

## Rotation contract

The recipe queue first filters the library with getRotatingRecipes, so recipes with either Hot or Iced builds affect queue identity while recipes with neither build do not. It then uses daysSinceEpoch(date) and queueIndexForDate(recipeCount, date). The default build is calculated independently by defaultTemperatureForDate(recipeCount, date):

1. Calculate the zero-based rotation index with floor(elapsedDays / recipeCount).
2. Calculate the zero-based position inside that rotation.
3. Alternate the build using rotationIndex + positionInRotation.
4. Even values are Hot; odd values are Iced.

The current anchor is 2026-09-11, so 2026-09-15 lands on queue index 4, Matcha. The anchored available-build rotation starts Hot by schedule and flips the next rotation’s starting build. With the current 13 recipes, the first line is Hot → Iced → Hot → … → Hot, and the next line starts Iced, matching the requested reset rule. Gula Melaka participates in the queue as an Iced-only recipe; its scheduled Hot slot resolves to Iced.

| Recipe count | First item | Last item in first rotation | First item after reset |
| ---: | --- | --- | --- |
| 12 | Hot | Iced | Iced |
| 13 | Hot | Hot | Iced |

The helper returns Hot for an empty or non-positive count as a safe UI fallback. Dates before the anchor use floor-based division and continue to produce a stable cycle rather than relying on JavaScript’s negative remainder behavior.

## State transitions and side effects

- On initial render, the featured temperature and each recipe-card temperature are scheduled defaults for the current local date and rotation phase.
- Clicking Hot or Iced changes only the current featured view; it does not change the date-based schedule.
- Clicking Hot or Iced on a recipe card changes only that card’s current view; it does not change the date-based schedule.
- When the local date changes, the app recomputes the recipe, queue, position, and scheduled default. The featured temperature resets to that new default.
- Opening a recipe carries that card’s current temperature into the modal. Queue selections use the scheduled temperature for that recipe’s position; the modal can still be changed independently.
- Recipes with one missing build remain discoverable and in the daily line; their featured panel, cards, queue previews, and modals use the available build only. Recipes missing both builds remain excluded.
- There is no persistence, reset API, mutation, transaction, locking, idempotency key, batch operation, or rollback state. The schedule is deterministic from the anchored epoch, local calendar date, and current recipe count.

## API surface and dependencies

This feature has no API endpoints. Authentication, authorization, path/query parameters, request bodies, response shapes, validation errors, persistence/schema changes, and backend dependencies are not applicable. There are no lifecycle, custody, audit, concurrency, or partial-failure concerns beyond the local React state described above.

Runtime dependencies are the existing React app, the Temperature union in src/types.ts, and the fixed recipe array in src/data/recipes.ts. No package or database dependency was added.

## Acceptance criteria

- [x] The first recipe rotation defaults Hot.
- [x] On 2026-09-15, the Coffee of the Day starts on Matcha.
- [x] The 13 available-build recipes alternate Hot, Iced, Hot through the line.
- [x] The recipe list cards use the same alternating defaults for their positions in the line.
- [x] Upcoming queue previews and queue selections use the scheduled build for each future day.
- [x] Gula Melaka is included in the daily line because it has an Iced build; its scheduled Hot slot falls back to Iced.
- [x] With the current available-build count of 13, the first recipe after the reset defaults Iced.
- [x] With an even count whose first rotation ends Iced, the first recipe after reset defaults Iced.
- [x] A user can still override the featured default with the Hot/Iced controls.
- [x] The full-recipe modal preserves the featured recipe’s current build when opened from “View full recipe.”
- [x] The app updates the schedule at local midnight while remaining open.
- [x] Empty/non-positive recipe counts have a safe Hot fallback in the helper.

## Verification evidence

- Focused rotation check — PASS: asserted the 2026-09-15 Matcha start, 13-recipe available-build sequence, one-build inclusion, no-build exclusion, available-temperature fallback, list-position defaults, even-cycle reset, later phase, and empty-count fallback.
- Oxlint — PASS: direct lint invocation reported 0 warnings and 0 errors.
- TypeScript and Vite — PASS: project type-check and production build completed successfully; service-worker cache version generation also passed.
- Browser QA — Not run for this partial-build UI change; code-path verification passed.
- Full test suite — PARTIAL: Vitest ran 5 files with 28 tests; 24 passed and 4 failed on pre-existing recipe-data expectations, outside this recipe-line change.
- Known unrelated failures or environment warnings — `src/data/recipes.test.ts` has four existing expectation failures for temperature-specific recommendation metadata, Matcha Spiced syrup amount, Hot Salted Caramel syrup amount, and the Dirty Matcha mixture shape; these failures are unchanged by the present task.

## Remaining work

No code work remains for this rotation feature. The broader app intentionally excludes guided brewing steps, timers, scaling, and equipment guidance.
