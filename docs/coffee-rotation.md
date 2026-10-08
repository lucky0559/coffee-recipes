# Brewline coffee rotation

Status: Implemented; type-check, lint, and rotation tests pass; checked in the local dev server
Last updated: 2026-10-08
Scope: The Coffee of the Day, the recipe cards, and the upcoming queue rotate through the recipe line by date. Drinks that have both a Hot and an Iced build alternate Hot, Iced, Hot, Iced in menu order; Iced-only drinks are always Iced and do not take a turn in the alternation. Each pass through the line flips the starting build. The rotation is anchored so that the line restarts on Cheesecake, Iced, on 2026-10-08 (the first day of the second loop).

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative recipe data | src/data/recipes.ts | The library holds 17 recipes in menu order: 12 with both builds and five Iced-only (Strawberry Matcha #03, Gula Melaka #07, Guava Spark Espresso #11, Calamansi Aerocano #14, Matcha Strawberry Cloud #17), kept at least three positions apart in the menu. |
| Repository-verified queue behavior | src/lib/coffeeOfTheDay.ts | The queue filters out only recipes missing both builds, then advances one recipe per local calendar day from the 2026-09-21 anchor and wraps at the 17-recipe count. 2026-10-08 is day 17, queue index 0 (Cheesecake) of the second loop. |
| Repository-verified schedule | scheduledTemperatureForPosition / scheduledTemperatureForDate | The build for a recipe is derived from the date and the rotation order, as described below. |
| Repository-verified UI behavior | RecipePage.tsx, RecipeGrid.tsx, RecipeCard.tsx, CoffeeOfTheDay.tsx, QueueStrip.tsx, RecipeModal.tsx | The featured panel, cards, and queue previews use the scheduled build unless the user picked Hot or Iced; cards and the modal offer only builds a recipe has. |
| User requirement | 2026-10-07 and 2026-10-08 conversations | Restore the Hot/Iced schedule where both-build drinks alternate, Iced-only drinks stay Iced, and an even count of both-build drinks that started Hot starts Iced after the reset; then restart the cycle on 2026-10-08 starting on Iced Cheesecake. |

## Rotation contract

The rotation is the library in menu order, filtered with `getRotatingRecipes` to recipes with at least one Hot or Iced build. `daysSinceEpoch(date)` counts local calendar days from the anchor (2026-09-21), and `queueIndexForDate(recipeCount, date)` wraps that count to a queue position, so the Coffee of the Day changes exactly at local midnight. One pass through the line (17 days) is a "loop"; the loop number is `floor(elapsedDays / recipeCount)`.

## Scheduled build

For the recipe at a given position in the rotation:

1. A recipe with a single build always uses it. Iced-only recipes are Iced.
2. A recipe with both builds takes the next turn in the alternation. Its turn is the number of both-build recipes before it in the rotation (the first one has turn 0).
3. The build is Hot when `loopNumber + turn` is even and Iced when it is odd.

Because the loop number is added, each pass through the line flips the starting build:

- With an **even** number of both-build recipes, a loop that starts Hot ends Iced, and the next loop starts Iced.
- With an **odd** number, the alternation simply continues across the reset (the loop ends Hot and the next starts Iced).

Example (six drinks; drinks 3 and 5 are Iced-only):

| Drink | 1 | 2 | 3 (Iced-only) | 4 | 5 (Iced-only) | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| First loop | Hot | Iced | Iced | Hot | Iced | Iced |
| After the reset | Iced | Hot | Iced | Iced | Iced | Hot |

The current menu has 12 both-build drinks, so the builds in menu order (#01–#17) are:

| Loop | Pattern |
| --- | --- |
| First (starts 2026-09-21) | `H I I H I H I I H I I H I I H I I` |
| Second, after the reset (starts 2026-10-08) | `I H I I H I I H I H I I H I I H I` |
| Third (starts 2026-10-25) | `H I I H I H I I H I I H I I H I I` |

Iced-only drinks (#03, #07, #11, #14, #17) are Iced in every loop. The first loop ends on Iced and the second begins on Iced, as requested.

| Local date | Coffee of the Day | Build |
| --- | --- | --- |
| 2026-10-06 | Matcha Caramel | Iced |
| 2026-10-07 | Matcha Strawberry Cloud | Iced (Iced-only) |
| 2026-10-08 | Cheesecake | Iced (first of the new loop) |
| 2026-10-09 | Caramel | Hot |
| 2026-10-10 | Strawberry Matcha | Iced (Iced-only) |
| 2026-10-11 | Sea Salt | Iced |
| 2026-10-12 | Caramelized Patis | Hot |

Dates before the anchor remain deterministic because the helpers use floor-based division and normalize negative remainders. An empty line has queue index 0 and the schedule falls back to Hot.

## State transitions and side effects

- On initial render, the featured recipe and each card use the scheduled build for the current local date and their position, or the user's stored Hot/Iced preference.
- Clicking Hot or Iced on the featured panel or a card changes only that view; it does not change the schedule.
- When the local date changes, the app recomputes the recipe, queue, position, and scheduled build without a reload.
- The home-page build control reads Schedule / Hot / Iced. Schedule uses each recipe's scheduled build; Hot or Iced forces that build where a recipe has it. The choice is stored on the device.
- Opening a recipe carries that card's current build into the modal; queue selections use the scheduled build for that recipe's day.
- Recipes with one build use that build only. There is no API, persistence of the schedule, mutation, locking, or rollback; it is deterministic from the anchor, local date, and the recipe line.

## History

- 2026-09-11 to 2026-10-05: the schedule alternated by position in the whole line (Iced-only drinks included), flipping each loop.
- 2026-10-06: Iced-only drinks were spaced apart in the menu; the schedule was briefly removed and the anchor moved so 2026-10-06 is Biscoff.
- 2026-10-07: schedule restored, now counting only the both-build drinks in the alternation.
- 2026-10-08: Matcha Strawberry Cloud (#16, Iced-only) added, making the line 16 recipes; the anchor moved from 2026-09-23 to 2026-09-22 so the line restarts today on Iced Cheesecake (day 16, the first day of the second loop). Earlier dates now map to different drinks than they did before this change.
- 2026-10-08: Strawberry Matcha (Iced-only) inserted at #03, renumbering #03–#16 to #04–#17 so the five Iced-only drinks stay at least three apart; the line is now 17 recipes, so the anchor moved again to 2026-09-21 to keep today on Iced Cheesecake (day 17, the first day of the second loop). The Matcha Strawberry Cloud moved from #16 to #17.

## Acceptance criteria

- [x] Both-build drinks alternate Hot, Iced in menu order; Iced-only drinks are always Iced and do not take a turn.
- [x] Each pass through the line flips the starting build, so an even count of both-build drinks that began Hot begins Iced after the reset.
- [x] An odd count continues the alternation across the reset.
- [x] The featured panel, cards, and queue previews use the schedule for their date; the Schedule / Hot / Iced control can override it.
- [x] 2026-10-08 restarts the line on Cheesecake, Iced, and 2026-10-09 is Caramel, Hot.
- [x] The app updates at local midnight while open.

## Verification evidence

- Focused rotation tests — PASS: 13 tests, including the six-drink sample, the even-count reset, the odd-count continuation, the real 17-recipe menu's two loop patterns, and the 2026-10-08 restart on Iced Cheesecake.
- TypeScript (`tsc -b`) and Oxlint — PASS: no errors or warnings.
- Local dev server — PASS: on 2026-10-08 `/recipe` shows Cheesecake (Iced, "#1 of 17 in the line") as the Coffee of the Day, a queue of Caramel Hot, Strawberry Matcha Iced, Sea Salt Iced, Caramelized Patis Hot, Matcha Iced, grid builds `I H I I H I I H I H I I H I I H I`, and a Schedule / Hot / Iced control, with no console errors.
- Full Vitest — PARTIAL: 8 recipe-data tests fail for reasons unrelated to the rotation (for example Matcha Spiced syrup, the 10 ml cold-foam milk rule, and the Gula Melaka "Espresso/Ristretto" name).

## Remaining work

None for the rotation. The broader app intentionally excludes guided brewing steps, timers, scaling, and equipment guidance.
