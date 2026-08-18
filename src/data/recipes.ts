import type { Recipe } from "../types";

export const recipes: Recipe[] = [
  {
    id: "cheesecake",
    number: "01",
    name: "Cheesecake",
    category: "Sweet",
    ingredients: [
      { name: "Cheesecake Syrup", amount: "1–2 pumps" },
      { name: "Vanilla Syrup", amount: "1 pump" },
    ],
  },
  {
    id: "caramel",
    number: "02",
    name: "Caramel",
    category: "Sweet",
    ingredients: [
      { name: "Caramel Syrup", amount: "15 g" },
      { name: "Vanilla Syrup", amount: "1 pump" },
    ],
  },
  {
    id: "sea-salt",
    number: "03",
    name: "Sea Salt",
    category: "Savory",
    ingredients: [
      { name: "Sea Salt", amount: "pinch" },
      { name: "Condensed Milk", amount: "15 g" },
    ],
  },
  {
    id: "caramelized-patis",
    number: "04",
    name: "Caramelized Patis",
    category: "Savory",
    ingredients: [
      { name: "Patis", amount: "2 g" },
      { name: "Caramel Syrup", amount: "15 g" },
      { name: "Vanilla Syrup", amount: "½ pump" },
    ],
  },
  {
    id: "matcha",
    number: "05",
    name: "Matcha",
    category: "Matcha",
    ingredients: [
      { name: "Matcha Powder", amount: "5 g" },
      { name: "Water", amount: "50 g" },
      { name: "Vanilla Syrup", amount: "1 pump" },
    ],
  },
  {
    id: "spanish",
    number: "06",
    name: "Spanish",
    category: "Classic",
    ingredients: [{ name: "Condensed Milk", amount: "15 g" }],
  },
  {
    id: "matcha-spiced",
    number: "07",
    name: "Matcha Spiced",
    category: "Matcha",
    ingredients: [
      { name: "Matcha Powder", amount: "5 g" },
      { name: "Water", amount: "50 g" },
      { name: "Honey", amount: "5 g" },
    ],
    note: "Cold foam — whipping cream 30ml, milk 10ml, spiced biscuit syrup 15g",
  },
  {
    id: "kape-tibuok",
    number: "08",
    name: "Kape Tibuok",
    category: "Classic",
    ingredients: [
      { name: "Condensed Milk", amount: "15 g" },
      { name: "Tibuok", amount: "3 g" },
    ],
  },
  {
    id: "spanish-cinnamon",
    number: "09",
    name: "Spanish Cinnamon",
    category: "Classic",
    ingredients: [
      { name: "Condensed Milk", amount: "15 g" },
      { name: "Ground Cinnamon", amount: "splash" },
    ],
  },
  {
    id: "salted-caramel",
    number: "10",
    name: "Salted Caramel",
    category: "Sweet",
    isNew: true,
    ingredients: [
      { name: "Caramel Syrup", amount: "15 g" },
      { name: "Vanilla Syrup", amount: "1 pump" },
      { name: "Sea Salt", amount: "pinch" },
    ],
  },
];
