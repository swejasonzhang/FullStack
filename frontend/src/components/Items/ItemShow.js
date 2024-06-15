import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import './ItemShow.css';
import { fetchReviews } from "../../store/itemReviews.js";
import { getItem, fetchItem } from '../../store/item.js';
import { addingCartItem, updatingCartItem } from "../../store/cartitems.js";
import ReadOnlyStarRating from "../StarRating/ReadableStarRating.js";
import ReviewStarRating from "../StarRating/ReviewStarRating.js";
import OnlyStars from "../StarRating/OnlyStars.js";
import { removeReview } from "../../store/itemReviews.js";
import { removeQuantity } from "../../store/item.js";
import NavBar from '../NavBar/NavBar.js';

const ItemShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector(state => state.session);
  const { itemId } = useParams();
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Place Your Order");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchItem(itemId));
    dispatch(fetchReviews())
  }, [dispatch, itemId]);

  const item = useSelector((state) => state.items[itemId]);
  const cartItems = useSelector(state => state.cartItems);
  const allReviews = useSelector(state => state.reviews);

  useEffect(() => {
    const totalQuantity = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cartItems]);

  if (!item) return null;

  const filteredReviews = Object.entries(allReviews).length > 0
  ? Object.entries(allReviews)
      .filter(([key, review]) => review && review.itemId === item.id)
      .reduce((obj, [key, review]) => {
        obj[key] = review;
        return obj;
      }, {})
  : {};

  const filteredReviewsArray = Object.values(filteredReviews);
  const itemRatings = filteredReviewsArray.reduce((total, review) => total + review.ratings, 0);
  const totalRatings = filteredReviewsArray.length;
  const averageRating = totalRatings > 0 ? Math.ceil((itemRatings / totalRatings) * 10) / 10 : 0;

  const toggleDropdown = () => {
    const dropdown = document.querySelector('.showitemdropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  };

  const updateQuantity = (quantity) => {
    setSelectedQuantity(quantity);
    const dropdown = document.querySelector('.showitemdropdown');
    if (dropdown) {
      dropdown.classList.remove('active');
    }
    const qtyTextElement = document.getElementById('selectedQuantity');
    if (qtyTextElement) {
      qtyTextElement.textContent = quantity;
    }
  };

  const addToCart = () => {
    if (!session.user) {
      history.push('/login');
      return;
    }

    const itemDetails = item;
    const existingCartItemKey = Object.keys(cartItems).find(key => cartItems[key].item_id === itemDetails.id);

    if (existingCartItemKey !== undefined) {
      const updatedCartItem = {
        ...cartItems[existingCartItemKey],
        quantity: cartItems[existingCartItemKey].quantity + selectedQuantity
      };
      dispatch(updatingCartItem(existingCartItemKey, updatedCartItem));
    } else {
      const cartItem = {
        quantity: selectedQuantity,
        description: itemDetails.description,
        item_id: itemDetails.id,
        user_id: session.user.id,
        name: itemDetails.name,
        cost: itemDetails.cost,
        image_url: itemDetails.imageUrl,
      };
      dispatch(addingCartItem(itemDetails.id, cartItem));
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("amazeonmodalopen");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("amazeonmodalopen");
  };

  const handlePlaceOrder = (item, selectedQuantity) => {
    if (isOrderPlaced) return;

    dispatch(removeQuantity(item, selectedQuantity));
    setOrderStatus("Processing");

    setTimeout(() => {
      setOrderStatus("On its way!");
      setTimeout(() => {
        setOrderStatus("Order Placed!");
      }, 2000);
      setTimeout(() => {
        setOrderStatus("Place Your Order");
      }, 4000);
    }, 2000);

    dispatch(fetchItem(item.id));
  };

  const Modal = ({ closeModal, item, selectedQuantity, handlePlaceOrder }) => {
    return (
      <div className="amazeonmodal">
        <div className="amazeonmodalcontent">
          <div className="amazeonmodalheader">
            <h2>Buy now: {item.name}</h2>
            <button onClick={closeModal} className="amazeonmodalclosebutton">
              &times;
            </button>
          </div>
          <div className="amazeonmodalbody">
            <p>Total: ${item.cost * selectedQuantity}</p>
          </div>
          <div className="amazeonmodalfooter">
            <button className="amazeonmodalorderbutton" onClick={() => handlePlaceOrder(item, selectedQuantity)}>
              {orderStatus}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const writeReview = () => {
    if (!session.user) {
      history.push('/login');
      return;
    }
    history.push({
      pathname: `/items/${itemId}/review`,
      state: { item }
    });
  };

  const editingReview = (key, review) => {
    const newKey = parseInt(key);
    history.push({
      pathname: `/items/${itemId}/editreview`,
      state: { key: newKey, review, item }
    });
  };

  const deletingReview = (key) => {
    const newKey = parseInt(key);
    dispatch(removeReview(newKey));
  };

  return (
    <>
      <NavBar />

      <div className="itemcontent">
        <div className="showitemcategory">{item.category || "Unknown Category"}</div>
        <div className="itemdetails">
          <div className="itemshowcontainer">
            {item.imageUrl && <img className="itemshowimg" src={item.imageUrl} alt={item.name} />}
          </div>
          <div className="itemspecs">
            <div className="showitemname">{item.name || "Unknown Name"}
              <ReviewStarRating rating={averageRating} totalRatings={totalRatings}></ReviewStarRating>
              <hr className="separator" />
              <div className="descriptioncontainer">About this item:
                <div className="itemdescription">{item.description || "Unknown Description"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="showitemdiv">
          <div className={`showitemcost ${item.stock <= 0 ? 'out-of-stock' : ''}`}>
            Cost: ${item.cost || "Unknown Cost"}
          </div>
          <div className={`instock ${item.stock <= 0 ? 'out-of-stock' : ''}`}>
            {item.stock > 0 ? (`In Stock ${item.stock} Left`) : (<span style={{ color: 'red' }}>Out Of Stock</span>)}
          </div>

          <div className={`showitemdropdown ${item.stock <= 0 ? 'out-of-stock' : ''}`}>
            <label className={`showdropdownbutton ${isModalOpen ? 'modalopen' : ''}`} onClick={toggleDropdown}>
              <div className="qtxcontainer">
                Qty: <span className="qtytext" id="selectedQuantity">{selectedQuantity}</span>
              </div>
            </label>
            <div className="showdropdowncontent" id="dropdownContent">
              {[...Array(10).keys()].map(i => (
                <label key={i} htmlFor={`quantity${i+1}`} onClick={() => updateQuantity(i + 1)}>{i + 1}</label>
              ))}
            </div>
          </div>

          {item.stock > 0 && (
            <>
              <button className="addtocartbutton" onClick={addToCart} disabled={item.stock <= 0}>
                Add to Cart
              </button>
              <button className="buynow" onClick={openModal} disabled={item.stock <= 0}>
                Buy Now
              </button>
            </>
          )}

          {isModalOpen && (
            <Modal closeModal={closeModal} item={item} selectedQuantity={selectedQuantity} handlePlaceOrder={handlePlaceOrder} />
          )}
        </div>
      </div>

      <hr className="reviewsseperator" />

      <div className="reviews"> Customers say
        <div className="customerreviews"> Customer reviews
          <ReadOnlyStarRating rating={averageRating}></ReadOnlyStarRating>
          <div className="totalratings">{totalRatings} global ratings</div>

          <hr className="formseperator" />

          <div className="reviewthisproduct">
            Review This Product
            <div className="sharethoughts">
              Share your thoughts with other customers
              <div className="writeareview" onClick={() => writeReview()}>Write A Customer Review</div>
            </div>
            <hr className="formseperator" />
          </div>
        </div>

        <div className="otherreviews">
          {Object.keys(filteredReviews).map((key) => (
            <div className="individual-review" key={key}>
              <div className="author">{filteredReviews[key].author}</div>
              <OnlyStars rating={filteredReviews[key].ratings}></OnlyStars> 
              <div className="reviewbody">{filteredReviews[key].body}</div>
              {session.user && (session.user.username === filteredReviews[key].author) && (
                <div className="editanddelete">
                  <div className="edit">
                    <div onClick={() => editingReview(key, filteredReviews[key])}>Edit</div>
                  </div>
                  <div className="delete"> 
                    <div onClick={() => deletingReview(key)}>Delete</div>
                  </div> 
                </div>
              )}
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemShow;