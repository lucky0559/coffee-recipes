# Brewline — Coffee Recipes

Brewline is a static coffee recipe browser built with React, TypeScript, Vite, and Tailwind CSS. It presents a fixed recipe line, highlights one coffee of the day, and lets people switch between Hot and Iced builds before opening the full recipe.

## What is included

- A categorized grid of 13 coffee and matcha recipes.
- A deterministic Coffee of the Day queue that advances one recipe per local calendar day.
- Hot/Iced ingredient controls on the featured recipe and recipe cards.
- A recipe-detail modal that carries the selected temperature into the full build.
- Local temperature-specific WebP backgrounds for cards, the featured panel, the queue, and the modal.
- Favicon, Apple touch icon, and web-manifest assets for the Brewline identity.

The app is client-only. There is no backend, database, authentication, external runtime API, user account, or persistence layer.

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

`npm test` runs the unit suite for the daily rotation and recipe-data invariants. `npm run build` is also the repository's type-checking check because it runs `tsc -b` before the Vite build.

## Repository map

| Path | Responsibility |
| --- | --- |
| `src/App.tsx` | Owns the current local date, daily selection, queue, modal selection, and midnight refresh. |
| `src/types.ts` | Defines `Recipe`, `RecipeBuild`, `Ingredient`, `Category`, and `Temperature`. |
| `src/data/recipes.ts` | Authoritative ordered recipe data and ingredient display strings. |
| `src/data/categories.ts` | Category accent and pill colors. |
| `src/data/recipeImages.ts` | Recipe ID to Hot/Iced public-image mapping. |
| `src/lib/coffeeOfTheDay.ts` | Pure date, queue, and scheduled-temperature helpers. |
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
  hot: { ingredients: [{ name: "Ingredient", amount: "15 ml" }] },
  iced: {
    ingredients: [{ name: "Ingredient", amount: "120 ml" }],
    note: "Optional cold-foam or serving detail",
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

`getRecipeImage` defaults to Iced when no temperature is supplied and falls back to `/coffee-icon.png` for an unknown recipe ID. `RecipeBackdrop` mounts both temperature layers and crossfades the active one over 500 ms; its reduced-motion class removes that transition for users who request reduced motion.

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

The app schedules a refresh at the next local midnight while open. Manual Hot/Iced changes affect the current view only; they are not persisted and do not modify the schedule.

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
- No automated end-to-end or browser test suite is declared; use unit tests, lint, build, and focused manual/browser checks.
- No favorites, history, accounts, server-side data, or offline cache/service worker is implemented.
- Deployment provider settings and production hosting status are intentionally not inferred from this repository.
