import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchItem, decrementStock } from "@/features/items/itemsSlice";
import {
  fetchReviews,
  destroyReview,
  selectReviewsForItem,
} from "@/features/reviews/reviewsSlice";
import { addCartItem, updateCartItem } from "@/features/cart/cartSlice";
import ReadOnlyStarRating from "@/components/StarRating/ReadableStarRating";
import ReviewStarRating from "@/components/StarRating/ReviewStarRating";
import OnlyStars from "@/components/StarRating/OnlyStars";
import NavBar from "@/components/NavBar/NavBar";
import Spinner from "@/components/Spinner";

const ItemShow = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const session = useAppSelector((s) => s.session);
  const cart = useAppSelector((s) => s.cart);
  const item = useAppSelector((s) => s.items[Number(itemId)]);
  const reviews = useAppSelector(selectReviewsForItem(item ? item.id : -1));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Place Your Order");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchItem(Number(itemId)));
    dispatch(fetchReviews());
  }, [dispatch, itemId]);

  if (!item) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen w-full bg-amz-bg">
          <Spinner label="Loading product" />
        </div>
      </>
    );
  }

  const totalRatings = reviews.length;
  const itemRatings = reviews.reduce(
    (total, [, review]) => total + review.ratings,
    0
  );
  const averageRating =
    totalRatings > 0 ? Math.ceil((itemRatings / totalRatings) * 10) / 10 : 0;

  const updateQuantity = (quantity: number) => {
    setSelectedQuantity(quantity);
    setIsDropdownOpen(false);
  };

  const addToCart = () => {
    if (!session.user) {
      navigate("/signin");
      return;
    }

    const existing = Object.values(cart).find((ci) => ci.item_id === item.id);

    if (existing) {
      dispatch(
        updateCartItem({
          ...existing,
          quantity: existing.quantity + selectedQuantity,
        })
      );
    } else {
      dispatch(
        addCartItem({
          quantity: selectedQuantity,
          description: item.description,
          item_id: item.id,
          user_id: session.user.id,
          name: item.name,
          cost: item.cost,
          image_url: item.imageUrl ?? "",
        })
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePlaceOrder = () => {
    if (orderStatus !== "Place Your Order") return;

    dispatch(decrementStock(item, selectedQuantity));
    setOrderStatus("Processing");

    setTimeout(() => {
      setOrderStatus("On its way!");
      setTimeout(() => {
        setOrderStatus("Order Placed!");
      }, 2000);
      setTimeout(() => {
        setOrderStatus("Place Your Order");
      }, 4000);
    }, 2000);

    dispatch(fetchItem(item.id));
  };

  const writeReview = () => {
    if (!session.user) {
      navigate("/signin");
      return;
    }
    navigate(`/items/${itemId}/review`, { state: { item } });
  };

  const editingReview = (id: string, review: (typeof reviews)[number][1]) => {
    navigate(`/items/${itemId}/editreview`, {
      state: { key: Number(id), review, item },
    });
  };

  const deletingReview = (id: string) => {
    dispatch(destroyReview(Number(id)));
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-amz-bg pb-10">
        <div className="mx-auto w-full max-w-375 px-3 sm:px-4">
          <div className="mt-4 rounded-lg bg-white p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)_20rem] lg:grid-rows-[auto_1fr] lg:items-start">
              <div className="w-full lg:col-start-1 lg:row-start-1 lg:row-span-2">
                {item.imageUrl && (
                  <img
                    className="aspect-square w-full bg-white object-contain"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                )}
              </div>

              <div className="min-w-0 lg:col-start-2 lg:row-start-1">
                <div className="text-xs text-amz-link hover:text-amz-link-hover">
                  {item.category || "Unknown Category"}
                </div>
                <h1 className="mt-1 text-xl font-medium md:text-2xl">
                  {item.name || "Unknown Name"}
                </h1>
                <div className="mt-2">
                  <ReviewStarRating
                    rating={averageRating}
                    totalRatings={totalRatings}
                  />
                </div>
              </div>

              <div className="min-w-0 lg:col-start-2 lg:row-start-2">
                <hr className="border-amz-border" />
                <h2 className="mt-4 text-lg font-bold md:text-xl">
                  About this item
                </h2>
                <p className="mt-2 text-sm text-amz-ink md:text-base">
                  {item.description || "Unknown Description"}
                </p>
              </div>

              <div className="w-full rounded-lg border border-amz-border p-4 lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:max-w-xs">
                <div className="text-2xl font-medium text-amz-price md:text-3xl">
                  ${item.cost || "Unknown Cost"}
                </div>

                <div className="mt-4 text-lg font-medium">
                  {item.stock > 0 ? (
                    <span className="text-amz-success">
                      In Stock {item.stock} left
                    </span>
                  ) : (
                    <span className="text-amz-price">Out of Stock</span>
                  )}
                </div>

                <div className="relative mt-4 inline-block">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full border border-amz-border bg-white px-4 py-2 text-sm shadow-sm select-none"
                    onClick={() => setIsDropdownOpen((open) => !open)}
                  >
                    Qty: <span className="font-medium">{selectedQuantity}</span>
                    <span className="ml-1 text-amz-muted">&#9662;</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full z-20 mt-1 w-24 rounded-md border border-amz-border bg-white shadow-lg">
                      {[...Array(10).keys()].map((i) => (
                        <button
                          key={i}
                          type="button"
                          className="block w-full px-4 py-2 text-center text-sm hover:bg-amz-bg"
                          onClick={() => updateQuantity(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {item.stock > 0 && (
                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      className="w-full rounded-full bg-amz-cart py-2 px-4 text-sm font-medium text-amz-ink hover:bg-amz-cart-hover disabled:opacity-60"
                      onClick={addToCart}
                      disabled={item.stock <= 0}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="w-full rounded-full bg-amz-buynow py-2 px-4 text-sm font-medium text-amz-ink hover:bg-amz-buynow-hover disabled:opacity-60"
                      onClick={openModal}
                      disabled={item.stock <= 0}
                    >
                      Buy Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-medium">
                      Buy now: {item.name}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="cursor-pointer text-xl text-amz-muted hover:text-amz-ink"
                    >
                      &times;
                    </button>
                  </div>
                  <p className="mb-5 text-base">
                    Total:{" "}
                    <span className="font-medium text-amz-price">
                      ${item.cost * selectedQuantity}
                    </span>
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="rounded-full bg-amz-cart py-2 px-6 text-sm font-medium text-amz-ink hover:bg-amz-cart-hover"
                      onClick={handlePlaceOrder}
                    >
                      {orderStatus}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-lg bg-white p-4 sm:p-6">
            <h2 className="text-lg font-bold md:text-xl">Customer reviews</h2>

            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:gap-10">
              <div className="w-full lg:max-w-sm">
                <ReadOnlyStarRating rating={averageRating} />
                <div className="mt-2 text-sm text-amz-muted">
                  {totalRatings} global ratings
                </div>

                <hr className="mt-4 border-amz-border" />

                <div className="mt-4">
                  <div className="text-base font-bold">Review this product</div>
                  <div className="mt-1 text-sm text-amz-muted">
                    Share your thoughts with other customers
                  </div>
                  <button
                    type="button"
                    className="mt-3 w-full rounded-full border border-amz-border bg-white py-2 px-4 text-sm shadow-sm hover:bg-amz-bg"
                    onClick={writeReview}
                  >
                    Write a customer review
                  </button>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                {reviews.length === 0 ? (
                  <div className="text-sm text-amz-muted">No reviews yet.</div>
                ) : (
                  <div className="flex flex-col divide-y divide-amz-border">
                    {reviews.map(([id, review]) => (
                      <div key={id} className="py-4 first:pt-0">
                        <div className="text-sm font-medium">
                          {review.author}
                        </div>
                        <div className="mt-1">
                          <OnlyStars rating={review.ratings} />
                        </div>
                        <p className="mt-2 text-sm text-amz-ink md:text-base">
                          {review.body}
                        </p>
                        {session.user &&
                          session.user.username === review.author && (
                            <div className="mt-2 flex gap-4 text-sm text-amz-link">
                              <button
                                type="button"
                                className="hover:text-amz-link-hover hover:underline"
                                onClick={() => editingReview(id, review)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="hover:text-amz-link-hover hover:underline"
                                onClick={() => deletingReview(id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemShow;
