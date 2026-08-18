export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-espresso-900/10 bg-cream-50/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-xl shadow-sm" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-espresso-950">
              Brewline
            </span>
            <span className="text-xs text-espresso-600">coffee recipes, in order</span>
          </div>
        </div>
        <a
          href="#recipes"
          className="hidden rounded-full border border-espresso-900/15 px-4 py-2 text-sm font-medium text-espresso-800 transition hover:border-espresso-900/30 hover:bg-espresso-950/5 sm:inline-block"
        >
          Browse recipes
        </a>
      </div>
    </header>
  );
}
