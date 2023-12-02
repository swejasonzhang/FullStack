import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './CartItems.css';

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const session = useSelector(state => state.session);
  const cartItems = useSelector(state => state.cartItems);
  const [selectedItems, setSelectedItems] = useState([]);

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
    history.push('/cart');
  }

  const redirectToHomePage = async(e) => {
    history.push("/")
  }

  const totalItemsInCart = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  const totalSelectedItems = selectedItems.reduce(
    (total, index) => total + (cartItems[index]?.quantity || 0),
    0
  );

  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedItems.indexOf(index);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(index);
    } else {
      newSelectedItems = newSelectedItems.filter((item) => item !== index);
    }

    setSelectedItems(newSelectedItems);
  };

  const isAnyItemSelected = totalSelectedItems > 0;

  const calculateTotalSelectedItemsCost = () => {
    let totalCost = 0;
  
    selectedItems.forEach((index) => {
      const cartItem = cartItems[index];
      if (cartItem) {
        totalCost += cartItem.quantity * cartItem.item.cost;
      }
    });
  
    return totalCost.toFixed(2);
  };

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
    
            <button className="amazeoncartsection" onClick={redirectcart}>
                <img className="amazeoncartimg" src={"https://amazeon-seeds.s3.amazonaws.com/amazeoncart.jpeg"} alt="" />
                <div className="cartcontainer">
                <div className="number">{totalItemsInCart}</div>
                    <div className="cart">
                        <h3>Cart</h3>
                    </div>
                </div>
            </button>
      </div>

      <div className="cartindex"> 
        {cartItems.length === 0 ? (<div className="emptycartmessage">Your Amazeon Cart is empty. Please add items to cart.</div>) :             
        (<div className="shoppingcart">Shopping Cart
         <div className="itemsselected">
            {isAnyItemSelected ? (
              <>{totalSelectedItems} Items Selected.</>
            ) : (
              <>No items selected. </>
            )}
            <div className="price">Price</div>
          </div>
          <div className="grayline"></div>
          {Object.values(cartItems).map((item, index) => (
            <div key={index} className="cartitem">
              <div className="cartcheckbox">
              <input type="checkbox" id={`checkbox${index}`} onChange={() => handleCheckboxChange(index)} checked={selectedItems.includes(index)}/>
              </div>
              <div className="cartindeximgcontainer">
                <img className="cartindeximg" src={item.item.imageUrl} alt={item.item.name} />
              </div>
              <div className="cartitemdetails">
                <p>{item.item.name}</p>
                <div className="descriptioncontainer">
                  <p>Description: {item.item.description}</p>
                </div>
                <div className="cartquantity">
                </div>
              </div>
              <p className="costofitem">${item.item.cost?.toFixed(2)}</p>
            </div>
          ))}
        </div>
        )}

        {cartItems.length > 0 && (
          <div className="checkout">
            <div className="subtotal">
              {totalSelectedItems > 0 ? (
                <>
                  Subtotal ({totalSelectedItems} Items): ${calculateTotalSelectedItemsCost()}
                </>
              ) : (
                "No items selected."
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart;