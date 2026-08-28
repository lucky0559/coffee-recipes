import type { Temperature } from "../types";

type RecipeImageSet = Record<Temperature, string>;

const RECIPE_IMAGES: Record<string, RecipeImageSet> = {
  cheesecake: { Hot: "/recipes/cheesecake-hot.webp", Iced: "/recipes/cheesecake.webp" },
  caramel: { Hot: "/recipes/caramel-hot.webp", Iced: "/recipes/caramel.webp" },
  "sea-salt": { Hot: "/recipes/sea-salt-hot.webp", Iced: "/recipes/sea-salt.webp" },
  "caramelized-patis": {
    Hot: "/recipes/caramelized-patis-hot.webp",
    Iced: "/recipes/caramelized-patis.webp",
  },
  matcha: { Hot: "/recipes/matcha-hot.webp", Iced: "/recipes/matcha.webp" },
  spanish: { Hot: "/recipes/spanish-hot.webp", Iced: "/recipes/spanish.webp" },
  "matcha-spiced": {
    Hot: "/recipes/matcha-spiced-hot.webp",
    Iced: "/recipes/matcha-spiced.webp",
  },
  "kape-tibuok": {
    Hot: "/recipes/kape-tibuok-hot.webp",
    Iced: "/recipes/kape-tibuok.webp",
  },
  "spanish-cinnamon": {
    Hot: "/recipes/spanish-cinnamon-hot.webp",
    Iced: "/recipes/spanish-cinnamon.webp",
  },
  "salted-caramel": {
    Hot: "/recipes/salted-caramel-hot.webp",
    Iced: "/recipes/salted-caramel.webp",
  },
  "dirty-matcha": {
    Hot: "/recipes/dirty-matcha-hot.webp",
    Iced: "/recipes/dirty-matcha.webp",
  },
  biscoff: { Hot: "/recipes/biscoff-hot.webp", Iced: "/recipes/biscoff.webp" },
  "matcha-caramel": {
    Hot: "/recipes/matcha-caramel-hot.webp",
    Iced: "/recipes/matcha-caramel.webp",
  },
};

export function getRecipeImage(
  recipeId: string,
  temperature: Temperature = "Iced",
): string {
  return RECIPE_IMAGES[recipeId]?.[temperature] ?? "/coffee-icon.png";
}
