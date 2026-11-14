import { RecipePage } from "./pages/RecipePage";

// One surface: the recipe library is the home page. The old `/recipe` path still
// resolves here because every path renders the same page.
function App() {
  return <RecipePage />;
}

export default App;
