export const RECEIVE_ITEMS = 'cart/RECEIVE_ITEMS';
export const RECEIVE_ITEM = 'cart/RECEIVE_ITEM';
export const REMOVE_ITEMS = 'cart/REMOVE_ITEMS';
export const REMOVE_ITEM = 'cart/REMOVE_ITEM';

export const receiveItem = (item) => ({
  type: RECEIVE_ITEM,
  payload: item,
});

export const receiveItems = (items) => ({
  type: RECEIVE_ITEMS,
  payload: items,
});

export const removeItem = (itemId) => ({
  type: REMOVE_ITEM,
  payload: itemId,
});

export const removeItems = (itemIds) => ({
  type: REMOVE_ITEMS,
  payload: itemIds,
});

const cartItemsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case RECEIVE_ITEMS:
      return { ...state, cartItems: action.payload};
    case RECEIVE_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload]};
    case REMOVE_ITEMS:
      return {...state, cartItems: state.cartItems.filter((item) => !action.payload.includes(item.id))};
    case REMOVE_ITEM:
      return {...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload)};
    default:
      return state;
  }
};

export default cartItemsReducer;