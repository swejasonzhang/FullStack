import React, { useState, useEffect } from "react";
import amazeonhomepage from '../images/amazeonhomepage.jpeg';
import './HomePage.css';
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import amazeoncart from '../images/AmazeonCart.jpeg';

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const session = useSelector(state => state.session);

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

  return (
    <>
      <div className="navbar">
        <div className="amazeonhome">
          <img className="amazeonhomepage" src={amazeonhomepage} alt="amazeonhomelogo" />
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

            <div className="homesignoutlink">
              <a href="/login" onClick={homesignout}>Sign Out</a>
            </div>
          </div>
        </div>
        <div className="amazeoncartsection">
          <img className="amazeoncartimg" src={amazeoncart} alt="" />
          <div className="cartcontainer">
            <div className="number">0</div>
            <div className="cart">
              <h3>Cart</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;