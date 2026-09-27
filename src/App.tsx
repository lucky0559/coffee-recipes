import { HomePage } from "./pages/HomePage";
import { RecipePage } from "./pages/RecipePage";
import { isRecipePath } from "./lib/recipeLinks";

function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  return isRecipePath(pathname) ? <RecipePage /> : <HomePage />;
}

export default App;
