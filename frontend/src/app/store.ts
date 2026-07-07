import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "@/features/session/sessionSlice";
import itemsReducer from "@/features/items/itemsSlice";
import cartReducer from "@/features/cart/cartSlice";
import reviewsReducer from "@/features/reviews/reviewsSlice";
import navReducer from "@/features/nav/navSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    items: itemsReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
    nav: navReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
