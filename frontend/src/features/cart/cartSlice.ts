import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { CartItem, CartItemsById } from "@/types";
import { csrfFetch } from "@/lib/csrf";

const initialState: CartItemsById = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    receiveCartItems(state, action: PayloadAction<CartItemsById>) {
      return { ...state, ...action.payload };
    },
    receiveCartItem(state, action: PayloadAction<CartItem>) {
      state[action.payload.item_id] = action.payload;
    },
    removeCartItemFromState(state, action: PayloadAction<number>) {
      delete state[action.payload];
    },
    removeCartItemsFromState(state, action: PayloadAction<number[]>) {
      for (const id of action.payload) delete state[id];
    },
  },
});

export const {
  receiveCartItems,
  receiveCartItem,
  removeCartItemFromState,
  removeCartItemsFromState,
} = cartSlice.actions;

export const selectCartItems = (state: RootState): CartItem[] =>
  Object.values(state.cart);

export const selectCartCount = (state: RootState): number =>
  Object.values(state.cart).reduce((total, item) => total + item.quantity, 0);

export const fetchCartItems =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch("/api/cart_items");
    if (res.ok) {
      const cartItems: CartItemsById = await res.json();
      dispatch(receiveCartItems(cartItems));
    }
  };

export const addCartItem =
  (cartItem: Omit<CartItem, "id">) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch("/api/cart_items", {
      method: "POST",
      body: JSON.stringify(cartItem),
    });
    if (res.ok) {
      const created: CartItem = await res.json();
      dispatch(receiveCartItem({ ...cartItem, ...created }));
    }
  };

export const updateCartItem =
  (cartItem: CartItem) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch(`/api/cart_items/${cartItem.item_id}`, {
      method: "PATCH",
      body: JSON.stringify(cartItem),
    });
    if (res.ok) {
      dispatch(receiveCartItem(cartItem));
    }
  };

export const deleteCartItem =
  (itemId: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch(`/api/cart_items/${itemId}`, {
      method: "DELETE",
      body: JSON.stringify({ itemId }),
    });
    if (res.ok) {
      dispatch(removeCartItemFromState(itemId));
    }
  };

export const deleteCartItems =
  (itemIds: number[]) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch(`/api/cart_items/${itemIds}`, {
      method: "DELETE",
      body: JSON.stringify({ itemIds }),
    });
    if (res.ok) {
      dispatch(removeCartItemsFromState(itemIds));
    }
  };

export const checkout =
  (itemIds: number[]) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const { cart, items } = getState();

    await Promise.all(
      itemIds.map(async (id) => {
        const cartItem = cart[id];
        const item = items[id];
        if (!cartItem || !item) return;
        await csrfFetch(`/api/items/${item.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            item: { stock: item.stock },
            quantity: cartItem.quantity,
          }),
        });
      })
    );

    await dispatch(deleteCartItems(itemIds));
  };

export default cartSlice.reducer;
