import csrfFetch from "./csrf";

const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: reviews,
});

const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: error,
});

export const fetchReviews = (itemId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${itemId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
    dispatch(fetchReviewsSuccess(data));
  } catch (error) {
    dispatch(fetchReviewsFailure(error.message));
  }
};

const reviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reviewsReducer;