# Brewline recipe image backgrounds

Status: Implemented and verified  
Last verified: 2026-08-28  
Scope: Two generated gradient-background drink visuals for every recipe in the Brewline rotation—one Hot and one Iced—used as the visual background wherever that recipe appears.

## Source-of-truth reconciliation

| Classification | Evidence | Result |
| --- | --- | --- |
| Authoritative product data | `src/data/recipes.ts` | 13 recipe IDs and ingredient builds are in scope. |
| Repository-verified behavior | `src/data/recipeImages.ts`, `RecipeBackdrop.tsx`, and the four consuming components | Every recipe ID maps to Hot and Iced local WebPs; the card, featured section, and modal crossfade between the matching layers. Queue previews intentionally use the Iced layer because they have no temperature selector. |
| Inferred requirement | User request to switch the image base when the drink is Hot or Iced, with a smooth transition | Each visual represents its temperature-specific build, and the active layer changes with a 500 ms opacity transition. |
| Task-board state | No task board or external issue reference is present in the repository. | No stale board state or board/repository discrepancy to reconcile. |
| Blockers / discrepancies | Current worktree, build, lint, and browser QA | None found. |

## Roadmap and ownership

| Task | Surface / owner | Status | Acceptance evidence |
| --- | --- | --- | --- |
| Inspect recipe data and UI surfaces | `src/data/recipes.ts`, `src/components/` / implementation | Complete | All 13 recipes and image-bearing surfaces identified. |
| Generate Hot and Iced image variants | `public/recipes/*.webp` / ImageGen skill | Complete | 26 distinct square beverage visuals with gradient backdrops: 13 Hot and 13 Iced. |
| Optimize generated assets | `public/recipes/*.webp` / implementation | Complete | WebP derivatives are 1254×1254 and approximately 36–72 KB each; total asset folder is about 1.4 MB. |
| Wire temperature-aware images into the UI | `src/data/recipeImages.ts`, `RecipeBackdrop`, `RecipeCard`, `CoffeeOfTheDay`, `QueueStrip`, `RecipeModal` | Complete | Both layers mount per surface; Hot/Iced selectors drive the active layer and the queue defaults to Iced. |
| Verify responsive and interactive behavior | Local Vite app / implementation | Complete | Desktop and mobile visual QA, image-layer crossfade, Hot/Iced build toggle, modal open/close, overflow, and console checks passed. |
| Publish implementation record | This Markdown file and `recipe-image-backgrounds.html` | Complete | Both artifacts are self-contained and synchronized with the final worktree. |

## Asset matrix

All assets are local, text-free, square WebP images generated in the same product-photography family. They use a gradient backdrop and place the drink slightly to the right to preserve space for recipe copy. Hot assets use steam and heat-safe vessels; Iced assets use glass, ice, and condensation.

| # | Recipe | Hot asset | Iced asset | Dimensions | Approx. sizes |
| ---: | --- | --- | --- | ---: | ---: |
| 01 | Cheesecake | `public/recipes/cheesecake-hot.webp` | `public/recipes/cheesecake.webp` | 1254×1254 | 48 KB / 60 KB |
| 02 | Caramel | `public/recipes/caramel-hot.webp` | `public/recipes/caramel.webp` | 1254×1254 | 48 KB / 64 KB |
| 03 | Sea Salt | `public/recipes/sea-salt-hot.webp` | `public/recipes/sea-salt.webp` | 1254×1254 | 36 KB / 64 KB |
| 04 | Caramelized Patis | `public/recipes/caramelized-patis-hot.webp` | `public/recipes/caramelized-patis.webp` | 1254×1254 | 44 KB / 56 KB |
| 05 | Matcha | `public/recipes/matcha-hot.webp` | `public/recipes/matcha.webp` | 1254×1254 | 44 KB / 48 KB |
| 06 | Spanish | `public/recipes/spanish-hot.webp` | `public/recipes/spanish.webp` | 1254×1254 | 48 KB / 64 KB |
| 07 | Matcha Spiced | `public/recipes/matcha-spiced-hot.webp` | `public/recipes/matcha-spiced.webp` | 1254×1254 | 52 KB / 68 KB |
| 08 | Kape Tibuok | `public/recipes/kape-tibuok-hot.webp` | `public/recipes/kape-tibuok.webp` | 1254×1254 | 52 KB / 64 KB |
| 09 | Spanish Cinnamon | `public/recipes/spanish-cinnamon-hot.webp` | `public/recipes/spanish-cinnamon.webp` | 1254×1254 | 72 KB / 64 KB |
| 10 | Salted Caramel | `public/recipes/salted-caramel-hot.webp` | `public/recipes/salted-caramel.webp` | 1254×1254 | 52 KB / 72 KB |
| 11 | Dirty Matcha | `public/recipes/dirty-matcha-hot.webp` | `public/recipes/dirty-matcha.webp` | 1254×1254 | 48 KB / 56 KB |
| 12 | Biscoff | `public/recipes/biscoff-hot.webp` | `public/recipes/biscoff.webp` | 1254×1254 | 48 KB / 64 KB |
| 13 | Matcha Caramel | `public/recipes/matcha-caramel-hot.webp` | `public/recipes/matcha-caramel.webp` | 1254×1254 | 48 KB / 60 KB |

