import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { editReview } from "@/features/reviews/reviewsSlice";
import NavBar from "@/components/NavBar/NavBar";
import StarRating from "@/components/StarRating/StarRating";
import type { Review, Item } from "@/types";

export default function EditReview() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { itemId } = useParams();
  const location = useLocation();
  const { key, review, item } = (location.state ?? {}) as {
    key: number;
    review: Review;
    item: Item;
  };

  const [ratings, setRatings] = useState(review.ratings);
  const [body, setBody] = useState(review.body);
  const [showErrors, setShowErrors] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editingReview = async () => {
    setShowErrors(true);
    setError(null);

    if (ratings === 0 && body.length === 0) {
      setError(
        "s has to be greater than 0 stars! Please enter a written review!"
      );
      return;
    }

    if (ratings === 0) {
      setError("Rating has to be greater than 0 stars!");
      return;
    }

    if (body.length === 0) {
      setError("Please enter a review text!");
      return;
    }

    try {
      await dispatch(editReview(key, { ...review, ratings, body }));
      navigate(`/items/${itemId}`);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen w-full bg-amz-bg font-sans">
        <div className="mx-auto w-full max-w-2xl px-4 py-6">
          <div className="mb-4 flex gap-4">
            <img
              className="aspect-3/4 w-20 shrink-0 object-contain sm:w-24"
              src={item.imageUrl ?? undefined}
              alt="reviewimagealt"
            />
            <div className="min-w-0 self-center text-sm md:text-base">
              {item.name}
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-amz-border bg-white p-4 sm:p-6">
            <h1 className="text-xl font-bold md:text-2xl">Edit Your Review</h1>

            <div>
              <div className="text-base font-medium md:text-lg">
                Overall rating
              </div>
              <StarRating initialRating={review.ratings} onChange={setRatings} />
            </div>

            <div>
              <div className="text-base font-medium md:text-lg">
                Add a written review
              </div>
              <textarea
                className="mt-2 min-h-40 w-full rounded border border-amz-border p-2 text-sm outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#f0e5c8]"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What did you like or dislike? What did you use the product for?"
              />
              {showErrors && error && (
                <div className="mt-2 text-sm font-bold text-red-600">
                  {error}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="cursor-pointer rounded-full bg-amz-cart px-6 py-2 text-sm text-black hover:bg-amz-cart-hover"
                onClick={editingReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
