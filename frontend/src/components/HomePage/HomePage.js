import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.css';
import ItemsIndex from "../Items/ItemsIndex";
import { fetchCartItems } from "../../store/cartitems.js";
import NavBar from "../NavBar/NavBar.js";
import CarouselImage1 from "../Images/CarouselImage1.jpg";
import CarouselImage2 from "../Images/CarouselImage2.jpg";
import CarouselImage3 from "../Images/CarouselImage3.jpg";

const HomePage = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const cartItems = useSelector(state => state.cartItems);
  const searchTerm = useSelector(state => state.term.receivedTerm);
  const selectedCategory = useSelector(state => state.category.receivedCategory);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (!session || !cartItems) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000, 
    arrows: true,
    pauseOnHover: false,
    centerMode: true,
    centerPadding: "0px"
  };  

  const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3];

  return (
    <>
      <NavBar />
      
      {searchTerm === "" && selectedCategory === "All Departments" ? (
        <div className="pagecontent">
          <div className="backgroundimagediv">
            <div className="carousel-wrapper">
              <Slider {...settings}>
                {carouselImages.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`image-${index}`} className="carousel-image" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ) : (
        <div className="itemsindex">
          <ItemsIndex selectedCategory={selectedCategory} searchTerm={searchTerm} />
        </div>
      )}
    </>
  );
};

export default HomePage;