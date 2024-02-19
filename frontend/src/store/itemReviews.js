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
    const response = await fetch(`/api/reviews/${itemId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
    dispatch(fetchReviewsSuccess(data.reviews));
  } catch (error) {
    dispatch(fetchReviewsFailure(error.message));
  }
};

const initialState = {
  reviews: [],
  error: null,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        error: null,
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;