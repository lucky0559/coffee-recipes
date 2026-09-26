import type { Recipe } from "../types";

export const recipes: Recipe[] = [
  {
    id: "cheesecake",
    number: "01",
    name: "Cheesecake",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Cheesecake Syrup", amount: "15 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Cheesecake Syrup", amount: "20 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "caramel",
    number: "02",
    name: "Caramel",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Caramel Sauce", amount: "15 ml" },
        { name: "Caramel Sauce", amount: "drizzle on top" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Caramel Syrup", amount: "20 ml" },
        { name: "Caramel Sauce", amount: "drizzle" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 10 ml, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
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
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: ["Dairy"],
      substitutions: [
        {
          ingredient: "Condensed Milk",
          alternatives: ["Sweetened condensed oat milk"]
        }
      ]
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "20 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "caramelized-patis",
    number: "04",
    name: "Caramelized Patis",
    category: "Savory",
    hot: {
      ingredients: [
        { name: "Caramel Sauce", amount: "10 ml" },
        { name: "Caramel Sauce", amount: "drizzle on top" },
        { name: "Patis", amount: "3 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: ["Fish"],
      substitutions: [
        { ingredient: "Patis", alternatives: ["Vegan fish sauce"] }
      ]
    },
    iced: {
      ingredients: [
        { name: "Caramel Syrup", amount: "15 ml" },
        { name: "Caramel Sauce", amount: "drizzle" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 10 ml, patis 3 ml",
      allergens: ["Dairy", "Fish"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] },
        { ingredient: "Patis", alternatives: ["Vegan fish sauce"] }
      ]
    }
  },
  {
    id: "matcha",
    number: "05",
    name: "Matcha",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Palm Syrup", amount: "7 ml" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Milk", amount: "100 ml" },
        { name: "Palm Syrup", amount: "15 ml" }
      ],
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "spanish",
    number: "06",
    name: "Spanish",
    category: "Classic",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Ground Cinnamon", amount: "splash" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: ["Dairy"],
      substitutions: [
        {
          ingredient: "Condensed Milk",
          alternatives: ["Sweetened condensed oat milk"]
        }
      ]
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Ground Cinnamon", amount: "splash on top" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "matcha-spiced",
    number: "07",
    name: "Matcha Spiced",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Palm Syrup", amount: "5 ml" },
        { name: "Spiced Biscuit Syrup", amount: "10 ml" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Milk", amount: "100 ml" },
        { name: "Palm Syrup", amount: "5 ml" },
        { name: "Spiced Biscuit Syrup", amount: "10 ml" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "kape-tibuok",
    number: "08",
    name: "Kape Tibuok",
    category: "Classic",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Tibuok", amount: "0.4 g" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: ["Dairy"],
      substitutions: [
        {
          ingredient: "Condensed Milk",
          alternatives: ["Sweetened condensed oat milk"]
        }
      ]
    },
    iced: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 1 pump, 0.4 g Tibuok",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "salted-caramel",
    number: "09",
    name: "Salted Caramel",
    category: "Sweet",
    hot: {
      ingredients: [
        { name: "Sea Salt", amount: "pinch" },
        { name: "Caramel Sauce", amount: "15 ml" },
        { name: "Caramel Sauce", amount: "drizzle on top" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Caramel Syrup", amount: "20 ml" },
        { name: "Caramel Sauce", amount: "drizzle" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 10 ml, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "dirty-matcha",
    number: "10",
    name: "Dirty Matcha",
    category: "Matcha",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Palm Syrup", amount: "20 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Milk", amount: "100 ml" },
        { name: "Espresso", amount: "2 shots" },
        { name: "Palm Syrup", amount: "20 ml" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "biscoff",
    number: "11",
    name: "Biscoff",
    category: "Sweet",
    recommended: ["Iced"],
    hot: {
      ingredients: [
        { name: "Biscoff Spread", amount: "1 spoon" },
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      allergens: ["Gluten"],
      substitutions: [
        {
          ingredient: "Biscoff Spread",
          alternatives: ["Gluten-free cookie butter"]
        }
      ]
    },
    iced: {
      ingredients: [
        { name: "Biscoff Spread", amount: "1 spoon" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy", "Gluten"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] },
        {
          ingredient: "Biscoff Spread",
          alternatives: ["Gluten-free cookie butter"]
        }
      ]
    }
  },
  {
    id: "matcha-caramel",
    number: "12",
    name: "Matcha Caramel",
    category: "Matcha",
    recommended: ["Iced"],
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Caramel Sauce", amount: "10 ml" },
        { name: "Caramel Sauce", amount: "drizzle on top" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Milk", amount: "100 ml" },
        { name: "Caramel Syrup", amount: "15 ml" },
        { name: "Caramel Sauce", amount: "drizzle" }
      ],
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "gula-melaka",
    number: "13",
    name: "Gula Melaka",
    category: "Sweet",
    recommended: ["Iced"],
    iced: {
      ingredients: [
        { name: "Palm Sugar Syrup", amount: "30 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso/Ristretto", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 10 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] }
      ]
    }
  }
];
