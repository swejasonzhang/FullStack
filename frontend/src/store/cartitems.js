import csrfFetch from "./csrf";

export const RECEIVE_CART_ITEM = 'cart_items/RECEIVE_CART_ITEM';
export const REMOVE_CART_ITEMS = 'cart_items/REMOVE_CART_ITEMS';
export const REMOVE_CART_ITEM = 'cart_items/REMOVE_CART_ITEM';
export const UPDATE_CART_ITEM = 'cart_items/UPDATE_CART_ITEM';

export const updateCartItem = (existingCartItemIndex, updatedItem) => ({
  type: UPDATE_CART_ITEM,
  payload: {existingCartItemIndex, updatedItem }
});

export const receiveCartItem = (item) => ({
  type: RECEIVE_CART_ITEM,
  payload: item
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
    dispatch(receiveCartItem(cartItems));
  } else {
    console.error('Failed to fetch cart items:', res.statusText);
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

export const updatingCartItem = (existingCartItemIndex, updatedCartItem) => async(dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${existingCartItemIndex}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedCartItem)
  })

  if (res.ok) {
    dispatch(updateCartItem(existingCartItemIndex, updatedCartItem));
  }
}

export const selectCartQuantity = (state) => {
  return state?.reduce((total, item) => total + item.quantity, 0) || 0;
};

const cartItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CART_ITEM:
      if (Object.keys(action.payload).length === 0) return {};     
      const item = action.payload;
      const newItem = Object.values(item)[0]
      const { item_id } = newItem

      return {...state, [item_id]: newItem};
    case UPDATE_CART_ITEM:
      const { existingCartItemIndex, updatedCartItem} = action.payload;
      return {...state, [existingCartItemIndex]: updatedCartItem}
    case REMOVE_CART_ITEM:
      const deleteId = action.payload;
      const newState = { ...state };
      delete newState[deleteId];
      return newState;
    case REMOVE_CART_ITEMS:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};


export default cartItemsReducer;