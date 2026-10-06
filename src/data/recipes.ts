import type { Recipe } from "../types";

export const recipes: Recipe[] = [
  {
    id: "cheesecake",
    number: "01",
    name: "Cheesecake",
    category: "Sweet",
    description:
      "Espresso sweetened with cheesecake syrup — rich and dessert-like, finished iced under a salted vanilla cold foam.",
    hot: {
      ingredients: [
        { name: "Cheesecake Syrup", amount: "15 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Cheesecake Syrup", amount: "20 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, sea salt pinch",
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
    description:
      "A classic caramel latte: double espresso, buttery caramel and a glossy caramel drizzle on top.",
    hot: {
      ingredients: [
        { name: "Caramel Sauce", amount: "15 ml" },
        { name: "Caramel Sauce", amount: "drizzle on top" },
        { name: "Espresso", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Caramel Syrup", amount: "20 ml" },
        { name: "Caramel Sauce", amount: "drizzle" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 10 ml, sea salt pinch",
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
    description:
      "Condensed milk and espresso with a pinch of sea salt that rounds out the sweetness.",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Sea Salt", amount: "pinch" },
        { name: "Espresso", amount: "2 shots" }
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
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, sea salt pinch",
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
    description:
      "Caramel meets a few drops of patis (fish sauce) for a surprising salty-umami twist on a caramel latte.",
    hot: {
      ingredients: [
        { name: "Caramel Sauce", amount: "10 ml" },
        { name: "Caramel Sauce", amount: "drizzle on top" },
        { name: "Patis", amount: "3 ml" },
        { name: "Espresso", amount: "2 shots" }
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
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 10 ml, patis 3 ml",
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
    description:
      "Whisked matcha lightly sweetened with palm syrup — earthy, grassy and smooth, with or without milk.",
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Palm Syrup", amount: "10 ml" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "4 g" },
        { name: "Water (for matcha powder mixture)", amount: "40 ml" },
        { name: "Milk", amount: "100 ml" },
        { name: "Palm Syrup", amount: "7 ml" }
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
    number: "06",
    name: "Gula Melaka",
    category: "Sweet",
    description:
      "An iced latte sweetened with gula melaka palm sugar syrup — deep, smoky caramel notes.",
    recommended: ["Iced"],
    iced: {
      ingredients: [
        { name: "Palm Sugar Syrup", amount: "30 ml" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] }
      ]
    }
  },
  {
    id: "spanish",
    number: "07",
    name: "Spanish",
    category: "Classic",
    description:
      "A Spanish latte: espresso and condensed milk, finished with a dusting of ground cinnamon.",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Ground Cinnamon", amount: "splash" },
        { name: "Espresso", amount: "2 shots" }
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
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "matcha-spiced",
    number: "08",
    name: "Matcha Spiced",
    category: "Matcha",
    description:
      "Matcha layered with spiced biscuit syrup for a warm, cookie-like finish.",
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
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "kape-tibuok",
    number: "09",
    name: "Kape Tibuok",
    category: "Classic",
    description:
      "Espresso and condensed milk seasoned with tibuok, the Philippines' prized ash-cured salt.",
    hot: {
      ingredients: [
        { name: "Condensed Milk", amount: "15 ml" },
        { name: "Tibuok", amount: "0.4 g" },
        { name: "Espresso", amount: "2 shots" }
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
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, 0.4 g Tibuok",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "guava-spark-espresso",
    number: "10",
    name: "Guava Spark Espresso",
    category: "Refresher",
    description:
      "A sparkling espresso soda: pink guava syrup and fizzy Sprite or tonic water topped with a double shot — fruity, bright and refreshing. A house favorite iced.",
    recommended: ["Iced"],
    iced: {
      ingredients: [
        { name: "Pink Guava Syrup", amount: "25 ml" },
        { name: "Sprite/Tonic Water", amount: "130 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    }
  },
  {
    id: "salted-caramel",
    number: "11",
    name: "Salted Caramel",
    category: "Sweet",
    description:
      "Caramel sauce and espresso lifted by a pinch of sea salt — sweet, salty and balanced.",
    recommended: ["Iced"],
    hot: {
      ingredients: [
        { name: "Sea Salt", amount: "pinch" },
        { name: "Caramel Sauce", amount: "15 ml" },
        { name: "Caramel Sauce", amount: "drizzle on top" },
        { name: "Espresso", amount: "2 shots" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Caramel Syrup", amount: "20 ml" },
        { name: "Caramel Sauce", amount: "drizzle" },
        { name: "Milk", amount: "120 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 10 ml, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "dirty-matcha",
    number: "12",
    name: "Dirty Matcha",
    category: "Matcha",
    description:
      'Palm-sweetened matcha "dirtied" with a double shot of espresso — green tea and coffee in one cup.',
    hot: {
      ingredients: [
        { name: "Matcha Powder", amount: "3 g" },
        { name: "Water (for matcha powder mixture)", amount: "30 ml" },
        { name: "Palm Syrup", amount: "20 ml" },
        { name: "Espresso", amount: "1 shot" }
      ],
      allergens: [],
      substitutions: []
    },
    iced: {
      ingredients: [
        { name: "Matcha Powder", amount: "3 g" },
        { name: "Water (for matcha powder mixture)", amount: "30 ml" },
        { name: "Milk", amount: "80 ml" },
        { name: "Espresso", amount: "1 shot" },
        { name: "Palm Syrup", amount: "10 ml" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, sea salt pinch",
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "calamansi-aerocano",
    number: "13",
    name: "Calamansi Aerocano",
    category: "Refresher",
    description:
      "A bright iced espresso refresher: calamansi and palm sugar over a double shot, crowned with a salted vanilla cold foam — citrusy, sweet and creamy.",
    iced: {
      ingredients: [
        { name: "Calamansi Extract", amount: "10 ml" },
        { name: "Palm Sugar Syrup", amount: "10 ml" },
        { name: "Water", amount: "60 ml" },
        { name: "Espresso", amount: "2 shots" }
      ],
      allergens: ["Dairy"],
      substitutions: [
        { ingredient: "Milk", alternatives: ["Oat milk", "Soy milk"] },
        { ingredient: "Whipping cream", alternatives: ["Coconut cream"] }
      ]
    }
  },
  {
    id: "biscoff",
    number: "14",
    name: "Biscoff",
    category: "Sweet",
    description:
      "Espresso blended with Biscoff spread for a caramelized cookie flavor. A house favorite iced.",
    recommended: ["Iced"],
    hot: {
      ingredients: [
        { name: "Biscoff Spread", amount: "1 spoon" },
        { name: "Vanilla Syrup", amount: "1 pump" },
        { name: "Espresso", amount: "2 shots" }
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
        { name: "Espresso", amount: "2 shots" }
      ],
      note: "Cold foam — whipping cream 30 ml, milk 15 ml, vanilla syrup 1 pump, sea salt pinch",
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
    number: "15",
    name: "Matcha Caramel",
    category: "Matcha",
    description:
      "Earthy matcha sweetened with caramel and finished with a caramel drizzle. A house favorite iced.",
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
  }
];
