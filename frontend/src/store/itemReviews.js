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

export const editReview = (index, review, objectReviews) => ({
  type: EDIT_REVIEW,
  payload: { index, review, objectReviews }
});

export const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  payload: review
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

export const removeReview = (index) => async(dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${index}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error('Failed to delete review');
    }
    dispatch(deleteReview(index));
  } catch (error) {
    console.error('Error removing review:', error);
  }
}

export const saveReviewAction = (item_id, ratings, body, author, review_id) => {
  return async (dispatch) => {
    try {
      const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id, ratings, body, author, review_id }),
      });

      if (!response.ok) {
        throw new Error('Failed to save review');
      }
      dispatch(saveReviewSuccess());
    } catch (error) {
      dispatch(saveReviewFailure(error.message));
    }
  };
};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_SUCCESS:
      return { ...action.payload };
    case FETCH_REVIEWS_FAILURE:
      return { ...state, error: action.payload };
    case EDIT_REVIEW:
      const { index, review, objectReviews } = action.payload;
      const reviewsArray = Object.values(objectReviews);
      const updatedReviews = { ...state };

      if (index >= 0 && index < reviewsArray.length) {
        updatedReviews[index] = { ...review };
      } else {
        console.error('Invalid index provided');
      }
      return updatedReviews;
    case DELETE_REVIEW:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    case SAVE_REVIEW_SUCCESS:
      const newReview = action.payload;
      return {
        ...state,
        [newReview.review_id]: { ...newReview },
      };
    default:
      return state;
  }
};

export default reviewsReducer;