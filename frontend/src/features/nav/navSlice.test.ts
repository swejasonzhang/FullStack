import { describe, it, expect } from "vitest";
import navReducer, { setCategory, setTerm } from "./navSlice";

describe("navSlice", () => {
  const initial = { category: "All Departments", term: "" };

  it("returns the initial state", () => {
    expect(navReducer(undefined, { type: "@@INIT" })).toEqual(initial);
  });

  it("sets the category", () => {
    const state = navReducer(initial, setCategory("Mouse"));
    expect(state.category).toBe("Mouse");
  });

  it("sets the search term", () => {
    const state = navReducer(initial, setTerm("logitech"));
    expect(state.term).toBe("logitech");
  });
});
