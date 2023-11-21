import csrfFetch from "./csrf";

export const RECEIVE_CART_ITEMS = 'cart_items/RECEIVE_CART_ITEMS';
export const RECEIVE_CART_ITEM = 'cart_items/RECEIVE_CART_ITEM';
export const REMOVE_CART_ITEMS = 'cart_items/REMOVE_CART_ITEMS';
export const REMOVE_CART_ITEM = 'cart_items/REMOVE_CART_ITEM';

export const receiveCartItem = (item) => ({
  type: RECEIVE_CART_ITEM,
  payload: item
});

export const receiveCartItems = (items) => ({
  type: RECEIVE_CART_ITEMS,
  payload: items
});

export const removeCartItem = (itemId) => ({
  type: REMOVE_CART_ITEM,
  payload: itemId
});

export const removeCartItems = (itemIds) => ({
  type: REMOVE_CART_ITEMS,
  payload: itemIds
});

export const addToCart = (cartItem) => {
  return {
    type: RECEIVE_CART_ITEM,
    payload: { cartItem }
  };
};

export const getCartItem = (itemId) => (state) => state?.find((item) => item.item.id === itemId) || null;

export const getCartItems = (state) => state || [];

export const fetchCartItems = () => async (dispatch) => {
  const res = await csrfFetch('/api/cart_items');

  if (res.ok) {
    const cartItems = await res.json();
    dispatch(receiveCartItems(cartItems));
  }
};

export const fetchCartItem = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${itemId}`);

  if (res.ok) {
    const cartItem = await res.json();
    dispatch(receiveCartItem(cartItem));
  }
};

export const createCartItem = (cartItem) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItem)
  })
  
  if (res.ok) {
    const cartItem = await res.json();
    dispatch(addToCart(cartItem));
  }
};

export const deleteCartItem = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${itemId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeCartItem(itemId));
  }
};

export const deleteCartItems = (itemIds) => async (dispatch) => {
  const res = await csrfFetch('/api/cart_items/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemIds }),
  });

  if (res.ok) {
    dispatch(removeCartItems(itemIds));
  }
};

export const selectCartQuantity = (state) => {
  return state?.reduce((total, item) => total + item.quantity, 0) || 0;
};

const cartItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CART_ITEMS:
      return action.payload.map(({ item, quantity = 1 }) => ({ item, quantity }));
    case RECEIVE_CART_ITEM:
      // const { item, quantity } = action.payload;
      // debugger;
      return {...state, [action.payload.cartItem.id]: action.payload.cartItem};
    case REMOVE_CART_ITEMS:
      return state.filter((item) => !action.payload.includes(item.id));
    case REMOVE_CART_ITEM:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default cartItemsReducer;