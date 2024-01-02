import csrfFetch from "./csrf";

export const RECEIVE_ITEMS = 'items/RECEIVE_ITEMS';
export const RECEIVE_ITEM = 'items/RECEIVE_ITEM';

export const receiveItems = (items) => ({
  type: RECEIVE_ITEMS,
  items,
});

export const receiveItem = (item) => ({
  type: RECEIVE_ITEM,
  item,
});

export const getItem = (itemId) => (state) => (state?.items ? state.items[itemId] : null);
export const getItems = (state) => (state.items ? Object.values(state.items) : []);

export const fetchItems = () => async (dispatch) => {
  const res = await fetch('/api/items');

  if (res.ok) {
    const items = await res.json();
    dispatch(receiveItems(items));
  }
};

export const fetchItem = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${itemId}`);

  if (res.ok) {
    const item = await res.json();
    dispatch(receiveItem(item))
  }
};

const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ITEMS:
      return { ...action.items };
    case RECEIVE_ITEM:
      return { ...state, [action.item.item.id]: action.item.item };
    default:
      return state;
  }
};

export default itemsReducer;