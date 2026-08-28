# Brewline coffee rotation defaults

Status: Implemented; code verification passed; browser unavailable
Last updated: 2026-08-28
Scope: Make the Coffee of the Day and recipe-list default builds alternate Hot/Iced through the recipe line and carry the correct build into the next rotation reset.

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative recipe data | src/data/recipes.ts | The current line contains 13 recipes in a fixed order. |
| Repository-verified queue behavior | src/lib/coffeeOfTheDay.ts | The recipe index advances by local calendar date from the anchored epoch and wraps at the recipe count. |
| Repository-verified UI behavior | src/App.tsx, RecipeGrid.tsx, RecipeCard.tsx, CoffeeOfTheDay.tsx, QueueStrip.tsx, RecipeModal.tsx | The featured panel, recipe lists, and full-recipe modal are stateful Hot/Iced surfaces. |
| User requirement | The requested Hot → Iced → Hot pattern and reset behavior | The first cycle starts Hot; each recipe alternates; each new cycle flips its starting build. |
| Explicit even-count interpretation | User specifically requested Iced on reset when an even-length line ends Iced | For an even count whose first cycle ends Iced, the next cycle starts Iced, producing a repeated Iced boundary as requested. |
| Task-board state | No task board or issue reference exists in the repository | No stale board state was available to override the implementation. |

## Roadmap and ownership

| Task | Surface / owner | Status | Acceptance evidence |
| --- | --- | --- | --- |
| Inspect the queue and featured build state | src/lib/coffeeOfTheDay.ts, src/App.tsx, src/components/ / implementation | Complete | Existing date-based queue and all Hot/Iced consumers were identified. |
| Add a date-based default build function | defaultTemperatureForDate / implementation | Complete | The helper returns Hot/Iced for the cycle index plus the position within that cycle. |
| Apply defaults to the featured recipe | App.tsx, CoffeeOfTheDay.tsx / implementation | Complete | The featured recipe initializes and resets to its scheduled build; manual changes remain available for the current day. |
| Apply defaults to the recipe list | RecipeGrid.tsx, RecipeCard.tsx / implementation | Complete | Cards use their position in the current rotation phase and reset with the line. |
| Apply defaults to the upcoming queue | QueueStrip.tsx / implementation | Complete | Preview images and queue selections use the scheduled build for each future day, including a reset boundary. |
| Preserve the featured build in the full recipe | RecipeModal.tsx / implementation | Complete | “View full recipe” opens with the currently selected featured build. |
| Refresh at local midnight | useCurrentDate in App.tsx / implementation | Complete | The date, recipe, queue, position, and scheduled build are recalculated after the next local midnight without requiring a reload. |
| Verify and publish the implementation record | lint, build, focused checks, these docs / implementation | Complete with browser limitation | Direct boundary checks, lint, and build pass; browser discovery reported no available browser and that limitation is recorded below. |

## Rotation contract

The recipe queue still uses daysSinceEpoch(date) and queueIndexForDate(recipeCount, date) for recipe identity. The default build is calculated independently by defaultTemperatureForDate(recipeCount, date):

1. Calculate the zero-based rotation index with floor(elapsedDays / recipeCount).
2. Calculate the zero-based position inside that rotation.
3. Alternate the build using rotationIndex + positionInRotation.
4. Even values are Hot; odd values are Iced.

This starts the anchored rotation Hot and flips the next rotation’s starting build. With the current 13 recipes, the first line is Hot → Iced → Hot → … → Hot, and the next line starts Iced. With an even count whose first line ends Iced, the next line also starts Iced, matching the requested reset rule.

| Recipe count | First item | Last item in first rotation | First item after reset |
| ---: | --- | --- | --- |
| 13 | Hot | Hot | Iced |
| 12 | Hot | Iced | Iced |

The helper returns Hot for an empty or non-positive count as a safe UI fallback. Dates before the anchor use floor-based division and continue to produce a stable cycle rather than relying on JavaScript’s negative remainder behavior.

## State transitions and side effects

- On initial render, the featured temperature and each recipe-card temperature are scheduled defaults for the current local date and rotation phase.
- Clicking Hot or Iced changes only the current featured view; it does not change the date-based schedule.
- Clicking Hot or Iced on a recipe card changes only that card’s current view; it does not change the date-based schedule.
- When the local date changes, the app recomputes the recipe, queue, position, and scheduled default. The featured temperature resets to that new default.
- Opening a recipe carries that card’s current temperature into the modal. Queue selections use the scheduled temperature for that recipe’s position; the modal can still be changed independently.
- There is no persistence, reset API, mutation, transaction, locking, idempotency key, batch operation, or rollback state. The schedule is deterministic from the anchored epoch, local calendar date, and current recipe count.

## API surface and dependencies

This feature has no API endpoints. Authentication, authorization, path/query parameters, request bodies, response shapes, validation errors, persistence/schema changes, and backend dependencies are not applicable. There are no lifecycle, custody, audit, concurrency, or partial-failure concerns beyond the local React state described above.

Runtime dependencies are the existing React app, the Temperature union in src/types.ts, and the fixed recipe array in src/data/recipes.ts. No package or database dependency was added.

## Acceptance criteria

- [x] The first recipe rotation defaults Hot.
- [x] Consecutive recipes alternate Hot, Iced, Hot through the line.
- [x] The recipe list cards use the same alternating defaults for their positions in the line.
- [x] Upcoming queue previews and queue selections use the scheduled build for each future day.
- [x] With the current odd count of 13, the first recipe after the reset defaults Iced.
- [x] With an even count whose first rotation ends Iced, the first recipe after reset defaults Iced.
- [x] A user can still override the featured default with the Hot/Iced controls.
- [x] The full-recipe modal preserves the featured recipe’s current build when opened from “View full recipe.”
- [x] The app updates the schedule at local midnight while remaining open.
- [x] Empty/non-positive recipe counts have a safe Hot fallback in the helper.

## Verification evidence

- Focused rotation boundary check — PASS: compiled coffeeOfTheDay.ts and asserted the 13-recipe sequence, list-position defaults, 13-item reset, 12-item last-Iced reset, later even-cycle phase, and empty-count fallback.
- npm run lint — PASS: Oxlint reported no findings after the implementation.
- npm run build — PASS: TypeScript project build and Vite production build completed successfully.
- Browser QA — Not available in this environment: browser discovery returned “No browser is available” after the local Vite server was started. Desktop/mobile interaction and console checks could not be executed.
- Full test suite — Not available: package.json contains no test script or test runner.
- Known unrelated failures or environment warnings — None observed in the checks above.

## Remaining work

No code work remains. Browser QA is the only unexecuted verification item if a browser becomes available.
