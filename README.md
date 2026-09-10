# Brewline — Coffee Recipes

Brewline is a static coffee recipe browser built with React, TypeScript, Vite, and Tailwind CSS. It presents a fixed recipe line, highlights one coffee of the day, supports search and saved recipes, and lets people switch between Hot and Iced builds before opening a shareable recipe detail.

## What is included

- A categorized grid of 13 coffee and matcha recipes.
- A deterministic Coffee of the Day queue that advances one recipe per local calendar day.
- Hot/Iced ingredient controls on the featured recipe and recipe cards.
- Search, category, saved-recipe, and allergen-aware discovery filters.
- Device-local favorites, recently opened recipes, and a preferred build temperature.
- A recipe-detail modal that carries the selected temperature into the build, labels known allergens, and lists possible substitutions.
- Shareable recipe URLs with native sharing when available and a clipboard fallback.
- Local temperature-specific WebP backgrounds for cards, the featured panel, the queue, and the modal.
- Favicon, Apple touch icon, and web-manifest assets for the Brewline identity.
- A service worker that precaches the recipe library for offline reading.

The app is client-only. There is no backend, database, authentication, external runtime API, or user account. Device-local preferences use `localStorage`; the service worker caches the static app shell and recipe images.

## Stack

- React 19 and React DOM
- TypeScript 6
- Vite 8 with `@vitejs/plugin-react`
- Tailwind CSS 4 through `@tailwindcss/vite`
- Oxlint/Oxc for linting
- `lucide-react` for interface icons

The package manifest does not define a Node.js `engines` range. Use a current Node.js/npm installation compatible with the declared dependencies.

## Local development

Install the locked dependency tree and start Vite's development server:

```bash
npm ci
npm run dev
```

Vite prints the local URL in the terminal. For a device on the same network, start Vite with its host flag:

```bash
npm run dev -- --host
```

### Verification and production preview

```bash
npm test        # Vitest unit suite
npm run lint     # Oxlint
npm run build    # tsc -b, then vite build; writes dist/
npm run preview  # serves the existing dist/ build locally
```

`npm test` runs the unit suite for rotation, recipe-data metadata, discovery filters, local preferences, and deep-link helpers. `npm run build` is also the repository's type-checking check because it runs `tsc -b` before the Vite build.

## Repository map

| Path | Responsibility |
| --- | --- |
| `src/App.tsx` | Owns the current local date, daily selection, queue, modal selection, and midnight refresh. |
| `src/types.ts` | Defines `Recipe`, `RecipeBuild`, `Ingredient`, `Substitution`, `Allergen`, `Category`, and `Temperature`. |
| `src/data/recipes.ts` | Authoritative ordered recipe data and ingredient display strings. |
| `src/data/categories.ts` | Category accent and pill colors. |
| `src/data/recipeImages.ts` | Recipe ID to Hot/Iced public-image mapping. |
| `src/lib/coffeeOfTheDay.ts` | Pure date, queue, and scheduled-temperature helpers. |
| `src/lib/recipeFilters.ts` | Search, category, favorites, and allergen-aware discovery helpers. |
| `src/lib/recipeLinks.ts` | Deep-link parsing and share URL generation. |
| `src/lib/recipePreferences.ts` | Safe preference serialization and favorite/recent-history updates. |
| `src/lib/useRecipePreferences.ts` | React persistence hook for device-local recipe preferences. |
| `src/components/` | Header, featured recipe, queue, cards, backdrops, grid, and modal UI. |
| `public/recipes/` | Local Hot/Iced recipe images. |
| `public/` | Favicons, app icons, and `site.webmanifest`. |
| `docs/` | Feature implementation records in Markdown and self-contained HTML. |

## Recipe data

`src/data/recipes.ts` is the source of truth. It exports one `Recipe[]`; the array order is the serving order used by the daily queue. The `number` field is the displayed recipe number and should stay aligned with that order.

The current line is:

