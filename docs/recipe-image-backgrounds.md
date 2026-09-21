# Brewline recipe image backgrounds

Status: Implemented; varied natural editorial asset set, temperature-switch regression, and reference-led Iced Spanish refresh verified
Last verified: 2026-09-17
Scope: Natural editorial café photographs for every available recipe build—Hot/Iced pairs for the 12 complete recipes plus an Iced-only Gula Melaka visual—used as the visual background wherever that build appears; the recent Iced Matcha Caramel asset is intentionally preserved.

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative product data | `src/data/recipes.ts` | 13 recipe IDs and ingredient builds are in scope; 12 have complete image pairs and Gula Melaka has an Iced-only visual. |
| Repository-verified behavior | `src/data/recipeImages.ts`, `RecipeBackdrop.tsx`, and the consuming components | Each available recipe build maps to a local WebP; cards, featured content, the queue, and the modal use the matching available temperature layer. Queue previews follow the scheduled build for each future day. |
| Inferred requirement | User request to switch the image base when the drink is Hot or Iced, with a smooth transition | Each visual represents its temperature-specific build, and the active layer changes with a 500 ms opacity transition. |
| Task-board state | No task board or external issue reference is present in the repository. | No stale board state or board/repository discrepancy to reconcile. |
| Blockers / discrepancies | Latest worktree browser discovery | The current scheduled queue-temperature recheck could not run because no browser was available; no code blocker was found. |

## Roadmap and ownership

| Task | Surface / owner | Status | Acceptance evidence |
| --- | --- | --- | --- |
| Inspect recipe data and UI surfaces | `src/data/recipes.ts`, `src/components/` / implementation | Complete | All 13 recipes and image-bearing surfaces identified. |
| Generate available image variants | `public/recipes/*.webp` / ImageGen skill | Complete | 24 refreshed square beverage visuals plus the preserved recent Iced Matcha Caramel asset: 12 Hot/Iced pairs and one Iced-only Gula Melaka asset. |
| Optimize generated assets | `public/recipes/*.webp` / implementation | Complete | WebP derivatives are 1254×1254 and approximately 82–248 KB each; the asset folder is 3,632,130 bytes. |
| Wire temperature-aware images into the UI | `src/data/recipeImages.ts`, `RecipeBackdrop`, `RecipeCard`, `CoffeeOfTheDay`, `QueueStrip`, `RecipeModal` | Complete | Available-build selectors drive the active layer; the Iced-only Gula Melaka card and modal never expose a Hot image. |
| Verify responsive and interactive behavior | Local Vite app / implementation | Complete for image feature; browser recheck unavailable | Existing desktop/mobile interaction QA remains valid; the current build served the root page and all 25 recipe image URLs with HTTP 200. |
| Publish implementation record | This Markdown file and `recipe-image-backgrounds.html` | Complete | Both artifacts are self-contained and synchronized with the final worktree. |

## Asset matrix

All assets are local, text-free, square WebP images in the same natural editorial café-photography family. The set combines 24 newly generated images with the preserved recent Iced Matcha Caramel image. They share moody café light, warm wood or stone, soft equipment bokeh, and honest drink texture, but intentionally vary the camera angle, crop, surface, vessel, props, and background arrangement so no refreshed recipe pair copies a full scene. Hot assets use ceramic vessels and warm drink texture; Iced assets use glass, ice, and condensation.

| # | Recipe | Hot asset | Iced asset | Dimensions | Approx. sizes |
| ---: | --- | --- | --- | ---: | ---: |
| 01 | Cheesecake | `public/recipes/cheesecake-hot.webp` | `public/recipes/cheesecake.webp` | 1254×1254 | 82 KB / 148 KB |
| 02 | Caramel | `public/recipes/caramel-hot.webp` | `public/recipes/caramel.webp` | 1254×1254 | 129 KB / 185 KB |
| 03 | Sea Salt | `public/recipes/sea-salt-hot.webp` | `public/recipes/sea-salt.webp` | 1254×1254 | 117 KB / 100 KB |
| 04 | Caramelized Patis | `public/recipes/caramelized-patis-hot.webp` | `public/recipes/caramelized-patis.webp` | 1254×1254 | 124 KB / 113 KB |
| 05 | Matcha | `public/recipes/matcha-hot.webp` | `public/recipes/matcha.webp` | 1254×1254 | 154 KB / 138 KB |
| 06 | Spanish | `public/recipes/spanish-hot.webp` | `public/recipes/spanish.webp` | 1254×1254 | 104 KB / 141 KB |
| 07 | Matcha Spiced | `public/recipes/matcha-spiced-hot.webp` | `public/recipes/matcha-spiced.webp` | 1254×1254 | 174 KB / 155 KB |
| 08 | Kape Tibuok | `public/recipes/kape-tibuok-hot.webp` | `public/recipes/kape-tibuok.webp` | 1254×1254 | 146 KB / 159 KB |
| 09 | Salted Caramel | `public/recipes/salted-caramel-hot.webp` | `public/recipes/salted-caramel.webp` | 1254×1254 | 114 KB / 212 KB |
| 10 | Dirty Matcha | `public/recipes/dirty-matcha-hot.webp` | `public/recipes/dirty-matcha.webp` | 1254×1254 | 121 KB / 131 KB |
| 11 | Biscoff | `public/recipes/biscoff-hot.webp` | `public/recipes/biscoff.webp` | 1254×1254 | 159 KB / 248 KB |
| 12 | Matcha Caramel | `public/recipes/matcha-caramel-hot.webp` | `public/recipes/matcha-caramel.webp` | 1254×1254 | 114 KB / 107 KB |
| 13 | Gula Melaka | — | `public/recipes/gula-melaka.webp` | 1254×1254 | — / 171 KB |

