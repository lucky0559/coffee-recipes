export type Category = "Sweet" | "Savory" | "Matcha" | "Classic";

export interface Ingredient {
  name: string;
  amount: string;
}

export type Temperature = "Hot" | "Iced";

export interface RecipeBuild {
  ingredients: Ingredient[];
  note?: string;
}

export interface Recipe {
  id: string;
  number: string;
  name: string;
  category: Category;
  hot: RecipeBuild;
  iced: RecipeBuild;
}
