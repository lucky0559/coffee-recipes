# Design System

## Product surface

Brewline is a responsive recipe reference product. The visual direction is warm editorial utility: a cream paper-like surface, espresso ink, restrained category accents, and photographic drink imagery used as context rather than decoration.

## Color

- Surface: cream neutrals (`#fffdf9`, `#fbf4ea`, `#f3e6d3`)
- Ink: espresso neutrals (`#1c130d`, `#2a1c13`, `#3d2a1c`, `#533a26`)
- Accent: amber (`#d98a3d`, `#f2b366`) for primary actions and focus-adjacent emphasis
- Category accents: muted berry for Sweet, blue-gray for Savory, olive for Matcha, amber-brown for Classic
- Never use color as the only state signal; pair it with text, icons, or `aria-pressed`.

## Typography

- Display: Fraunces for recipe names and editorial headings.
- Body and controls: Inter for readable product UI.
- Keep body copy within roughly 65–75 characters per line where prose is used.
- Use a clear scale and weight contrast; labels remain in the body family.

## Components

- Header: sticky, compact, cream surface with restrained border and one browse action.
- Featured recipe: dark espresso panel with one primary action, temperature segmented control, ingredients, and queue preview.
- Recipe card: semantic article with a dedicated open button and independent temperature/favorite controls.
- Detail surface: responsive dialog or route with explicit close, share, favorite, temperature, ingredients, substitutions, and allergen notes.
- Discovery controls: labeled search, category filters, temperature filter, and favorites toggle with visible result counts and an empty state.

## Layout and interaction

- Use predictable responsive grids and preserve the current max-width rhythm.
- Prefer progressive disclosure inside the detail surface over nested cards.
- Use 150–250 ms state transitions; disable nonessential motion under `prefers-reduced-motion`.
- Keep interactive targets keyboard reachable with visible focus rings and minimum comfortable touch sizing.

## Performance

- Use lazy, asynchronous image elements for below-the-fold recipe imagery.
- Do not mount inactive temperature image layers for every card.
- Keep offline assets cacheable and avoid making core recipe reading depend on third-party runtime APIs.
