import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CartItems.css';
import { deleteCartItem, updatingCartItem, fetchCartItems, updateQuantities } from "../../store/cartitems";
import { fetchItems } from "../../store/item";
import NavBar from "../NavBar/NavBar.js";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);
  const items = useSelector(state => state.items)
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkoutStatus, setCheckoutStatus] = useState("Proceed To Checkout");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(fetchItems());
  }, [dispatch]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.includes(itemId) ? prevSelectedItems.filter((id) => id !== itemId) : [...prevSelectedItems, itemId];
      return updatedItems;
    });
  };

  const calculateSelectedItemsCost = () => {
    let totalCost = 0;
    const allCartItems = Object.values(cartItems); 
    const selectedObjects = allCartItems.filter(item => selectedItems.includes(item.id));
  
    selectedObjects.forEach((item) => {
      totalCost += item.quantity * item.cost;
    });
  
    return totalCost.toFixed(2);
  };

  const proceedingCheckout = () => {
    const allCartItems = Object.values(cartItems); 
    const deleteCartId = allCartItems.filter(item => selectedItems.includes(item.id));
    const deleteId = deleteCartId.map((item) => item.id);
    const quantity = allCartItems[0].quantity
    const deleteIdArray = deleteId.map(id => items[id])
    dispatch(updateQuantities(deleteIdArray, quantity));

    setTimeout(() => {
      setCheckoutStatus("Proceed To Checkout");
    }, 1000);

    setTimeout(() => {
      setCheckoutStatus("Order placed");
    }, 1500);

    setTimeout(() => {
      setCheckoutStatus("Packages are on its way");
    }, 2000);

    setTimeout(() => {
      setSelectedItems([]);
    }, 2500);
  };

  const deletingCartItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== itemId));
    dispatch(deleteCartItem(itemId));
  };

  const checkoutQuantities = () => {
    const array = selectedItems.map(id => {
      const item = cartItems[id];
      if (item) {
        return { item, selectedQuantity: item.quantity };
      }
    });
  
    dispatch(updateQuantities(array));
  };
  
  const toggleDropdown = (index) => {
    const dropdown = document.getElementById(`cartitemdropdown${index}`);
    
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  };
  
  const handleDocumentClick = (event) => {
    const dropdowns = document.querySelectorAll('.cartitemdropdown');

    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
      }
    });
  };
  
  const updateQuantity = (index, quantity) => {
    setSelectedQuantity(quantity);
  
    const item = Object.values(cartItems)[index];

    const updatedItem = {
      id: item.id,
      quantity,
      name: item.name,
      cost: item.cost,
      description: item.description,
      image_url: item.image_url,
      item_id: item.item_id,
      user_id: item.user_id
    };
  
    dispatch(updatingCartItem(item.id, updatedItem));
  
    const dropdownId = `cartitemdropdown${index}`;
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.remove('active');
    }
  };
      
  const calculateTotalQuantity = () => {
    const allCartItems = Object.values(cartItems); 
    const selectedObjects = allCartItems.filter(item => selectedItems.includes(item.id));
    return selectedObjects.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <NavBar />

      <div className="cartindex"> 
        {Object.values(cartItems).length < 1 ? (<div className="emptycartmessage"> Your Amazeon Cart is empty. Please add items to cart.</div>) :             
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
                      <input type="checkbox" id={`checkbox${index}`} onChange={() => handleCheckboxChange(item.id)} checked={selectedItems.includes(item.id)}/>
                  </div>

                  <div className="cartimgcontainer">
                    <div className="cartindeximgcontainer">
                      <img className="cartindeximg" src={item.image_url} alt={item.imageUrl} />
                    </div>

                    <div className="deleteitem" onClick={() => deletingCartItem(item.item_id)}>Delete</div>
                  </div>

                  <div className="cartitemdetails">
                    <p>{item.name}</p>
                    <div className="descriptioncontainer">
                        <p>Description: {item.description}</p>
                    </div>

                    <div className="cartitemdropdown" id={`cartitemdropdown${index}`}>
                      <label className="cartdropdownbutton" onClick={() => toggleDropdown(index)}>
                        <div className="cartqtxcontainer">
                          Qty: <span className="qtytext" id="selectedQuantity">{item.quantity}</span>
                        </div>
                      </label>

                      <div className="cartdropdowncontent" id="cartdropdownContent">
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 1)}>1</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 2)}>2</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 3)}>3</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 4)}>4</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 5)}>5</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 6)}>6</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 7)}>7</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 8)}>8</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 9)}>9</label>
                        <label htmlFor={`cartquantity${index}`} onClick={() => updateQuantity(index, 10)}>10</label>
                      </div>
                    </div>
                  </div >
                  <p className="costofitem">${item.cost?.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        {Object.values(cartItems).length > 0 && (
          <div className="checkout">
            <div className="subtotal">
              {selectedItems.length > 0 ? (
                selectedItems.length === 1 ? (
                  <>
                    <div className="proceedingcheckout">
                      Subtotal ({calculateTotalQuantity()} Item): ${calculateSelectedItemsCost()}
                      <div className="checkoutbutton" onClick={proceedingCheckout}>{checkoutStatus}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="proceedingcheckout">
                      Subtotal ({calculateTotalQuantity()} Items): ${calculateSelectedItemsCost()}
                      <div className="checkoutbutton" onClick={checkoutQuantities}>{checkoutStatus}</div>
                    </div>
                  </>
                )
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