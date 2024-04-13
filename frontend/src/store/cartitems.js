import csrfFetch from "./csrf";

export const RECEIVE_CART_ITEMS = 'cart_items/RECEIVE_CART_ITEMS';
export const RECEIVE_CART_ITEM = 'cart_items/RECEIVE_CART_ITEM';
export const REMOVE_CART_ITEMS = 'cart_items/REMOVE_CART_ITEMS';
export const REMOVE_CART_ITEM = 'cart_items/REMOVE_CART_ITEM';
export const UPDATE_CART_ITEM = 'cart_items/UPDATE_CART_ITEM';

export const updateCartItem = (updatedItem) => ({
  type: UPDATE_CART_ITEM,
  payload: updatedItem,
});

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
    body: JSON.stringify(cartItem),
  });

  if (res.ok) {
    const createdCartItem = await res.json();
    console.log(createdCartItem)
    dispatch(receiveCartItem(createdCartItem));
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
  const res = await csrfFetch(`/api/cart_items/${itemIds}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeCartItems(itemIds));
  }
};

export const updatingCartItem = (updatedCartItem) => async(dispatch) => {
  const res = await csrfFetch(`/api/cart_item/${updatedCartItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCartItem)
  })

  if (res.ok) {
    dispatch(updateCartItem(updatedCartItem));
  }
}

export const selectCartQuantity = (state) => {
  return state?.reduce((total, item) => total + item.quantity, 0) || 0;
};

const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CART_ITEMS:
      return action.payload;
    case RECEIVE_CART_ITEM:
      return [...state, action.payload];
    case UPDATE_CART_ITEM:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    case REMOVE_CART_ITEM:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};


export default cartItemsReducer;