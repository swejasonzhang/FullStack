import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchCartItems,
  deleteCartItem,
  updateCartItem,
  checkout,
  selectCartItems,
} from "@/features/cart/cartSlice";
import { fetchItems } from "@/features/items/itemsSlice";
import NavBar from "@/components/NavBar/NavBar";
import type { CartItem } from "@/types";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  useAppSelector((s) => s.items);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [checkoutStatus, setCheckoutStatus] = useState("Proceed To Checkout");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchItems());
  }, [dispatch]);

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.item_id)
  );

  const calculateSelectedItemsCost = () =>
    selectedCartItems
      .reduce((total, item) => total + item.quantity * item.cost, 0)
      .toFixed(2);

  const calculateTotalQuantity = () =>
    selectedCartItems.reduce((total, item) => total + item.quantity, 0);

  const deletingCartItem = (itemId: number) => {
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    dispatch(deleteCartItem(itemId));
  };

  const updateQuantity = (cartItem: CartItem, quantity: number) => {
    dispatch(updateCartItem({ ...cartItem, quantity }));
    setOpenDropdown(null);
  };

  const proceedingCheckout = () => {
    dispatch(checkout(selectedItems));

    setTimeout(() => {
      setCheckoutStatus("Proceed To Checkout");
    }, 1000);

    setTimeout(() => {
      setCheckoutStatus("Order placed");
    }, 1500);

    setTimeout(() => {
      setCheckoutStatus("Packages are on its way");
    }, 2000);

    setTimeout(() => {
      setSelectedItems([]);
    }, 2500);
  };

  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const totalQuantity = calculateTotalQuantity();

  return (
    <>
      <NavBar />

      <div className="min-h-[calc(100vh-3.75rem)] w-full overflow-y-auto scroll-smooth bg-amz-bg">
        <div className="mx-auto w-full max-w-375 px-3 py-4 sm:px-4 sm:py-6">
          {cartItems.length < 1 ? (
            <div className="rounded-lg bg-white p-6 text-lg text-amz-ink md:text-2xl">
              Your Amazeon Cart is empty. Please add items to cart.
            </div>
          ) : (
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="min-w-0 flex-1 rounded-lg bg-white p-4">
                <div className="flex items-baseline justify-between">
                  <h1 className="text-xl font-medium md:text-2xl">Shopping Cart</h1>
                  <span className="text-sm text-amz-muted">Price</span>
                </div>
                <hr className="mt-3 border-amz-border" />

                {cartItems.map((item) => (
                  <div
                    key={item.item_id}
                    className="flex gap-3 border-b border-amz-border py-4 sm:gap-4"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0"
                      onChange={() => handleCheckboxChange(item.item_id)}
                      checked={selectedItems.includes(item.item_id)}
                    />

                    <div className="w-24 shrink-0 sm:w-32">
                      <img
                        className="aspect-square w-full bg-white object-contain"
                        src={item.image_url}
                        alt={item.name}
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="text-sm font-medium md:text-base line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-amz-muted line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-1 text-sm font-medium text-amz-success">
                        In Stock
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3">
                        <div className="relative">
                          <button
                            type="button"
                            className="flex items-center gap-1 rounded-full border border-amz-border bg-white px-3 py-1.5 text-sm shadow-sm select-none"
                            onClick={() =>
                              setOpenDropdown((prev) =>
                                prev === item.item_id ? null : item.item_id
                              )
                            }
                          >
                            Qty: <span className="font-medium">{item.quantity}</span>
                            <span className="ml-1 text-amz-muted">&#9662;</span>
                          </button>

                          {openDropdown === item.item_id && (
                            <div className="absolute left-0 top-full z-20 mt-1 w-20 rounded-md border border-amz-border bg-white shadow-lg">
                              {quantityOptions.map((qty) => (
                                <button
                                  key={qty}
                                  type="button"
                                  className="block w-full px-4 py-2 text-center text-sm hover:bg-amz-bg"
                                  onClick={() => updateQuantity(item, qty)}
                                >
                                  {qty}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          className="text-sm text-amz-link hover:text-amz-link-hover hover:underline"
                          onClick={() => deletingCartItem(item.item_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="shrink-0 text-lg font-bold">
                      ${item.cost?.toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="mt-4 text-right text-lg">
                  Subtotal ({totalQuantity}{" "}
                  {selectedItems.length === 1 ? "Item" : "Items"}):{" "}
                  <span className="font-bold">${calculateSelectedItemsCost()}</span>
                </div>
              </div>

              <div className="w-full rounded-lg border border-amz-border bg-white p-4 lg:sticky lg:top-4 lg:max-w-xs lg:self-start">
                {selectedItems.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-lg md:text-xl">
                      Subtotal ({totalQuantity}{" "}
                      {selectedItems.length === 1 ? "Item" : "Items"}):{" "}
                      <span className="font-bold">${calculateSelectedItemsCost()}</span>
                    </div>
                    <button
                      type="button"
                      className="w-full rounded-full bg-amz-cart py-2 px-4 text-sm font-medium text-amz-ink hover:bg-amz-cart-hover"
                      onClick={proceedingCheckout}
                    >
                      {checkoutStatus}
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-amz-muted">No items selected.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
