import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './HomePage.css';
import ItemsIndex from "../Items/ItemsIndex";
import { fetchCartItems } from "../../store/cartitems.js";
import NavBar from "../NavBar/NavBar.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const cartItems = useSelector(state => state.cartItems);
  const [selectedCategory, setSelectedCategory] = useState("All Departments");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (!session || !cartItems) return null;

  return (
    <>
      <NavBar />

      <div className="pagecontent">
        <ItemsIndex selectedCategory={selectedCategory} searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default HomePage;