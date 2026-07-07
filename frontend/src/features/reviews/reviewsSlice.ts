import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { Review, ReviewsById } from "@/types";
import { csrfFetch } from "@/lib/csrf";

const initialState: ReviewsById = {};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    receiveReviews(_state, action: PayloadAction<ReviewsById>) {
      return { ...action.payload };
    },
    setReview(state, action: PayloadAction<{ id: number; review: Review }>) {
      state[action.payload.id] = action.payload.review;
    },
    removeReview(state, action: PayloadAction<number>) {
      delete state[action.payload];
    },
  },
});

export const { receiveReviews, setReview, removeReview } = reviewsSlice.actions;

export const selectReviewsForItem =
  (itemId: number) =>
  (state: RootState): Array<[string, Review]> =>
    Object.entries(state.reviews).filter(
      ([, review]) => review && review.item_id === itemId
    );

export const fetchReviews =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch("/api/reviews");
    if (res.ok) {
      const data: ReviewsById = await res.json();
      dispatch(receiveReviews(data));
    }
  };

interface NewReview {
  item_id: number;
  ratings: number;
  body: string;
  author: string;
}

export const saveReview =
  (review: NewReview) =>
  async (): Promise<void> => {
    await csrfFetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(review),
    });
  };

export const editReview =
  (id: number, updatedReview: Review) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedReview),
    });
    if (res.ok) {
      dispatch(setReview({ id, review: updatedReview }));
    }
  };

export const destroyReview =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const res = await csrfFetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (res.ok) {
      dispatch(removeReview(id));
    }
  };

export default reviewsSlice.reducer;
