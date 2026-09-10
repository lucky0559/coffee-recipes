import { useEffect, useRef, useState } from "react";
import { Flame, Heart, Share2, Snowflake, Sparkles, X } from "lucide-react";
import type { Recipe, Temperature } from "../types";
import { CATEGORY_STYLES } from "../data/categories";
import { getRecipeShareUrl } from "../lib/recipeLinks";
import { RecipeBackdrop } from "./RecipeBackdrop";

interface RecipeModalProps {
  recipe: Recipe;
  temperature: Temperature;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (recipeId: string) => void;
  onTemperatureChange: (temperature: Temperature) => void;
}

type ShareStatus = "idle" | "copied" | "shared" | "error";

function copyText(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export function RecipeModal({
  recipe,
  temperature,
  isFavorite,
  onClose,
  onToggleFavorite,
  onTemperatureChange,
}: RecipeModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [from, to] = CATEGORY_STYLES[recipe.category].accent;
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");
  const build = temperature === "Iced" ? recipe.iced : recipe.hot;

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const handleShare = async () => {
    const url = getRecipeShareUrl(
      recipe.id,
      temperature,
      window.location.origin,
      window.location.pathname,
    );
    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(url);
          setShareStatus("copied");
          return;
        } catch {
          // Fall through to the native share sheet or a synchronous copy fallback.
        }
      }

      if ("share" in navigator && typeof navigator.share === "function") {
        await navigator.share({
          title: `${recipe.name} · Brewline`,
          text: `${recipe.name}, ${temperature} recipe from Brewline`,
          url,
        });
        setShareStatus("shared");
        return;
      }

      setShareStatus(copyText(url) ? "copied" : "error");
    } catch (error) {
      if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
        return;
      }
      setShareStatus("error");
    }
  };

  const selectTemperature = (nextTemperature: Temperature) => {
    setShareStatus("idle");
    onTemperatureChange(nextTemperature);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-950/50 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-modal-title"
        aria-describedby="recipe-modal-description"
        className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-3xl bg-cream-50 shadow-2xl"
      >
        <div className="relative flex items-start justify-between gap-4 overflow-hidden rounded-t-3xl bg-espresso-950 p-6 text-cream-50">
          <RecipeBackdrop
            recipeId={recipe.id}
            temperature={temperature}
            accent={[from, to]}
            surface="modal"
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-cream-50/80">
              <span>{recipe.number}</span>
              <span aria-hidden="true">·</span>
              <span>{recipe.category}</span>
            </div>
            <h2 id="recipe-modal-title" className="font-display mt-2 text-2xl font-semibold">
              {recipe.name}
            </h2>
            <p id="recipe-modal-description" className="mt-1 text-xs text-cream-50/70">
              {temperature} build details
            </p>
          </div>
          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(recipe.id)}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? `Remove ${recipe.name} from saved recipes` : `Save ${recipe.name}`}
              className="rounded-full bg-cream-50/15 p-2 transition hover:bg-cream-50/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50"
            >
              <Heart aria-hidden="true" className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close recipe"
              className="rounded-full bg-cream-50/15 p-2 transition hover:bg-cream-50/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-espresso-900">
              Build
            </h3>
            <div
              role="group"
              aria-label="Recipe temperature"
              className="flex shrink-0 items-center gap-0.5 rounded-full bg-espresso-900/8 p-0.5 text-[11px] font-semibold uppercase tracking-wide text-espresso-600"
            >
              <button
                type="button"
                onClick={() => selectTemperature("Hot")}
                aria-pressed={temperature === "Hot"}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
                  temperature === "Hot" ? "bg-espresso-900 text-cream-50" : ""
                }`}
              >
                <Flame aria-hidden="true" className="h-3 w-3" />
                Hot
              </button>
              <button
                type="button"
                onClick={() => selectTemperature("Iced")}
                aria-pressed={temperature === "Iced"}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
                  temperature === "Iced" ? "bg-espresso-900 text-cream-50" : ""
                }`}
              >
                <Snowflake aria-hidden="true" className="h-3 w-3" />
                Iced
              </button>
            </div>
          </div>

          <ul className="mt-3 space-y-2.5 text-sm text-espresso-700">
            {build.ingredients.map((ing) => (
              <li key={ing.name} className="flex items-baseline gap-2">
                <span>{ing.name}</span>
                <span className="flex-1 border-b border-dotted border-espresso-900/15" />
                <span className="font-medium text-espresso-900">{ing.amount}</span>
              </li>
            ))}
          </ul>

          {build.note && (
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-espresso-950/5 p-3 text-sm text-espresso-700">
              <Sparkles aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-espresso-500" />
              <span>{build.note}</span>
            </div>
          )}

          {build.allergens.length > 0 && (
            <div className="mt-5 rounded-xl border border-espresso-900/10 bg-cream-100 p-3 text-sm text-espresso-700">
              <p className="font-semibold text-espresso-900">Allergen note</p>
              <p className="mt-1">Contains: {build.allergens.join(", ")}.</p>
              <p className="mt-1 text-xs text-espresso-600">
                Check packaged ingredient labels for your specific products.
              </p>
            </div>
          )}

          {build.substitutions.length > 0 && (
            <div className="mt-4 rounded-xl border border-espresso-900/10 p-3 text-sm text-espresso-700">
              <p className="font-semibold text-espresso-900">Possible swaps</p>
              <ul className="mt-2 space-y-1.5">
                {build.substitutions.map(({ ingredient, alternatives }) => (
                  <li key={ingredient}>
                    <span className="font-medium">{ingredient}:</span> {alternatives.join(" or ")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleShare()}
              className="inline-flex items-center gap-2 rounded-full bg-espresso-900 px-4 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-espresso-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
            >
              <Share2 aria-hidden="true" className="h-4 w-4" />
              Share recipe
            </button>
            <span className="text-xs text-espresso-600" role="status" aria-live="polite">
              {shareStatus === "copied" && "Link copied"}
              {shareStatus === "shared" && "Share sheet opened"}
              {shareStatus === "error" && "Could not copy the link"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
