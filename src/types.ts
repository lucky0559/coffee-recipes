export type Category = "Sweet" | "Savory" | "Matcha" | "Classic";

export interface Ingredient {
  name: string;
  amount: string;
}

export type Temperature = "Hot" | "Iced";

export type Allergen = "Dairy" | "Gluten" | "Fish";

export interface Substitution {
  ingredient: string;
  alternatives: string[];
}

export interface RecipeBuild {
  ingredients: Ingredient[];
  note?: string;
  allergens: Allergen[];
  substitutions: Substitution[];
}

export interface Recipe {
  id: string;
  number: string;
  name: string;
  category: Category;
  hot: RecipeBuild;
  iced: RecipeBuild;
}
