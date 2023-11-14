import React from 'react';
import amazeonhomepage from '../images/amazeonhomepage.jpeg';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <div className="navbar">
        <div className="divamazeonhome">
          <img className="amazeonhomepage" src={amazeonhomepage} alt="amazeonhomemain" />
        </div>

        <div className="searchContainer">
          <button className="catagories">All</button>
          <input type="text" className="search-box" placeholder="Search Amazeon" />
          <button className="search-button">Search</button>
        </div>

        <div className="dropdown">
          <button className="dropdown-btn">Account</button>
          <div className="dropdown-content">
            <a href="/signup">Sign Out</a>
          </div>
        </div>

        <div>Cart</div>
      </div>
    </>
  );
};

export default HomePage;
