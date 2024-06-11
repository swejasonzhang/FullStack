import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StarRating from "../StarRating/StarRating.js"
import { saveReviewAction } from '../../store/itemReviews.js';
import "./Review.css";
import NavBar from '../NavBar/NavBar.js';

const Review = (info) => {
    const history = useHistory();
    const session = useSelector(state => state.session);
    const dispatch = useDispatch();
    const item = info.location.state.item;
    const [ratings, setRatings] = useState(0);
    const [body, setBody] = useState("");
    const author = session.user ? session.user.username : "User";
    const [showErrors, setShowErrors] = useState(false);
    const [error, setError] = useState(null);

    const handleRatingChange = (newRating) => {
        setRatings(newRating);
    };

    const submitReview = async () => {
        setShowErrors(true); 
        setError(null);

        if (ratings === 0 && body.length === 0) {
            setError("s has to be greater than 0 stars! Please enter a written review!");
            return;
        }

        if (ratings === 0) {
            setError("Rating has to be greater than 0 stars!");
            return;
        }
    
        if (body.length === 0) {
            setError("Please enter a review text!");
            return;
        } 
    
        try {
            await dispatch(saveReviewAction(item.id, ratings, body, author));
            history.push(`/items/${item.id}`);
        } catch (error) {
            console.error("Failed to submit review:", error);
        }
    };

    return (
        <>
            <NavBar />

            <div className="creatingeareviewcontainer">
                <div className="createreview">Create Review
                    <br></br>
                    <div className='reviewimagecontainer'>
                        <img className="reviewimage" src={item.imageUrl} alt='reviewimagealt'></img>
                        <div className='itemreviewname'>{item.name}</div>
                    </div>

                    <hr className="reviewseperator"></hr>

                    <div className="overallrating">Overall rating
                        <StarRating initialRating={ratings} onChange={handleRatingChange} />
                    </div>

                    <hr className="reviewseperator"></hr>

                    <div className='writtenreview'>Add a written review
                        <br></br>
                        <textarea className='reviewtextarea' onChange={(e) => setBody(e.target.value)} placeholder='What did you like or dislike? What did you use the product for?'></textarea>
                        {showErrors && 
                            <div className="error">{error}</div>
                        }
                    </div>

                    <hr className="reviewseperator"></hr>

                    <div className='submitbutton' onClick={() => submitReview(item.id, ratings, body, author)}>Submit</div>
                </div>
            </div>
        </>
    );
}


export default Review;