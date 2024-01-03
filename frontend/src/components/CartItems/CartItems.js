import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './CartItems.css';
import { deleteCartItem, removeCartItem, removeCartItems } from "../../store/cartitems";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(""); 
  const session = useSelector(state => state.session);
  const cartItems = useSelector(state => state.cartItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkoutStatus, setCheckoutStatus] = useState("Proceed To Checkout");
  const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);
  const [selectedQuantity, setSelectedQuantity] = useState(1); 

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

  const handleCheckboxChange = (index) => {
    let newSelectedItems = [...selectedItems];
  
    if (!newSelectedItems.includes(index)) {
      newSelectedItems.push(index);
    } else {
      newSelectedItems = newSelectedItems.filter((item) => item !== index);
    }
  
    setSelectedItems(newSelectedItems);
  };
  

  const calculateSelectedItemsCost = () => {
    let totalCost = 0;
  
    selectedItems.forEach((item) => {
        totalCost += item.quantity * item.cost;
    });
  
    return totalCost.toFixed(2);
  };

  const proceedingCheckout = () => {
    const deleteIds = selectedItems.map((item) => item.id);
    dispatch(removeCartItems(deleteIds));
  
    setCheckoutStatus("Order placed");
    setTimeout(() => {
      setCheckoutStatus("Packages are on its way");
    }, 1000);
  
    setCheckoutStatus("Proceed To Checkout");
  
    setTimeout(() => {
      setSelectedItems([]);
    }, 2000);
  };

  const deleteCartItem = (itemId) => {
    dispatch(removeCartItem(itemId))
  }

  function updateQuantity(quantity) {
    setSelectedQuantity(quantity);
    const dropdown = document.querySelector('.showitemdropdown');
    dropdown.classList.remove('active');

    const qtyTextElement = document.getElementById('selectedQuantity');
    if (qtyTextElement) {
      qtyTextElement.textContent = quantity;
    }
  }

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
                {selectedItems.length > 0 ? (
                <>
                    {selectedItems.length} Items Selected.
                </>
                ) : (
                <>
                    No items selected. 
                </>
                )}
                <div className="price">Price</div>
            </div>

            <div className="grayline"></div>
            {Object.values(cartItems).map((item, index) => (
                <div key={index} className="cartitem">
                    <div className="cartcheckbox">
                        <input type="checkbox" id={`checkbox${index}`} onChange={() => handleCheckboxChange(item)} checked={selectedItems.includes(item)}/>
                    </div>

                    <div className="cartimgcontainer">
                      <div className="cartindeximgcontainer">
                        <img className="cartindeximg" src={item.image_url} alt={item.imageUrl} />
                      </div>

                      <div className="deleteitem" onClick={() => deleteCartItem(item.id)}>Delete</div>
                    </div>

                    <div className="cartitemdetails">
                        <p>{item.name}</p>
                        <div className="descriptioncontainer">
                            <p>Description: {item.description}</p>
                        </div>

                        
                    </div >

                    <p className="costofitem">${item.cost?.toFixed(2)}</p>
                </div>
            ))}
            </div>
        )}

        <div className="checkout">
            <div className="subtotal">
                {selectedItems.length > 0 ? (
                <>
                    <div className="proceedingcheckout">
                        Subtotal ({totalQuantity} Items): ${calculateSelectedItemsCost()}
                        <div className="checkoutbutton" onClick={proceedingCheckout}> {checkoutStatus}</div>
                    </div>
                </>
                ) : (
                    "No items selected."
                )}
            </div>
        </div>
      </div>
    </>
  )
}

export default Cart;