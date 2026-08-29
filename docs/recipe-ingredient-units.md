# Brewline recipe ingredient units

Status: Implemented; source and production verification passed; browser unavailable  
Last updated: 2026-08-30  
Scope: Normalize the metric units shown by all 13 recipes, set Honey/Blue Agave to the requested values, and keep the recipe notes consistent with the ingredient data.

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative user requirement | The user requested Honey/Blue Agave to be 7 ml everywhere, then clarified that Matcha Spiced remains 3 ml. | All other Honey/Blue Agave entries are 7 ml; Matcha Spiced is 3 ml in the hot build and cold-foam note. |
| Repository-verified recipe data | `src/data/recipes.ts` contains 13 recipes, each with Hot and Iced builds. | The audit covers all 26 builds plus every free-text cold-foam note. |
| Repository-verified rendering | `Ingredient.amount` is a display string consumed by the existing recipe card, featured recipe, queue, and modal components. | No component or API change is required; the corrected strings flow through every existing recipe surface. |
| Inferred unit rule | No canonical measurement guide is stored in the repository. | Liquids use ml; dry powders use g; pump, shot, spoon, pinch, and splash remain operational measures where no safe numeric conversion was provided. |
| Discrepancy / plan gap | The repository does not provide ingredient densities or an external recipe specification. | Changing a liquid label from g to ml is a unit normalization based on ingredient form, not a density-accurate mass conversion. Confirm against the kitchen's source sheet if exact mass equivalence is required. |
| Task-board state | No task board or issue reference exists in the repository. | There is no stale board state to override. |

## Roadmap and ownership

| Task | Surface / owner | Status | Acceptance evidence |
| --- | --- | --- | --- |
| Inventory every recipe build and note | `src/data/recipes.ts` / implementation | Complete | 13 recipes, 26 builds, and all cold-foam notes were reviewed. |
| Apply Honey/Blue Agave values | `src/data/recipes.ts` / implementation | Complete | Six visible Honey/Blue Agave references use 7 ml except Matcha Spiced, which uses 3 ml. |
| Normalize liquid and dry metric units | `src/data/recipes.ts` / implementation | Complete | Liquid syrups, condensed milk, patis, water, milk, honey/agave, and cold-foam liquids use ml; matcha powder and Tibuok use g. |
| Preserve non-metric operational measures | `src/data/recipes.ts` / implementation | Complete | Pumps, shots, spoon, pinch, and splash remain because the repository supplies no reliable numeric conversion. |
| Publish the implementation record | `docs/recipe-ingredient-units.md`, `docs/recipe-ingredient-units.html` / implementation | Complete | This Markdown specification and the matching responsive HTML artifact are included. |
| Run source and production verification | lint, build, invariant audit, rendered artifact / implementation | Complete with browser limitation | Source audit, lint, build, diff, and static artifact checks pass; no browser was available for rendered QA. |

## Unit policy

### Metric volume: ml

These are liquid or pourable ingredients in the current recipe data:

- Water — 40 ml
- Milk — 120 ml
- Honey/Blue Agave — 7 ml by default; 3 ml for Matcha Spiced
- Caramel Syrup — 15 ml
- Spiced Biscuit Syrup — 15 ml
- Condensed Milk — 15 ml
- Patis — 2 ml
- Cold-foam whipping cream — 30 ml
- Cold-foam milk — 15 ml

### Metric mass: g

These are dry ingredients whose current numeric amounts are weights:

- Matcha Powder — 4 g
- Tibuok — 0.3 g

### Operational measures retained

The following are intentionally not converted because the source data expresses them as preparation or serving actions and does not define a numeric equivalent:

- Syrup pumps — 1 pump or 1½ pumps
- Espresso — 2 shots
- Biscoff Spread — 1 spoon
- Sea Salt — pinch
- Ground Cinnamon — splash

## Complete recipe audit

