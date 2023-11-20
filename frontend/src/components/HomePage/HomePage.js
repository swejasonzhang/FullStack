import React, { useState, useEffect } from "react";
import amazeonhomepage from '../Images/amazeonhomepage.jpeg';
import amazeoncart from '../Images/AmazeonCart.jpeg';
import './HomePage.css';
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ItemsIndex from "../Items/ItemsIndex";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const session = useSelector(state => state.session);
  const counterOfItems = useSelector((state) => state.counterOfItems);

  useEffect(() => {
    if (session && session.user && session.user.username) {
      setUsername(session.user.username);
    } else {
      setUsername("User");
    }
  }, [session]);

  const homesignout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/login');
  };

  const redirectcart = async(e) => {
    history.push('/cart')
  }

  const redirectToHomePage = async(e) => {
    history.push("/")
  }

  return (
    <>
      <div className="navbar">
        <div className="amazeonhome">
          <img className="amazeonhomepage" src={amazeonhomepage} onClick={redirectToHomePage} alt="amazeonhomelogo" />
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

        <button className="amazeoncartsection" onClick={redirectcart}>
          <img className="amazeoncartimg" src={amazeoncart} alt="" />
          <div className="cartcontainer">
            <div className="number">{counterOfItems}</div>
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