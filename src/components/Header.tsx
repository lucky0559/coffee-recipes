import { Heart } from "lucide-react";

interface HeaderProps {
  isOnline: boolean;
  savedCount: number;
  onShowSaved: () => void;
}

export function Header({ isOnline, savedCount, onShowSaved }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-espresso-900/10 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="/" className="flex items-center gap-3" aria-label="Brewline home">
          <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-xl shadow-sm" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-espresso-950">
              Brewline
            </span>
            <span className="text-xs text-espresso-600">coffee recipes, in order</span>
          </span>
        </a>
        <nav className="flex items-center gap-2" aria-label="Primary navigation">
          <button
            type="button"
            onClick={onShowSaved}
            className="inline-flex items-center gap-2 rounded-full border border-espresso-900/15 px-3 py-2 text-sm font-medium text-espresso-800 transition hover:border-espresso-900/30 hover:bg-espresso-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
          >
            <Heart aria-hidden="true" className={`h-4 w-4 ${savedCount > 0 ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && <span aria-label={`${savedCount} saved`}>{savedCount}</span>}
          </button>
          <a
            href="#recipes"
            className="hidden rounded-full border border-espresso-900/15 px-4 py-2 text-sm font-medium text-espresso-800 transition hover:border-espresso-900/30 hover:bg-espresso-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow sm:inline-block"
          >
            Browse recipes
          </a>
          <span
            className={`hidden rounded-full px-3 py-2 text-xs font-semibold sm:inline-block ${
              isOnline
                ? "bg-cream-100 text-espresso-600"
                : "bg-amber-glow/15 text-espresso-800"
            }`}
            aria-live="polite"
          >
            {isOnline ? "Ready offline" : "Offline mode"}
          </span>
        </nav>
      </div>
    </header>
  );
}