## Implementation behavior

- `getRecipeImage(recipe.id, temperature)` centralizes the two-variant mapping and falls back to `/coffee-icon.png` for an unknown ID.
- `RecipeBackdrop` mounts both the Hot and Iced background layers and crossfades their opacity over 500 ms with an ease-in-out curve. `motion-reduce:transition-none` respects reduced-motion preferences.
- Recipe cards use the active generated image as their full background, with dark vertical and horizontal overlays for ingredient legibility. Their hover lift and shadow use a 300 ms ease-out transition limited to `translate` and `box-shadow`; reduced-motion users get no lift transition.
- The Coffee of the Day panel and recipe modal use the active image, a readable dark overlay, and a translucent category gradient so the generated image remains visible.
- Queue items use Iced image-backed previews because the queue has no Hot/Iced selector.
- Hot/Iced controls change both the displayed ingredient build and the image base for cards, the featured panel, and the modal.
- The UI contains no image text, logos, packaging, people, or watermark content.

## Generation prompt set

The built-in ImageGen tool was used. The shared prompt shape was:

```text
Use case: product-mockup
Asset type: recipe visual for a coffee recipe web app
Primary request: one premium hot or iced drink visual based on the named recipe, its ingredients, and the requested temperature
Input images: the previously generated Matcha Caramel visual as a style reference only
Scene/backdrop: full-frame smooth gradient in colors associated with the recipe; no table or café scene
Composition/framing: square, hero glass slightly right of center, generous negative space on the left
Style/medium: premium studio product photography; Hot uses steam and heat-safe vessels, Iced uses realistic condensation, ice, glass, milk, and foam
Lighting/mood: soft directional light, gentle rim light, calm, warm, modern, inviting
Constraints: no people, hands, logos, labels, packaging, typography, text, or watermark
```

Recipe-specific variations identified the drink and used palettes such as matcha/sage, espresso/caramel, sea-glass/pearl, cinnamon/cream, or biscuit/vanilla.

## API surface and dependencies

This feature has no API endpoints, authentication, authorization, request bodies, persistence changes, transactions, state transitions, or backend dependencies. It is a static asset mapping consumed by the existing React UI.

Runtime dependency: the generated WebP files must be present under `public/recipes/` at the paths in the asset matrix. The original ImageGen PNG outputs remain in the local ImageGen output directory; duplicate PNG copies are not shipped from `public/`.

## Acceptance criteria

- [x] Every one of the 13 repository recipes has distinct Hot and Iced generated drink visuals.
- [x] Every visual has a gradient background and no baked-in text.
- [x] Every recipe card uses its matching image as a background.
- [x] The featured recipe, queue previews, and modal header use the selected recipe’s matching temperature image; queue previews default to Iced.
- [x] Ingredient and Hot/Iced behavior remains functional, with a smooth image crossfade on selectable surfaces.
- [x] Card hover lift and shadow transition smoothly without animating layout properties.
- [x] Desktop and mobile layouts remain readable with no horizontal overflow.
- [x] Production build, lint, focused browser checks, and console checks pass.

## Verification evidence

- `npm run lint` — PASS (`oxlint`, no findings).
- `npm run build` — PASS (`tsc -b` and Vite production build completed successfully; 26 recipe WebPs are included in the production output).
- Desktop browser QA — PASS at a 1440×1000 viewport; all 13 cards and the featured panel render both temperature layers, and the first card’s Iced selector changes the active layer with the configured transition.
- Card hover QA — PASS: the first card transitions through an intermediate `translate` value before settling at the 4 px lift, using `translate, box-shadow`, 300 ms, and ease-out.
- Mobile browser QA — PASS at a 390×844 viewport; no horizontal overflow, image switching remains usable, and the queue scrollbar is visually suppressed.
- Interaction QA — PASS: card and featured Iced controls change both ingredients and image layer without opening the modal; opening Biscoff opens a visible modal with both temperature layers; close control works.
- Browser console QA — PASS: zero error or warning logs during the focused run.
- Full test suite — Not available; `package.json` defines lint, build, dev, and preview scripts but no test script.
- Known unrelated failures or environment warnings — None observed.

## Remaining work

No required work remains for this request. The original ImageGen PNG outputs remain in the local generated-image archive; only optimized WebPs are shipped under `public/recipes/`.
