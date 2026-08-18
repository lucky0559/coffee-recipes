import type { Category } from "../types";

export const CATEGORY_STYLES: Record<Category, { accent: [string, string]; pill: string }> = {
  Sweet: { accent: ["#7a3b2e", "#d1793f"], pill: "#8a4130" },
  Savory: { accent: ["#2f4356", "#6f8fa8"], pill: "#3a5065" },
  Matcha: { accent: ["#38431f", "#8a9a5b"], pill: "#4b5a2c" },
  Classic: { accent: ["#3d2a1c", "#a87a3d"], pill: "#533a26" },
};
