import csrfFetch from "./csrf";

export const SAVE_REVIEW_SUCCESS = 'SAVE_REVIEW_SUCCESS';
export const SAVE_REVIEW_FAILURE = 'SAVE_REVIEW_FAILURE';

const saveReviewSuccess = () => ({
  type: SAVE_REVIEW_SUCCESS,
});
  
const saveReviewFailure = (error) => ({
  type: SAVE_REVIEW_FAILURE,
  payload: error,
});

const saveReviewAction = (itemId, rating, reviewText, author) => {
  return async (dispatch) => {
    try {
      const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, rating, reviewText, author }),
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

export default saveReviewAction;
