import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { Item, ItemsById } from "@/types";
import { csrfFetch } from "@/lib/csrf";

const initialState: ItemsById = {};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    receiveItems(_state, action: PayloadAction<ItemsById>) {
      return { ...action.payload };
    },
    receiveItem(state, action: PayloadAction<Item>) {
      state[action.payload.id] = action.payload;
    },
  },
});

export const { receiveItems, receiveItem } = itemsSlice.actions;

export const selectItems = (state: RootState): Item[] =>
  Object.values(state.items);

export const selectItem =
  (itemId: number) =>
  (state: RootState): Item | undefined =>
    state.items[itemId];

export const fetchItems =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await fetch("/api/items");
    if (!res.ok) throw new Error("Failed to load items");
    const items: ItemsById = await res.json();
    dispatch(receiveItems(items));
  };

export const fetchItem =
  (itemId: number | string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch(`/api/items/${itemId}`);
    if (res.ok) {
      const data: { item: Item } = await res.json();
      dispatch(receiveItem(data.item));
    }
  };

export const decrementStock =
  (item: Item, quantity: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch(`/api/items/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        item: { stock: item.stock },
        quantity,
      }),
    });
    if (res.ok) {
      dispatch(receiveItem({ ...item, stock: item.stock - quantity }));
    }
  };

export default itemsSlice.reducer;
