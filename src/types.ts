export type Category = "Sweet" | "Savory" | "Matcha" | "Classic";

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  number: string;
  name: string;
  category: Category;
  ingredients: Ingredient[];
  note?: string;
  isNew?: boolean;
}
