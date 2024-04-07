import csrfFetch from "./csrf";

export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';
export const EDIT_REVIEW = 'EDIT_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const SAVE_REVIEW_SUCCESS = 'SAVE_REVIEW_SUCCESS';
export const SAVE_REVIEW_FAILURE = 'SAVE_REVIEW_FAILURE';


export const saveReviewSuccess = () => ({
  type: SAVE_REVIEW_SUCCESS,
});
  
export const saveReviewFailure = (error) => ({
  type: SAVE_REVIEW_FAILURE,
  payload: error
});

export const editReview = (key, review) => ({
  type: EDIT_REVIEW,
  payload: { key, review }
});

export const deleteReview = (key) => ({
  type: DELETE_REVIEW,
  payload: key
});

export const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: reviews,
});

export const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: error,
});

export const fetchReviews = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/reviews');
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
    dispatch(fetchReviewsSuccess(data));
  } catch (error) {
    dispatch(fetchReviewsFailure(error.message));
  }
};

export const removeReview = (key) => async(dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${key}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error('Failed to delete review');
    }
    dispatch(deleteReview(key));
  } catch (error) {
    console.error('Error removing review:', error);
  }
}

export const updateReview = (key, updatedReview) => async(dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${key}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedReview),
    });

    if (!res.ok) {
      throw new Error('Failed to update review');
    }

    dispatch(editReview(key, updatedReview));
  } catch(error) {
    console.error('Error updating review:', error);
  }
}

export const saveReviewAction = (item_id, ratings, body, author) => {
  return async (dispatch) => {
    try {
      const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id, ratings, body, author }),
      });

      if (!response.ok) {
        throw new Error('Failed to save review');
      }

      const data = await response.json();
      dispatch(saveReviewSuccess(data));
    } catch (error) {
      dispatch(saveReviewFailure(error.message));
    }
  };
};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_SUCCESS:
      return {...action.payload}
    case FETCH_REVIEWS_FAILURE:
      return { ...state,  error: action.payload};
    case EDIT_REVIEW:
      const { key } = action.payload;
      const { review } = action.payload;
      state[key] = review;
      return state;
    case DELETE_REVIEW:
      const deleteState = {...state};
      const deleteKey = action.payload;
      delete deleteState[deleteKey];
      return deleteState;
    default:
      return state;
  }
};

export default reviewsReducer;