import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as sessionActions from "../../store/session";
import StarRating from "../StarRating/StarRating.js"
import { saveReviewAction } from '../../store/itemReviews.js';
import "./Review.css";

const Review = (info) => {
    const history = useHistory();
    const [username, setUsername] = useState(""); 
    const session = useSelector(state => state.session);
    const dispatch = useDispatch();
    const [cartQuantity] = useState(0); 
    const cartItems = useSelector(state => state.cartItems);
    const item = info.location.state.item;
    const [ratings, setRatings] = useState(0);
    const [body, setBody] = useState("");
    const author = session.user ? session.user.username : "User";
    const [showErrors, setShowErrors] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session && session.user && session.user.username) {
          setUsername(session.user.username);
        } else {
          setUsername("User");
          history.push('/login')
        }
    }, [session, history]);

    const renderCartQuantity = () => {
        const totalQuantity = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
        const cartQuantityText = totalQuantity > 99 ? "99+" : totalQuantity;
        return cartQuantityText;
    };
    
    const redirectToHomePage = async(e) => {
        history.push("/")
    }

    const homesignout = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.push('/login');
    };

    const redirectCart = () => {
        history.push('/cart');
    };

    const cartNumberClass = cartQuantity > 99 ? "bigcartnumber" : cartQuantity >= 10 ? "mediumcartnumber" : "smallcartnumber";

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
            <div className="navbar">
                <div className="amazeonhome">
                    <img className="amazeonhomepage" src={"https://amazeon-seeds.s3.amazonaws.com/Logo+For+Home+Page.jpeg"} onClick={redirectToHomePage} alt="amazeonhomelogo" />
                </div>

                <div className="searchcontainer">
                    <div className="categoriescontainer">
                        <select className="categories">
                            <option value="AllDepartments">All Departments</option>
                            <option value="Video Games">Video Games</option>
                            <option value="Headset">Headset</option>
                            <option value="Mouse">Mouse</option>
                            <option value="Keyboard">Keyboard</option>
                            <option value="Headset">Headset</option>
                            <option value="Monitor">Monitor</option>
                            <option value="Mousepad">Mousepad</option>
                            <option value="Virtual Reality">Virtual Reality</option>
                            <option value="Monitor Stand">Monitor Stand</option>
                            <option value="Mic">Mic</option>
                            <option value="Power Strip">Power Strip</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Handheld">Handheld</option>
                            <option value="Headphones">Headphones</option>
                            <option value="Webcam">Webcam</option>
                        </select>
                    </div>
                    <input type="text" className="searchbox" placeholder="Search Amazeon" />
                    <button className="searchbutton">
                        <div className="searchbuttonicon">
                        <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </button>
                </div>

                <div className="dropdown">
                    <div className="greeting">Hello, {username}</div>
                    <button className="dropdownbutton">Account & Lists</button>
                    <div className="accountdropdowncontent">
                        <h3>Your Account</h3>
                        {session.user ? (
                        <div className="homesignoutlink">
                            <a href="/login" onClick={homesignout}>Sign Out</a>
                        </div>
                        ) : (
                        <div className="homesigninlink">
                            <a href="/signup">Sign Up</a>
                            <a href="/login">Sign In</a>
                        </div>
                        )}
                    </div>  
                </div>

                <button className="amazeoncartsection" onClick={redirectCart}>
                    <img className="amazeoncartimg" src={"https://amazeon-seeds.s3.amazonaws.com/Cart.jpg"} alt="" />
                    <div className={`cartcontainer ${cartNumberClass}`}>
                        <div className="number">{renderCartQuantity()}</div>
                        <div className="cart">
                        <h3>Cart</h3>
                        </div>
                    </div>
                </button>
            </div>

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