| # | ID | Recipe | Category |
| ---: | --- | --- | --- |
| 01 | `cheesecake` | Cheesecake | Sweet |
| 02 | `caramel` | Caramel | Sweet |
| 03 | `sea-salt` | Sea Salt | Savory |
| 04 | `caramelized-patis` | Caramelized Patis | Savory |
| 05 | `matcha` | Matcha | Matcha |
| 06 | `spanish` | Spanish | Classic |
| 07 | `matcha-spiced` | Matcha Spiced | Matcha |
| 08 | `kape-tibuok` | Kape Tibuok | Classic |
| 09 | `spanish-cinnamon` | Spanish Cinnamon | Classic |
| 10 | `salted-caramel` | Salted Caramel | Sweet |
| 11 | `dirty-matcha` | Dirty Matcha | Matcha |
| 12 | `biscoff` | Biscoff | Sweet |
| 13 | `matcha-caramel` | Matcha Caramel | Matcha |

Each recipe has this shape:

```ts
{
  id: "stable-slug",
  number: "01",
  name: "Display name",
  category: "Sweet",
  hot: {
    ingredients: [{ name: "Ingredient", amount: "15 ml" }],
    allergens: [],
    substitutions: [],
  },
  iced: {
    ingredients: [{ name: "Ingredient", amount: "120 ml" }],
    note: "Optional cold-foam or serving detail",
    allergens: ["Dairy"],
    substitutions: [{ ingredient: "Milk", alternatives: ["Oat milk"] }],
  },
}
```

`Ingredient.amount` is display text; the application does not parse or convert it. Current data follows this measurement policy:

- Liquids use `ml` and dry numeric ingredients use `g`.
- Pumps, shots, spoon, pinch, and splash remain operational measures when no reliable conversion is defined.
- Honey/Blue Agave is `7 ml` by default; Matcha Spiced intentionally remains `3 ml`.
- Cold-foam details live in the Iced build's free-text `note` and must be updated manually when the build changes.

### Adding or changing a recipe

1. Update the recipe object in `src/data/recipes.ts`.
2. Keep `id` stable if the recipe already exists; it is also the image-map key.
3. Keep `number`, array position, and the visible serving order consistent.
4. Provide both `hot` and `iced` builds, even when their ingredients are similar.
5. Add or update the two image files and the entry in `src/data/recipeImages.ts`.
6. Run `npm test`, `npm run lint`, and `npm run build` before shipping the change.

Because queue position depends on array order and recipe count, inserting, removing, or reordering a recipe changes future daily selections and rotation boundaries.

## Image assets

Recipe images are static files under `public/recipes/` and are addressed from the site root. The naming convention is:

```text
public/recipes/<recipe-id>-hot.webp   # Hot build
public/recipes/<recipe-id>.webp       # Iced build
```

The current asset set contains 26 recipe WebPs—one Hot/Iced pair for each recipe—and occupies about 1.4 MB. Keep images text-free and use the existing square product-visual style so the overlays remain readable.

`src/data/recipeImages.ts` is the only mapping consumed by the UI:

```ts
getRecipeImage("sea-salt", "Hot")  // /recipes/sea-salt-hot.webp
getRecipeImage("sea-salt", "Iced") // /recipes/sea-salt.webp
```

`getRecipeImage` defaults to Iced when no temperature is supplied and falls back to `/coffee-icon.png` for an unknown recipe ID. `RecipeBackdrop` renders only the active temperature image, uses lazy asynchronous loading for cards and queue items, and respects reduced-motion preferences.

When an image is added or renamed, verify the complete chain: recipe ID → `RECIPE_IMAGES` entry → file under `public/recipes/` → production path in `dist/`.

## Daily rotation

The rotation is deterministic rather than random. `src/lib/coffeeOfTheDay.ts` anchors the line at August 16, 2026:

```ts
const ROTATION_EPOCH_UTC = Date.UTC(2026, 7, 16);
```

`daysSinceEpoch` converts the `Date` to its local calendar date before comparing UTC midnights, so the recipe changes at local midnight instead of after an arbitrary 24-hour interval. The main helpers are:

- `queueIndexForDate(recipeCount, date)` — normalized zero-based index in the ordered recipe array.
- `getCoffeeOfTheDay(recipes, date)` — recipe at today's queue index.
- `getUpcomingQueue(recipes, date)` — the full line starting today, wrapped at the end.
- `defaultTemperatureForDate(recipeCount, date)` — scheduled Hot/Iced build for today's recipe.
- `defaultTemperatureForRecipePosition(recipeCount, position, date)` — scheduled build for a known position in the current cycle.