| # | Recipe | Final unit decision | Build / note coverage |
| ---: | --- | --- | --- |
| 01 | Cheesecake | No numeric ingredient-unit change; cold-foam spacing standardized. | Pumps, shots, milk, and cold-foam liquids are consistent. |
| 02 | Caramel | Caramel Syrup is 15 ml. | Hot ingredient and cold-foam note match. |
| 03 | Sea Salt | Condensed Milk is 15 ml. | Both builds and the cold-foam note are consistent. |
| 04 | Caramelized Patis | Caramel Syrup is 15 ml; Patis is 2 ml. | Hot ingredients and cold-foam note match. |
| 05 | Matcha | Honey/Blue Agave is 7 ml in both builds. | Matcha remains 4 g; water remains 40 ml. |
| 06 | Spanish | Condensed Milk is 15 ml. | Both builds are consistent. |
| 07 | Matcha Spiced | Honey/Blue Agave is 3 ml; Spiced Biscuit Syrup is 15 ml. | The iced cold-foam note mirrors 3 ml and 15 ml. |
| 08 | Kape Tibuok | Condensed Milk is 15 ml; Tibuok remains 0.3 g. | The cold-foam note uses 0.3 g with consistent spacing. |
| 09 | Spanish Cinnamon | Condensed Milk is 15 ml. | Ground Cinnamon remains the operational “splash” measure. |
| 10 | Salted Caramel | Caramel Syrup is 15 ml. | The cold-foam note matches. |
| 11 | Dirty Matcha | Honey/Blue Agave is 7 ml in both builds. | Matcha remains 4 g; water remains 40 ml. |
| 12 | Biscoff | No numeric ingredient-unit change. | Biscoff remains 1 spoon; cold-foam liquids are consistently formatted. |
| 13 | Matcha Caramel | Caramel Syrup is 15 ml in both builds. | Matcha remains 4 g; water remains 40 ml. |

## State transitions and side effects

- Recipe data remains a static exported array; no persistence or runtime mutation is introduced.
- Existing Hot/Iced selectors continue to choose between the same recipe builds.
- Existing recipe cards, Coffee of the Day, queue previews, and the modal read the corrected `amount` strings without parsing or transforming them.
- Cold-foam details remain in the existing `note` field; only their unit labels and spacing were aligned.
- There is no transaction, locking, idempotency, batch operation, audit trail, rollback workflow, or partial-failure behavior because this is a static content update.

## API surface and cross-feature dependencies

This feature has no API endpoints. Authentication, authorization, path/query parameters, request bodies, response shapes, validation errors, persistence/schema changes, and backend routes are not applicable.

The only runtime dependency is the existing `Ingredient.amount: string` contract in `src/types.ts`. The UI treats amounts as display text, so no frontend route or backend route is missing for this change.

## Acceptance criteria

- [x] Every Honey/Blue Agave entry outside Matcha Spiced is 7 ml.
- [x] Matcha Spiced Honey/Blue Agave is 3 ml in its hot build and its cold-foam note.
- [x] Liquid recipe ingredients that previously used g now use ml: syrups, condensed milk, and patis.
- [x] Water and milk remain in ml.
- [x] Dry numeric ingredients remain in g: matcha powder and Tibuok.
- [x] Operational measures remain readable and are not assigned invented conversions.
- [x] Cold-foam notes use the same corrected units and consistent spacing.
- [x] All 13 recipes and both temperature builds are covered by the audit.
- [x] `npm run lint` passes after the update.
- [x] `npm run build` passes after the update.
- [x] A direct data invariant audit passes with no stale Honey/Blue Agave or liquid-g labels.

## Verification evidence

The implementation checks are complete. Browser QA remains unavailable in this environment.

- Source invariant audit — PASS: 13 recipes found; Honey/Blue Agave values are `7 ml, 7 ml, 3 ml, 7 ml, 7 ml` in the five structured entries, with the Matcha Spiced note at `3 ml`; no liquid ingredient retains a g unit; no unspaced ml values remain.
- `npm run lint` — PASS: Oxlint reported no findings.
- `npm run build` — PASS: TypeScript project build and Vite production build completed successfully.
- `git diff --check` — PASS: no whitespace errors.
- HTML artifact inspection — PASS: both artifacts exist; the HTML contains 13 audit rows, responsive and print styles, a recipe filter, and source/specification links.
- Browser QA — BLOCKED by environment: browser discovery returned an empty availability list. No rendered desktop/mobile or console check was possible; the consuming UI components were not changed.
- Full test suite — Not available: `package.json` contains no test script or test runner.
- Known unrelated failures or environment warnings — None observed in the available checks.

## Remaining work

No code work remains. Browser QA is the only unexecuted verification item because no browser is available; no further recipe-unit decisions remain unless the kitchen's canonical measurement sheet supplies density-based conversions or numeric equivalents for the retained operational measures.