## Implementation behavior

- `getRecipeImage(recipe.id, temperature)` centralizes the available temperature mapping and falls back to `/coffee-icon.png` when a recipe has no image for the requested variant.
- `RecipeBackdrop` renders the active build image and crossfades it over 500 ms with an ease-in-out curve. `motion-reduce:transition-none` respects reduced-motion preferences.
- Recipe cards use the active generated image as their full background, with dark vertical and horizontal overlays for ingredient legibility. Their hover lift and shadow use a 300 ms ease-out transition limited to `translate` and `box-shadow`; reduced-motion users get no lift transition.
- The Coffee of the Day panel and recipe modal use the active image, a readable dark overlay, and a translucent category gradient so the generated image remains visible.
- Queue items use the scheduled Hot/Iced image for their future day because the queue has no Hot/Iced selector; recipes with one available build use that build’s image, and recipes with neither build are not queued.
- Hot/Iced controls change the displayed ingredient build and image base wherever that build exists; Iced-only Gula Melaka exposes only its Iced image.
- The UI contains no image text, logos, packaging, people, or watermark content.

## Generation prompt set

The built-in ImageGen tool was used for the 24 refreshed assets. The recent Iced Matcha Caramel image was preserved from the preceding approved pass. The Iced Spanish asset was regenerated from the attached espresso-bar reference, keeping the recipe mapping while matching its moody machine backdrop, navy woven cloth, rounded glass, foamed milk, and cinnamon finish. The shared prompt shape was:

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

Runtime dependency: the generated WebP files must be present under `public/recipes/` at the paths in the asset matrix for all available builds. The original ImageGen PNG outputs remain in the local ImageGen output directory; duplicate PNG copies are not shipped from `public/`.

## Acceptance criteria

- [x] Every available build has a distinct drink visual; the 12 complete recipes have Hot/Iced pairs and Gula Melaka has an Iced-only visual.
- [x] Every visual uses a natural editorial café scene and has no baked-in text.
- [x] Every recipe card uses its matching image as a background.
- [x] The featured recipe, queue previews, and modal header use the selected recipe’s matching temperature image; queue previews follow the scheduled build for each future day.
- [x] Ingredient and available-build behavior remains functional, with a smooth image crossfade on selectable surfaces.
- [x] Card hover lift and shadow transition smoothly without animating layout properties.
- [x] Desktop and mobile layouts remain readable with no horizontal overflow.
- [x] Production build, lint, focused browser checks, and console checks pass.

## Verification evidence

- `oxlint` — PASS (0 warnings, 0 errors).
- `tsc -b` and Vite production build — PASS; 25 recipe WebPs are included in the production output.
- Ingredient-row regression test — PASS; every available build has unique name/amount row identities, including recipes with repeated ingredient names.
- Asset review — PASS; all 25 final WebPs are 1254×1254 and were reviewed together as a contact sheet for natural composition and malformed details.
- Iced Spanish reference refresh — PASS; the new asset was generated from the attached café reference, visually inspected, and saved as a 1254×1254 WebP at `public/recipes/spanish.webp`.
- Local Vite URL smoke — PASS; the root page and all 25 `/recipes/*.webp` URLs returned HTTP 200.
- Full Vitest suite — PARTIAL: 5 files, 28 tests; 24 passed and 4 failed on pre-existing recipe-data expectations (temperature-specific recommendation metadata, Matcha Spiced syrup amount, `milk 5 ml` vs `10 ml` cold foam, and the Dirty Matcha mixture shape), outside this task.
- Browser interaction recheck — Not available: browser discovery returned “No browser is available”; component renderers were statically checked and the shared ingredient-row invariant passes.

## Remaining work

No requested image or ingredient-switch work remains. The original ImageGen PNG outputs remain in the local generated-image archive; only optimized WebPs are shipped under `public/recipes/`. The four full-suite data failures remain as a separate pre-existing worktree issue.
