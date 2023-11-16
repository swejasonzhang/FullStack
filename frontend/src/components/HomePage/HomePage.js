import React from "react";
import amazeonhomepage from '../images/amazeonhomepage.jpeg';
import './HomePage.css';
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const homesignout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/login');
  };

  return (
    <>
      <div className="navbar">
        <div className="amazeonhome">
          <img className="amazeonhomepage" src={amazeonhomepage} alt="amazeonhomelogo" />
        </div>

        <div class="searchcontainer">
          <div class="categories-container">
            <button class="categories">All
              <div class="arrowdown"></div>
              <div class="dropdowncontent">
                <p>All Departments</p>
                <p>Alexa Skills</p>
              </div>
            </button>
          </div>
          <input type="text" class="searchbox" placeholder="Search Amazeon" />
          <button class="searchbutton">
            <span class="search-icon">&#x1F50D;</span>
          </button>
        </div>

        <div className="dropdown">
          <button className="dropdownbutton">Account &#9660;</button>
          <div className="accountdropdowncontent">
            <a href="/login" onClick={homesignout}>Sign Out</a>
          </div>
        </div>

        <div className="cart">Cart</div>
      </div>
    </>
  );
};

export default HomePage;
