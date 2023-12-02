import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './ItemShow.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getItem, fetchItem } from '../../store/item.js';
import { createCartItem } from "../../store/cartitems.js"

const ItemShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const session = useSelector(state => state.session);
  const [selectedQuantity, setSelectedQuantity] = useState(1); 
  const [cartQuantity, setCartQuantity] = useState(0); 
  const { itemId } = useParams();
  const item = useSelector(getItem(itemId)) || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Place Your Order");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const cartItems = useSelector(state => state.cartItems);

  useEffect(() => {
    if (session && session.user && session.user.username) {
      setUsername(session.user.username);
    } else {
      setUsername("User");
    }
  }, [session]);

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

  useEffect(() => {
    dispatch(fetchItem(itemId));
  }, [dispatch, itemId]);

  function toggleDropdown() {
    const dropdown = document.querySelector('.showitemdropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }
  
  document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.showitemdropdown');
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove('active');
    }
  });

  function updateQuantity(quantity) {
    setSelectedQuantity(quantity);
    const dropdown = document.querySelector('.showitemdropdown');
    dropdown.classList.remove('active');

    const qtyTextElement = document.getElementById('selectedQuantity');
    if (qtyTextElement) {
      qtyTextElement.textContent = quantity;
    }
  }

  const addToCart = () => {
    dispatch(createCartItem( { item_id: item.id, quantity: selectedQuantity }));
  };
  

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("amazeonmodalopen");
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("amazeonmodalopen");
  };

  const handlePlaceOrder = () => {
    if (isOrderPlaced) {
      return; 
    }

    setOrderStatus("Processing");

    setTimeout(() => {
      setOrderStatus("On its way!");

      setTimeout(() => {
        setOrderStatus("Order Placed!");
        setIsOrderPlaced(true);
      }, 2000);
    }, 2000);
  };

  const Modal = ({ closeModal }) => {
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
            <button className="amazeonmodalorderbutton" onClick={handlePlaceOrder}>{orderStatus}</button>
          </div>
        </div>
      </div>
    );
  };

  const renderCartQuantity = () => {
    const totalQuantity = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    const cartQuantityText = totalQuantity > 99 ? "99+" : totalQuantity;
    return cartQuantityText;
  };

  const cartNumberClass = cartQuantity > 99 ? "bigcartnumber" : cartQuantity >= 10 ? "mediumcartnumber" : "smallcartnumber";

  useEffect(() => {
    const totalQuantity = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cartItems]);

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

      <div className="itemcontent">
        <div className="showitemcategory">{item && item?.category ? item.category : "Unknown Category"}</div>
        <div className="itemdetails">
        <div className="itemshowcontainer">
            {item && (
              <img className="itemshowimg" src={item.imageUrl} alt={item.name} />
            )}
          </div>

          <div className="itemspecs">
            <div className="showitemname">{item && item?.name ? item.name : " Unknown Name"}
              <hr className="separator" />
              <div className="descriptioncontainer">About this item:
                <div className="itemdescription">{item && item?.description ? item.description : "Unknown Description"}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="showitemdiv">
          <div className={`showitemcost ${item && item.stock <= 0 ? 'out-of-stock' : ''}`}>
            Cost: ${item && item?.cost ? item.cost : " Unknown Cost"}
          </div>
          <div className={`instock ${item && item.stock <= 0 ? 'out-of-stock' : ''}`}>
            {item && item.stock > 0 ? "In Stock" : "Out Of Stock"}
          </div>
          
          <div className={`showitemdropdown ${item && item.stock <= 0 ? 'out-of-stock' : ''}`}>
            <label className={`showdropdownbutton ${isModalOpen ? 'modalopen' : ''}`} onClick={() => toggleDropdown()}>
              <div className="qtxcontainer">
                Qty: <span className="qtytext" id="selectedQuantity">1</span>
              </div>
            </label>
            <div className="showdropdowncontent" id="dropdownContent">
              <label htmlFor="quantity1" onClick={() => updateQuantity(1)}>1</label>
              <label htmlFor="quantity2" onClick={() => updateQuantity(2)}>2</label>
              <label htmlFor="quantity3" onClick={() => updateQuantity(3)}>3</label>
              <label htmlFor="quantity4" onClick={() => updateQuantity(4)}>4</label>
              <label htmlFor="quantity5" onClick={() => updateQuantity(5)}>5</label>
              <label htmlFor="quantity6" onClick={() => updateQuantity(6)}>6</label>
              <label htmlFor="quantity7" onClick={() => updateQuantity(7)}>7</label>
              <label htmlFor="quantity8" onClick={() => updateQuantity(8)}>8</label>
              <label htmlFor="quantity9" onClick={() => updateQuantity(9)}>9</label>
              <label htmlFor="quantity10" onClick={() => updateQuantity(10)}>10</label>
            </div>
          </div>

          {item && item.stock > 0 && (
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
            <Modal closeModal={closeModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default ItemShow;