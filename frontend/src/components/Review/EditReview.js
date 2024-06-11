import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StarRating from "../StarRating/StarRating.js"
import { updateReview } from '../../store/itemReviews.js';
import "./EditReview.css";
import NavBar from '../NavBar/NavBar.js';

const EditReview = () => {
    const history = useHistory();
    const session = useSelector(state => state.session);
    const dispatch = useDispatch();
    const { item } = history.location.state;
    const { key } = history.location.state;
    const [ratings, setRatings] = useState(0);
    const [body, setBody] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [error, setError] = useState(null);
    const author = session.user.username;
    const itemId = item.id

    const handleRatingChange = (newRating) => {
        setRatings(newRating);
    };

    const editingReview = async () => {
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
            const newReview = { itemId, ratings, body, author }
            await dispatch(updateReview(key, newReview));
            history.push(`/items/${item.id}`);
        } catch (error) {
            console.error("Failed to submit review:", error);
        }
    };

    return (
        <>
           <NavBar />

            <div className="creatingeareviewcontainer">
                <div className="createreview">Edit Your Review
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

                    <div className='submitbutton' onClick={() => editingReview()}>Submit</div>
                </div>
            </div>
        </>
    );
}

export default EditReview;