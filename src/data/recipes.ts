import type { Recipe } from "../types";

export const recipes: Recipe[] = [
  {
    id: "cheesecake",
    number: "01",
    name: "Cheesecake",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Cheesecake Syrup", amount: "1–2 pumps" },
        { name: "Vanilla Syrup", amount: "1 pump" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, cheesecake syrup 1–2 pumps",
    },
  },
  {
    id: "caramel",
    number: "02",
    name: "Caramel",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Caramel Syrup", amount: "15 g" },
        { name: "Vanilla Syrup", amount: "1 pump" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, caramel syrup 15g",
    },
  },
  {
    id: "sea-salt",
    number: "03",
    name: "Sea Salt",
    category: "Savory",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 g" },
        { name: "Sea Salt", amount: "pinch" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 g" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, sea salt pinch",
    },
  },
  {
    id: "caramelized-patis",
    number: "04",
    name: "Caramelized Patis",
    category: "Savory",
    hot: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "½ pump" },
        { name: "Caramel Syrup", amount: "15 g" },
        { name: "Patis", amount: "2 g" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "½ pump" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, caramel syrup 15g, patis 2g",
    },
  },
  {
    id: "matcha",
    number: "05",
    name: "Matcha",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "5 g" },
        { name: "Water", amount: "50 g" },
        { name: "Vanilla Syrup", amount: "1 pump" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "5 g" },
        { name: "Water", amount: "50 g" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "spanish",
    number: "06",
    name: "Spanish",
    category: "Classic",
    hot: {
      ingredients: [{ name: "Condensed Milk", amount: "15 g" }],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 g" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "matcha-spiced",
    number: "07",
    name: "Matcha Spiced",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "5 g" },
        { name: "Water", amount: "50 g" },
        { name: "Honey", amount: "5 g" },
        { name: "Spiced Biscuit Syrup", amount: "15 g" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "5 g" },
        { name: "Water", amount: "50 g" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, honey 5g, spiced biscuit syrup 15g",
    },
  },
  {
    id: "kape-tibuok",
    number: "08",
    name: "Kape Tibuok",
    category: "Classic",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 g" },
        { name: "Tibuok", amount: "3 g" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 g" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, 3g Tibuok",
    },
  },
  {
    id: "spanish-cinnamon",
    number: "09",
    name: "Spanish Cinnamon",
    category: "Classic",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 g" },
        { name: "Ground Cinnamon", amount: "splash" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 g" },
        { name: "Ground Cinnamon", amount: "splash" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "salted-caramel",
    number: "10",
    name: "Salted Caramel",
    category: "Sweet",
    isNew: true,
    hot: {
      ingredients: [
        { name: "Sea Salt", amount: "pinch" },
        { name: "Caramel Syrup", amount: "15 g" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Sea Salt", amount: "pinch" },
        { name: "Milk", amount: "150 ml" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, caramel syrup 15g",
    },
  },
  {
    id: "dirty-matcha",
    number: "11",
    name: "Dirty Matcha",
    category: "Matcha",
    isNew: true,
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "5 g" },
        { name: "Water", amount: "50 g" },
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Espresso", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "5 g" },
        { name: "Water", amount: "50 g" },
        { name: "Milk", amount: "150 ml" },
        { name: "Espresso", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30ml, milk 10ml, vanilla syrup 1 pump",
    },
  },
];
