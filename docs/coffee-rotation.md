# Brewline coffee rotation

Status: Implemented; type-check, lint, and rotation tests pass; checked in the local dev server
Last updated: 2026-10-06
Scope: The Coffee of the Day and the upcoming queue rotate through the recipe line by date, starting today (2026-10-06) on Biscoff. There is no scheduled Hot/Iced rotation: every card, the featured drink, and the queue open on the drink's own default build, and the user switches Hot/Iced by hand.

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative recipe data | src/data/recipes.ts | The library holds 15 recipes in menu order. The Iced-only drinks (Gula Melaka #06, Guava Spark Espresso #10, Calamansi Aerocano #13) are kept apart so they do not sit together in the menu or the daily line. |
| Repository-verified queue behavior | src/lib/coffeeOfTheDay.ts | The queue filters out only recipes missing both builds, then advances one recipe per local calendar day from the 2026-09-23 anchor and wraps at the 15-recipe count. 2026-10-06 is queue index 13, Biscoff. |
| Repository-verified default build | getDefaultTemperature in src/lib/coffeeOfTheDay.ts | A recipe's default build is its first recommended build that exists, otherwise Hot, otherwise Iced for Iced-only recipes. It does not depend on the date. |
| Repository-verified UI behavior | RecipePage.tsx, RecipeGrid.tsx, RecipeCard.tsx, CoffeeOfTheDay.tsx, QueueStrip.tsx, RecipeModal.tsx | The featured panel, cards, queue previews and modal open on each recipe's default build unless the user picked Hot or Iced; only builds a recipe has are offered. |
| User requirement | 2026-10-06 conversation | Remove the scheduled Hot/Iced default, keep the daily recipe rotation, and make today Biscoff. |

## Rotation contract

The rotation is the library in menu order, filtered with `getRotatingRecipes` to recipes that have at least one Hot or Iced build. `daysSinceEpoch(date)` counts local calendar days from the anchor (2026-09-23), and `queueIndexForDate(recipeCount, date)` wraps that count to a queue position, so the Coffee of the Day changes exactly at local midnight.

| Local date | Coffee of the Day (queue index) |
| --- | --- |
| 2026-09-23 | Cheesecake (0) |
| 2026-09-28 | Gula Melaka (5) |
| 2026-10-06 | Biscoff (13) |
| 2026-10-07 | Matcha Caramel (14) |
| 2026-10-08 | Cheesecake (0), then the line repeats |

Dates before the anchor stay deterministic because the helper uses floor-based division and normalizes negative remainders. An empty line has queue index 0.

## Default build

`getDefaultTemperature(recipe)` picks the build a recipe opens on:

1. its first `recommended` temperature that has a build, otherwise
2. Hot when the recipe has a Hot build, otherwise
3. Iced.

Today that makes Gula Melaka, Guava Spark Espresso, Calamansi Aerocano, Salted Caramel, Biscoff and Matcha Caramel default Iced, and the rest default Hot.

The home-page build control reads Default / Hot / Iced. Default uses each recipe's own build; Hot or Iced forces that build across the collection where a recipe has it, and the choice is stored on the device. Recipes with a single build always use that build.

## Iced-only spacing

Gula Melaka, Guava Spark Espresso, and Calamansi Aerocano have no Hot build. Listed together they filled the end of the menu and the end of the daily line with Iced-only drinks. `src/data/recipes.ts` now keeps them apart (#06, #10, #13; recipes reordered and renumbered), and a test fails if they end up adjacent again.

## History

- 2026-09-11 to 2026-10-05: Coffee of the Day and the recipe list alternated Hot and Iced by date, flipping each cycle, with Matcha on 2026-09-15. That schedule was removed on 2026-10-06 because Iced-only drinks forced runs of Iced or Hot days; an interim version that anchored the pattern on the Iced-only drinks was also dropped.
- 2026-10-06: menu reordered so Iced-only drinks are spaced apart; anchor moved so today is Biscoff.

## State transitions and side effects

- On initial render, the featured drink and each card open on their default build, or on the user's stored Hot/Iced preference.
- Clicking Hot or Iced on the featured panel or a card changes only that view.
- When the local date changes, the app recomputes the featured recipe, queue and position without a reload.
- Opening a recipe carries that card's current build into the modal; queue selections use the recipe's default build, or the stored preference.
- There is no API, persistence of the rotation, mutation, locking or rollback. The rotation is deterministic from the anchor, local calendar date and current recipe line.

## Acceptance criteria

- [x] 2026-10-06 resolves to Biscoff, 2026-10-07 to Matcha Caramel, and 2026-10-08 wraps to Cheesecake.
- [x] Recipes with either build join the rotation; recipes with neither are excluded.
- [x] Each recipe's default build is its recommended build, else Hot, else Iced for Iced-only recipes, regardless of the date.
- [x] Cards, the featured panel and the queue use that default unless the user picked Hot or Iced.
- [x] The Iced-only recipes are at least three positions apart in the library order.
- [x] The app updates at local midnight while open.

## Verification evidence

- Focused rotation tests — PASS: 8 tests covering the anchor, queue wrapping, Biscoff today, one-build inclusion, Iced-only spacing, default build selection, available-build fallback, and the wrapped serving queue.
- TypeScript (`tsc -b`) and Oxlint — PASS: no errors or warnings.
- Local dev server — PASS: `/recipe` shows Biscoff as today's coffee, a queue of Matcha Caramel, Cheesecake, Caramel, Sea Salt, Caramelized Patis, and a Default/Hot/Iced control.
- Full Vitest — PARTIAL: 22 passed and 9 failed on recipe-data and filter expectations (for example Matcha Spiced syrup, the 10 ml cold-foam milk rule, the Gula Melaka "Espresso/Ristretto" name, and the drink-type split) that are unrelated to the rotation.

## Remaining work

No rotation work remains. The broader app intentionally excludes guided brewing steps, timers, scaling, and equipment guidance.
