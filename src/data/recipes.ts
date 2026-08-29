import type { Recipe } from "../types";

export const recipes: Recipe[] = [
  {
    id: "cheesecake",
    number: "01",
    name: "Cheesecake",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Cheesecake Syrup", amount: "1½ pumps" },
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Cheesecake Syrup", amount: "1½ pumps" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "caramel",
    number: "02",
    name: "Caramel",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Caramel Syrup", amount: "15 ml" },
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, caramel syrup 15 ml",
    },
  },
  {
    id: "sea-salt",
    number: "03",
    name: "Sea Salt",
    category: "Savory",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Sea Salt", amount: "pinch" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, sea salt pinch",
    },
  },
  {
    id: "caramelized-patis",
    number: "04",
    name: "Caramelized Patis",
    category: "Savory",
    hot: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Caramel Syrup", amount: "15 ml" },
        { name: "Patis", amount: "2 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, caramel syrup 15 ml, patis 2 ml",
    },
  },
  {
    id: "matcha",
    number: "05",
    name: "Matcha",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Honey/Blue Agave", amount: "7 ml" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Honey/Blue Agave", amount: "7 ml" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "spanish",
    number: "06",
    name: "Spanish",
    category: "Classic",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "matcha-spiced",
    number: "07",
    name: "Matcha Spiced",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Honey/Blue Agave", amount: "3 ml" },
        { name: "Spiced Biscuit Syrup", amount: "15 ml" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Milk", amount: "120 ml" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, honey/blue agave 3 ml, spiced biscuit syrup 15 ml",
    },
  },
  {
    id: "kape-tibuok",
    number: "08",
    name: "Kape Tibuok",
    category: "Classic",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Tibuok", amount: "0.3 g" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, 0.3 g Tibuok",
    },
  },
  {
    id: "spanish-cinnamon",
    number: "09",
    name: "Spanish Cinnamon",
    category: "Classic",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Ground Cinnamon", amount: "splash" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, ground cinnamon splash",
    },
  },
  {
    id: "salted-caramel",
    number: "10",
    name: "Salted Caramel",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Sea Salt", amount: "pinch" },
        { name: "Caramel Syrup", amount: "15 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, caramel syrup 15 ml, sea salt pinch",
    },
  },
  {
    id: "dirty-matcha",
    number: "11",
    name: "Dirty Matcha",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Honey/Blue Agave", amount: "7 ml" },
        { name: "Espresso", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso", amount: "2 shots" },
        { name: "Honey/Blue Agave", amount: "7 ml" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "biscoff",
    number: "12",
    name: "Biscoff",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Biscoff Spread", amount: "1 spoon" },
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Biscoff Spread", amount: "1 spoon" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump",
    },
  },
  {
    id: "matcha-caramel",
    number: "13",
    name: "Matcha Caramel",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Caramel Syrup", amount: "15 ml" },
      ],
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water", amount: "40 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Caramel Syrup", amount: "15 ml" },
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump",
    },
  },
];
