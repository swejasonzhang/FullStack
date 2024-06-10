import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faFlagUsa } from "@fortawesome/free-solid-svg-icons";
import './HomePage.css';
import ItemsIndex from "../Items/ItemsIndex";
import { fetchCartItems } from "../../store/cartitems.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const session = useSelector(state => state.session);
  const cartItems = useSelector(state => state.cartItems);
  const [selectedCategory, setSelectedCategory] = useState("All Departments");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (session && session.user && session.user.username) {
      setUsername(session.user.username);
    } else {
      setUsername("User");
    }
  }, [session]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (!session || !cartItems) return null;

  const homesignout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/login');
  };

  const homesignup = async(e) => {
    e.preventDefault();
    history.push('/signup');
  }

  const homelogin = async(e) => {
    e.preventDefault();
    history.push('/login');
  }

  const redirectcart = async(e) => {
    e.preventDefault();
    history.push('/cart');
  }

  const redirectToHomePage = async(e) => {
    e.preventDefault();
    setSelectedCategory("All Departments");
    history.push("/");
  }

  const totalItemsInCart = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="navbar">
        <div className="amazeonhome">
          <img className="amazeonhomepage" src={"https://amazeon-seeds.s3.amazonaws.com/Logo+For+Home+Page.jpeg"} onClick={redirectToHomePage} alt="amazeonhomelogo" />
        </div>

        <div className="delivery">
          <div className="delivertoname">Deliver to {username}
            <div className="address">
              <FontAwesomeIcon icon={faLocationDot} /> Narnia... 98765
            </div>
          </div>
        </div>

        <div className="searchcontainer">
          <div className="categoriescontainer">
            <select className="categories" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="All Departments">All</option>
              <option value="Video Games">Video Games</option>
              <option value="Headset">Headset</option>
              <option value="Mouse">Mouse</option>
              <option value="Keyboard">Keyboard</option>
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

          <FontAwesomeIcon className="triangledown" icon={faCaretDown} />

          <input type="text" className="searchbox" placeholder="Search Amazeon" value={searchTerm} onChange={handleSearchChange} />
          <button className="searchbutton">
            <div className="searchbuttonicon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </button>
        </div>

        <div className="language">EN</div>

        <div className="dropdown">
          <div className="greetingdiv">
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
                  <a href="/signup" onClick={homesignup}>Sign Up</a>
                  <a href="/login" onClick={homelogin}>Sign In</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="returnsdiv"> 
          <div className="returns">Returns</div>
          <div className="orders">& Orders</div>
        </div>

        <button className="amazeoncartsection" onClick={redirectcart}>
          <img className="amazeoncartimg" src={"https://amazeon-seeds.s3.amazonaws.com/Cart.jpg"} alt="" />
          <div className="cartcontainer">
            <div className="number">{totalItemsInCart}</div>
            <div className="cart">
              <h3>Cart</h3>
            </div>
          </div>
        </button>
      </div>

      <div className="pagecontent">
        <ItemsIndex selectedCategory={selectedCategory} searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default HomePage;