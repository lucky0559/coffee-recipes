import type { CSSProperties } from "react";
import type { Temperature } from "../types";
import { getRecipeImage } from "../data/recipeImages";

type RecipeBackdropSurface = "card" | "featured" | "modal" | "queue";

interface RecipeBackdropProps {
  recipeId: string;
  temperature: Temperature;
  surface: RecipeBackdropSurface;
  accent?: [string, string];
}

const DEFAULT_ACCENT: [string, string] = ["#6b4a30", "#d98a3d"];

function getOverlay(
  surface: RecipeBackdropSurface,
  accent: [string, string],
): string {
  const [from, to] = accent;

  switch (surface) {
    case "featured":
      return `linear-gradient(90deg, rgba(28, 19, 13, 0.88) 0%, rgba(28, 19, 13, 0.68) 38%, rgba(28, 19, 13, 0.2) 100%), linear-gradient(135deg, ${from}99, ${to}55)`;
    case "modal":
      return `linear-gradient(90deg, rgba(28, 19, 13, 0.78) 0%, rgba(28, 19, 13, 0.3) 100%), linear-gradient(135deg, ${from}99, ${to}55)`;
    case "queue":
      return "linear-gradient(135deg, rgba(28, 19, 13, 0.5), rgba(28, 19, 13, 0.72))";
    case "card":
    default:
      return "linear-gradient(180deg, rgba(28, 19, 13, 0.16) 0%, rgba(28, 19, 13, 0.38) 56%, rgba(28, 19, 13, 0.82) 100%), linear-gradient(90deg, rgba(28, 19, 13, 0.48) 0%, rgba(28, 19, 13, 0.08) 72%)";
  }
}

export function RecipeBackdrop({
  recipeId,
  temperature,
  surface,
  accent = DEFAULT_ACCENT,
}: RecipeBackdropProps) {
  const overlay = getOverlay(surface, accent);
  const temperatures: Temperature[] = ["Hot", "Iced"];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      data-recipe-backdrop={surface}
    >
      {temperatures.map((layerTemperature) => {
        const style: CSSProperties = {
          backgroundImage: `${overlay}, url(${getRecipeImage(recipeId, layerTemperature)})`,
        };

        return (
          <div
            key={layerTemperature}
            className={`recipe-backdrop-layer absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
              temperature === layerTemperature ? "opacity-100" : "opacity-0"
            }`}
            data-temperature={layerTemperature}
            style={style}
          />
        );
      })}
    </div>
  );
}
