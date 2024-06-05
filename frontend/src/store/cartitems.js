import csrfFetch from "./csrf";

export const UPDATING_QUANTITIES = 'cart_items/UPDATING_QUANTITIES'
export const RECEIVE_CART_ITEMS = 'cart_items/RECEIVE_CART_ITEMS';
export const RECEIVE_CART_ITEM = 'cart_items/RECEIVE_CART_ITEM';
export const REMOVE_CART_ITEMS = 'cart_items/REMOVE_CART_ITEMS';
export const REMOVE_CART_ITEM = 'cart_items/REMOVE_CART_ITEM';
export const UPDATE_CART_ITEM = 'cart_items/UPDATE_CART_ITEM';
export const ADDED_CART_ITEM = 'cart_items/ADDED_CART_ITEM';

export const updateCartItem = (existingCartItemIndex, updatedItem) => ({
  type: UPDATE_CART_ITEM,
  payload: { existingCartItemIndex, updatedItem }
});

export const receiveCartItems = (items) => ({
  type: RECEIVE_CART_ITEMS,
  payload: items
})

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

export const addToCart = (cartItem) => ({
  type: RECEIVE_CART_ITEM,
  payload: cartItem
});

export const addedCartItem = (itemId, createdCartItem) => ({
  type: ADDED_CART_ITEM,
  payload: { itemId, createdCartItem }
});

export const updatingQuantities = (array) =>({
  type: UPDATING_QUANTITIES,
  payload: array
});

export const getCartItem = (itemId) => (state) => state?.[itemId] || null;

export const getCartItems = (state) => Object.values(state) || [];

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
    dispatch(receiveCartItem(createdCartItem));
  }
};

export const addingCartItem = (itemId, cartItem) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItem),
  });

  if (res.ok) {
    const createdCartItem = await res.json();
    dispatch(addedCartItem(itemId, createdCartItem));
  }
};

export const deleteCartItem = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId })
  });

  if (res.ok) {
    dispatch(removeCartItem(itemId));
  }
};

export const deleteCartItems = (itemIds) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${itemIds}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemIds })
  });

  if (res.ok) {
    dispatch(removeCartItems(itemIds));
  }
};

export const updatingCartItem = (existingCartItemIndex, updatedItem) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart_items/${existingCartItemIndex}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedItem)
  });

  if (res.ok) {
    dispatch(updateCartItem(existingCartItemIndex, updatedItem));
  }
};

export const updateQuantities = (itemsArray) => async (dispatch) => {
  if (itemsArray.length === 1) {
    const onlyItem = Object.values(itemsArray)[0]
    const itemId = onlyItem.id

    const updatedItem = {
      category: onlyItem.category,
      cost: onlyItem.cost,
      description: onlyItem.description,
      imageUrl: onlyItem.imageUrl,
      name: onlyItem.name,
      stock: onlyItem.stock
    };

    const selectedQuantity = onlyItem.quantity;

    await csrfFetch(`/api/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: updatedItem, quantity: selectedQuantity })
    });

    return dispatch(deleteCartItem(itemId))
  }

  const itemIdArray = [];

  const updatePromises = itemsArray.map(async (item) => {
    const itemId = Object.values(item)[0].id
    const itemArray = Object.values(item)[0]
    itemIdArray.push(itemId);

    const updatedItem = {
      category: itemArray.category,
      cost: itemArray.cost,
      description: itemArray.description,
      imageUrl: itemArray.imageUrl,
      name: itemArray.name,
      stock: itemArray.stock
    };

    const selectedQuantity = itemArray.quantity;

    await csrfFetch(`/api/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: updatedItem, quantity: selectedQuantity })
    });
  });

  await Promise.all(updatePromises);
  dispatch(deleteCartItems(itemIdArray));
};


export const selectCartQuantity = (state) => {
  return Object.values(state)?.reduce((total, item) => total + item.quantity, 0) || 0;
};

const cartItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CART_ITEM:
      if (Object.keys(action.payload).length === 0) return state;
      const receivedItem = action.payload;
      const receivedItemId = Object.keys(receivedItem)[0];
      return { ...state, [receivedItemId]: receivedItem[receivedItemId] };

    case RECEIVE_CART_ITEMS:
      if (!action.payload || Object.keys(action.payload).length === 0) return state;
      const receivedItems = action.payload;
      return { ...state, ...receivedItems };
    
    case ADDED_CART_ITEM:
      const { itemId, createdCartItem } = action.payload;
      return { ...state, [itemId]: createdCartItem };

    case UPDATE_CART_ITEM:
      const { existingCartItemIndex, updatedItem } = action.payload;
      return { ...state, [existingCartItemIndex]: updatedItem };

    case REMOVE_CART_ITEM:
      const deleteId = action.payload;
      const newState = { ...state };
      delete newState[deleteId];
      return newState;

    case REMOVE_CART_ITEMS:
      const itemIdsToRemove = action.payload;
      const updatedState = { ...state };
      itemIdsToRemove.forEach(id => delete updatedState[id]);
      return updatedState;
    default:
      return state;
  }
};

export default cartItemsReducer;