import { describe, expect, it } from "vitest";
import { getRecipeShareUrl, parseRecipeSelection } from "./recipeLinks";

const recipes = [{ id: "sea-salt" }, { id: "biscoff" }];

describe("recipe links", () => {
  it("parses known recipes and safely defaults invalid temperatures to Iced", () => {
    expect(parseRecipeSelection("?recipe=sea-salt&temperature=Hot", recipes)).toEqual({
      recipeId: "sea-salt",
      temperature: "Hot",
    });
    expect(parseRecipeSelection("?recipe=biscoff&temperature=warm", recipes)?.temperature).toBe(
      "Iced",
    );
    expect(parseRecipeSelection("?recipe=missing", recipes)).toBeNull();
  });

  it("creates a portable share URL", () => {
    expect(getRecipeShareUrl("sea-salt", "Iced", "https://brewline.test", "/")).toBe(
      "https://brewline.test/?recipe=sea-salt&temperature=Iced",
    );
  });
});
