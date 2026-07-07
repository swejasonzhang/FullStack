import { describe, it, expect } from "vitest";
import type { Item, ItemsById } from "@/types";
import type { RootState } from "@/app/store";
import itemsReducer, {
  receiveItems,
  receiveItem,
  selectItems,
  selectItem,
} from "./itemsSlice";

function makeItem(id: number, overrides: Partial<Item> = {}): Item {
  return {
    id,
    name: `Item ${id}`,
    cost: 10,
    category: "Electronics",
    stock: 5,
    description: "desc",
    imageUrl: null,
    ...overrides,
  };
}

describe("itemsSlice", () => {
  it("receiveItems replaces state with the given map", () => {
    const initial: ItemsById = { 99: makeItem(99) };
    const payload: ItemsById = { 1: makeItem(1), 2: makeItem(2) };
    const state = itemsReducer(initial, receiveItems(payload));
    expect(state).toEqual(payload);
    expect(state[99]).toBeUndefined();
  });

  it("receiveItem adds one item by id", () => {
    const state = itemsReducer({}, receiveItem(makeItem(3)));
    expect(state[3]).toEqual(makeItem(3));
  });

  it("receiveItem updates an existing item by id", () => {
    const initial: ItemsById = { 3: makeItem(3) };
    const updated = makeItem(3, { name: "Updated", stock: 1 });
    const state = itemsReducer(initial, receiveItem(updated));
    expect(state[3]).toEqual(updated);
  });

  it("selectItems returns the values array", () => {
    const items: ItemsById = { 1: makeItem(1), 2: makeItem(2) };
    const rootState = { items } as RootState;
    expect(selectItems(rootState)).toEqual([makeItem(1), makeItem(2)]);
  });

  it("selectItem(id) returns the right item", () => {
    const items: ItemsById = { 1: makeItem(1), 2: makeItem(2) };
    const rootState = { items } as RootState;
    expect(selectItem(2)(rootState)).toEqual(makeItem(2));
    expect(selectItem(99)(rootState)).toBeUndefined();
  });
});
