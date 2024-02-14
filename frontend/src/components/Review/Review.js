import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as sessionActions from "../../store/session";
import StarRating from "../StarRating/ClickableStarRating.js"
import "./Review.css";

const Review = (info) => {
    const history = useHistory();
    const [username, setUsername] = useState(""); 
    const session = useSelector(state => state.session);
    const dispatch = useDispatch();
    const [cartQuantity] = useState(0); 
    const cartItems = useSelector(state => state.cartItems);
    const item = info.location.state.item

    useEffect(() => {
        if (session && session.user && session.user.username) {
          setUsername(session.user.username);
        } else {
          setUsername("User");
        }
    }, [session]);

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

    const submitReview = () => {
        
    }

    return (
        <>
            <div className="navbar">
                <div className="amazeonhome">
                    <img className="amazeonhomepage" src={"https://amazeon-seeds.s3.amazonaws.com/amazeonhome.jpeg"} onClick={redirectToHomePage} alt="amazeonhomelogo" />
                </div>

                <div className="searchcontainer">
                    <div className="categoriescontainer">
                        <select className="categories">
                        <option value="AllDepartments">All Departments</option>
                        <option value="AlexaSkills">Alexa Skills</option>
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
                            <a href="/login">Sign In</a>
                        </div>
                        )}
                    </div>  
                </div>

                <button className="amazeoncartsection" onClick={redirectCart}>
                    <img className="amazeoncartimg" src={"https://amazeon-seeds.s3.amazonaws.com/amazeoncart.jpeg"} alt="" />
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
                        <StarRating></StarRating>
                    </div>

                    <hr className="reviewseperator"></hr>

                    <div className='writtenreview'>Add a written review
                        <br></br>
                        <textarea className='reviewtextarea' placeholder='What did you like or dislike? What did you use the product for?'>

                        </textarea>
                    </div>

                    <hr className="reviewseperator"></hr>

                    <div className='submitbutton' onClick={submitReview}>Submit</div>
                </div>
            </div>
        </>
    );
}


export default Review;