The effective rules are:

```text
elapsedDays = daysSinceEpoch(date)
queueIndex = normalized(elapsedDays % recipeCount)
rotationIndex = floor(elapsedDays / recipeCount)
alternatingPosition = rotationIndex + positionInRotation
even alternatingPosition → Hot
odd alternatingPosition  → Iced
```

With the current 13-recipe line, the anchored cycle starts Hot and alternates through the line, ending Hot. The next cycle starts Iced:

| Local date | Queue item | Scheduled build |
| --- | --- | --- |
| 2026-08-16 | Cheesecake | Hot |
| 2026-08-17 | Caramel | Iced |
| 2026-08-20 | Matcha | Hot |
| 2026-08-28 | Matcha Caramel | Hot |
| 2026-08-29 | Cheesecake, after reset | Iced |

Dates before the anchor remain deterministic because the helper uses floor-based rotation division and normalizes negative remainders. Empty or non-positive recipe counts return a safe Hot fallback in the temperature helpers; normal UI operation always uses the 13-item array.

The app schedules a refresh at the next local midnight while open. The Schedule/Hot/Iced preference is persisted on the device; selecting Schedule restores the deterministic daily build. Manual temperature changes inside a detail view affect that view and its share link.

## Discovery and local preferences

The recipe section supports case-insensitive search across recipe names, ingredients, notes, and substitution names. Category, saved-only, and allergen-free-build filters can be combined. The build control chooses the scheduled, Hot, or Iced presentation across the collection.

Favorites, recently opened recipes, and the preferred build are stored under the `brewline.recipe-preferences` local-storage key. Invalid or unavailable storage is handled in memory so the read-only recipe library remains usable.

## Sharing and offline support

Opening a recipe updates the URL with `recipe` and `temperature` query parameters. A shared URL opens the matching detail view directly; browser back and Escape/close remove the transient selection. The Share recipe action uses the clipboard when available, then the native share sheet, then a synchronous copy fallback.

The production build registers `/sw.js`. Its versioned cache precaches the app shell, icons, manifest, and current recipe image set, serves navigations from the cached `index.html` when offline, and caches same-origin runtime assets as they are requested. Bump `CACHE_NAME` when changing the cache contract.

## Deployment

This repository produces a static Vite site. It has no provider-specific deployment file, CI workflow, required environment variable, backend process, or canonical production URL checked into the repository.

Use these provider-agnostic settings on a static host:

| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Publish/output directory | `dist` |
| Runtime environment variables | None visible or required by the repository |

The build copies the `public/` tree into the production output, so `/recipes/*.webp`, favicon files, app icons, and `/site.webmanifest` must remain available at those root-relative paths. Deploying at the domain root is the current safe default. If the site must live under a subpath, configure Vite's `base` and update root-relative asset references accordingly; the repository does not currently include a subpath deployment configuration.

The current app does not define client-side routes, so a history fallback is not required for its existing root entry. Configure the host to serve `index.html` for unknown application routes if routing is introduced later.

The `npm run preview` command is for checking a completed production build locally; it is not the production server.

## Feature documentation

- [Coffee rotation defaults](docs/coffee-rotation.md) · [HTML version](docs/coffee-rotation.html)
- [Recipe image backgrounds](docs/recipe-image-backgrounds.md) · [HTML version](docs/recipe-image-backgrounds.html)

These records contain the detailed implementation scope, acceptance criteria, and verification evidence for the corresponding changes.

## Current limitations

- Recipe data is bundled at build time; content changes require a new build and deployment.
- Tests cover rotation, recipe-data metadata, discovery filters, preferences, and deep-link helpers; focused browser smoke checks cover saved state, filters, modal behavior, sharing, and deep links.
- Curated recipe data remains bundled at build time, while preferences stay local to the current device; there is no account, sync service, or remote editor.
- Deployment provider settings and production hosting status are intentionally not inferred from this repository.
