import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RECIPE_PATH, isRecipePath } from "./lib/recipeLinks";

// Recipe links used to live on "/", so send old shared links to the recipe route.
if (!isRecipePath(window.location.pathname) && new URLSearchParams(window.location.search).has("recipe")) {
  const { search, hash } = window.location;
  window.history.replaceState(window.history.state, "", `${RECIPE_PATH}${search}${hash}`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((registration) => registration.update())
      .catch(() => undefined);
  });
}
