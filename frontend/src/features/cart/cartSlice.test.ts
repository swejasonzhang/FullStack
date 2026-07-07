import { describe, it, expect } from "vitest";
import type { CartItem, CartItemsById } from "@/types";
import type { RootState } from "@/app/store";
import cartReducer, {
  receiveCartItems,
  receiveCartItem,
  removeCartItemFromState,
  removeCartItemsFromState,
  selectCartItems,
  selectCartCount,
} from "./cartSlice";

function makeCartItem(itemId: number, overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: itemId,
    item_id: itemId,
    user_id: 1,
    name: `Item ${itemId}`,
    cost: 10,
    description: "desc",
    image_url: "",
    quantity: 1,
    ...overrides,
  };
}

describe("cartSlice", () => {
  it("receiveCartItems merges into state", () => {
    const initial: CartItemsById = { 1: makeCartItem(1) };
    const payload: CartItemsById = { 2: makeCartItem(2) };
    const state = cartReducer(initial, receiveCartItems(payload));
    expect(state[1]).toEqual(makeCartItem(1));
    expect(state[2]).toEqual(makeCartItem(2));
  });

  it("receiveCartItem keys by item_id", () => {
    const state = cartReducer({}, receiveCartItem(makeCartItem(5)));
    expect(state[5]).toEqual(makeCartItem(5));
  });

  it("removeCartItemFromState deletes by item_id", () => {
    const initial: CartItemsById = { 1: makeCartItem(1), 2: makeCartItem(2) };
    const state = cartReducer(initial, removeCartItemFromState(1));
    expect(state[1]).toBeUndefined();
    expect(state[2]).toEqual(makeCartItem(2));
  });

  it("removeCartItemsFromState deletes several", () => {
    const initial: CartItemsById = {
      1: makeCartItem(1),
      2: makeCartItem(2),
      3: makeCartItem(3),
    };
    const state = cartReducer(initial, removeCartItemsFromState([1, 3]));
    expect(state[1]).toBeUndefined();
    expect(state[3]).toBeUndefined();
    expect(state[2]).toEqual(makeCartItem(2));
  });

  it("selectCartItems returns the values array", () => {
    const cart: CartItemsById = { 1: makeCartItem(1), 2: makeCartItem(2) };
    const rootState = { cart } as RootState;
    expect(selectCartItems(rootState)).toEqual([makeCartItem(1), makeCartItem(2)]);
  });

  it("selectCartCount sums the quantities", () => {
    const cart: CartItemsById = {
      1: makeCartItem(1, { quantity: 2 }),
      2: makeCartItem(2, { quantity: 3 }),
    };
    const rootState = { cart } as RootState;
    expect(selectCartCount(rootState)).toBe(5);
  });
});
