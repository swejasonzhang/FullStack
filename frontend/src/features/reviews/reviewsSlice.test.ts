import { describe, it, expect } from "vitest";
import type { Review, ReviewsById } from "@/types";
import type { RootState } from "@/app/store";
import reviewsReducer, {
  receiveReviews,
  setReview,
  removeReview,
  selectReviewsForItem,
} from "./reviewsSlice";

function makeReview(id: number, itemId: number, overrides: Partial<Review> = {}): Review {
  return {
    id,
    item_id: itemId,
    ratings: 5,
    body: `body ${id}`,
    author: "jason",
    ...overrides,
  };
}

describe("reviewsSlice", () => {
  it("receiveReviews replaces state", () => {
    const initial: ReviewsById = { 99: makeReview(99, 1) };
    const payload: ReviewsById = { 1: makeReview(1, 1), 2: makeReview(2, 2) };
    const state = reviewsReducer(initial, receiveReviews(payload));
    expect(state).toEqual(payload);
    expect(state[99]).toBeUndefined();
  });

  it("setReview sets a review by id", () => {
    const review = makeReview(3, 2);
    const state = reviewsReducer({}, setReview({ id: 3, review }));
    expect(state[3]).toEqual(review);
  });

  it("removeReview deletes by id", () => {
    const initial: ReviewsById = { 1: makeReview(1, 1), 2: makeReview(2, 1) };
    const state = reviewsReducer(initial, removeReview(1));
    expect(state[1]).toBeUndefined();
    expect(state[2]).toEqual(makeReview(2, 1));
  });

  it("selectReviewsForItem returns only matching reviews as pairs", () => {
    const reviews: ReviewsById = {
      1: makeReview(1, 10),
      2: makeReview(2, 20),
      3: makeReview(3, 10),
    };
    const rootState = { reviews } as RootState;
    const result = selectReviewsForItem(10)(rootState);
    expect(result).toEqual([
      ["1", makeReview(1, 10)],
      ["3", makeReview(3, 10)],
    ]);
  });
});
