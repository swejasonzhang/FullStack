export const RECEIVE_TERM = 'nav_bar/RECEIVE_TERM'
export const UPDATE_TERM = 'nav_bar/UPDATE_TERM'

export const updateTerm = (newTerm) => ({
    type: UPDATE_TERM,
    payload: newTerm
});

export const receiveTerm = (term) => ({
    type: RECEIVE_TERM,
    payload: term
})

const termReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TERM:
            const updatedTerm = action.payload;
            return {...state, updatedTerm};
        case RECEIVE_TERM:
            const receivedTerm = action.payload;
            return {...state, receivedTerm}
        default:
            return state;
    }
}

export default termReducer;