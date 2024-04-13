import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';
import ItemsIndex from "../Items/ItemsIndex";
import { fetchCartItems } from "../../store/cartitems.js"

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const session = useSelector(state => state.session);
  const cartItems = useSelector(state => state.cartItems);

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

  const homesignout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/login');
  };

  const homesignup = async(e) => {
    e.preventDefault();
    history.push('/signup')
  }

  const homelogin = async(e) => {
    e.preventDefault();
    history.push('/login')
  }

  const redirectcart = async(e) => {
    e.preventDefault();
    history.push('/cart');
  }

  const redirectToHomePage = async(e) => {
    e.preventDefault();
    history.push("/")
  }

  const totalItemsInCart = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  if (!session || !cartItems) return null;

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
                <a href="/signup" onClick={homesignup}>Sign Up</a>
                <a href="/login" onClick={homelogin}>Sign In</a>
              </div>
            )}
          </div>  
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
        <ItemsIndex />
      </div>
    </>
  );
};

export default HomePage;