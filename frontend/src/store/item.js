import csrfFetch from "./csrf";

export const RECEIVE_ITEMS = 'items/RECEIVE_ITEMS';
export const RECEIVE_ITEM = 'items/RECEIVE_ITEM';
export const REMOVING_QUANTITY = 'items/REMOVING_QUANTITY'

export const receiveItems = (items) => ({
  type: RECEIVE_ITEMS,
  items,
});

export const receiveItem = (item) => ({
  type: RECEIVE_ITEM,
  item,
});

export const removingQuantity = (item, selectedQuantity) => ({
  type: 'REMOVING_QUANTITY',
  payload: { item, selectedQuantity }
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

export const removeQuantity = (item, selectedQuantity) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${item.id}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stock: item.stock - selectedQuantity,
    }),
  });

  if (res.ok) {
    const updatedItem = await res.json();
    dispatch(removingQuantity(updatedItem, selectedQuantity));
  }
};

const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ITEMS:
      return { ...action.items };
    case RECEIVE_ITEM:
      return { ...state, [action.item.item.id]: action.item.item };
    case REMOVING_QUANTITY: {
      const { item, selectedQuantity } = action.payload; 
      const updatedItem = {...item, stock: item.stock - selectedQuantity };
      return {[item.id]: updatedItem };
    }
    default:
      return state;
  }
};

export default itemsReducer;