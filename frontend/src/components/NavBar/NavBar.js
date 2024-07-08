import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { fetchCartItems } from "../../store/cartitems.js";
import './NavBar.css';
import { receiveCategory } from "../../store/category.js";
import { receiveTerm } from "../../store/searchterm.js";
import AddressPin from "../Images/AddressPin.png";
import AmazeonHome from "../Images/AmazeonHome.png"

const NavBar = ({ setIsContentGrayedOut }) => { 
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);
  const session = useSelector(state => state.session);
  const cartItems = useSelector(state => state.cartItems);
  const searchTerm = useSelector(state => state.term.receivedTerm);
  const selectedCategory = useSelector(state => state.category.receivedCategory);
  const [showModal, setShowModal] = useState(false);
  const [categoryWidth, setCategoryWidth] = useState('50px');
  const selectRef = useRef(null);
  const padding = 30; 

  useEffect(() => {
    if (session && session.user && session.user.username) {
      setUsername(session.user.username);
    } else {
      setUsername("User");
    }
  }, [session]);

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(receiveCategory("All Departments"));
    dispatch(receiveTerm(""));
  }, [dispatch]);

  if (!session || !cartItems) return null;

  const signout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push('/login');
  };

  const signup = async(e) => {
    e.preventDefault();
    history.push('/signup');
  };

  const login = async(e) => {
    e.preventDefault();
    history.push('/login');
  };

  const redirectcart = async(e) => {
    e.preventDefault();
    history.push('/cart');
  };

  const redirectToHomePage = (e) => {
    e.preventDefault();
    dispatch(receiveCategory("All"));
    dispatch(receiveTerm(""));
    history.push('/');
  };

  const totalItemsInCart = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    dispatch(receiveCategory(newCategory));
    setIsContentGrayedOut(true);

    const optionText = e.target.options[e.target.selectedIndex].text;
    const optionWidth = optionText.length * 8 + padding;
    setCategoryWidth(`${optionWidth}px`);
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    dispatch(receiveTerm(newSearchTerm));
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchForItems(searchTerm, selectedCategory);
    }
  };

  const handleSearchFocus = () => {
    setIsContentGrayedOut(true);
    setIsSearchBoxFocused(true);
  };

  const handleSearchBlur = () => {
    setIsContentGrayedOut(false);
    setIsSearchBoxFocused(false);
  };

  const searchForItems = (searchTerm, selectedCategory) => {
    dispatch(receiveTerm(searchTerm));
    dispatch(receiveCategory(selectedCategory));
  };

  const openModal = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 300);
  };
  
  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 300); 
  };
  
  return (
    <>
      <div className="navbar">
        <div className="logoanddelivery">
          <div className="amazeonhome">
            <img className="amazeonhomeimg" src={AmazeonHome} onClick={redirectToHomePage} alt="amazeonhomelogo" />
          </div>

          <div className="delivery">
            <div className="delivertoname">Deliver to {username}
              <div className="address">
                <img src={AddressPin} className="locationicon" alt="" /> Narnia... 98765
              </div>
            </div>
          </div>
        </div>

        <div className="searchcontainer">
          <div className={`closingdiv ${isSearchBoxFocused ? 'focused' : ''}`}>
            <div className="categoriescontainer">
              <select className="categories" style={{ width: categoryWidth, padding: '0 10px' }} value={selectedCategory} onChange={handleCategoryChange} ref={selectRef}>
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
          
            <input type="text" className="searchbox" placeholder="Search Amazeon" value={searchTerm} onChange={handleSearchChange} onFocus={handleSearchFocus} onBlur={handleSearchBlur} onKeyDown={handleSearchKeyDown} />
            <button className="searchbutton" onClick={() => searchForItems(searchTerm, selectedCategory)}>
              <div className="searchbuttonicon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </button>
          </div>
        </div>

        <div className="otherinfo">
          <div className="languagediv">
            <div className="flagdiv">
              <img className="flag" src={"https://amazeon-seeds.s3.amazonaws.com/Flag.png"} alt="navbarflag"></img>
            </div>

            <div className="language">EN</div>
          </div>

          <div className="dropdown">
            <div className="greetingdiv" onMouseEnter={openModal} onMouseLeave={closeModal}>
              <div className="greeting">Hello, {username}</div> 

              <button className="dropdownbutton">Account & Lists 
                <FontAwesomeIcon className="accounttriangle" icon={faCaretDown} />
              </button>

              {showModal && (
                <div className={`accountdropdowncontent ${session.user ? 'user-logged-in' : 'user-logged-out'}`} onMouseLeave={closeModal}>
                  {session.user ? (
                    <>
                      <div className="loginaccountdiv">
                        <div className="loginlistandaccount">
                          
                          <div className="loginlist">Your Lists
                            <div className="loginlistheader"></div>
                          </div>

                          <div className="loginlistbreakline"></div>

                          <div className="loginaccount">Your Account
                            <div className="logout" onClick={signout}>Logout</div>
                          </div>

                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="logoutaccountdiv">
                        <button className="accountsignin" onClick={login}>Sign In</button>

                        <div className="customerdiv">
                          <div className="newcustomer"> New customer?</div>
                          <div className="starthere" onClick={signup}> Start here.</div>
                        </div>
                      </div>

                      <div className="breakline"></div>

                      <div className="listandaccount">
                        <div className="listheader">Your Lists

                        </div>

                        <div className="listbreakline"></div>

                        <div className="account">Your Account
                          
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
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
        </div>
      </div>

      <div className="navextra">
        
      </div>
    </>
  );
};

export default NavBar;
