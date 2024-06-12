export const RECEIVE_CATEGORY = 'nav_bar/RECEIVE_CATEGORY'
export const UPDATE_CATEGORY = 'nav_bar/UPDATE_CATEGORY'

export const updateCategory = (newCategory) => ({
    type: UPDATE_CATEGORY,
    payload: newCategory
});

export const receiveCategory = (category) => ({
    type: RECEIVE_CATEGORY,
    payload: category
})

const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY:
            const updatedCategory = action.payload;
            return {...state, updatedCategory};
        case RECEIVE_CATEGORY:
            const receivedCategory = action.payload;
            return {...state, receivedCategory}
        default:
            return state;
    }
}

export default categoryReducer;