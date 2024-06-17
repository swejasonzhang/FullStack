import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import ItemsIndex from "../Items/ItemsIndex";
import { fetchCartItems } from "../../store/cartitems.js";
import NavBar from "../NavBar/NavBar.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselImage1 from "../Images/CarouselImage1.jpg";
import CarouselImage2 from "../Images/CarouselImage2.jpg";
import CarouselImage3 from "../Images/CarouselImage3.jpg";

const HomePage = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const cartItems = useSelector((state) => state.cartItems);
  const searchTerm = useSelector((state) => state.term.receivedTerm);
  const selectedCategory = useSelector((state) => state.category.receivedCategory);
  const sliderRef = useRef();
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 30000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handlePrevClick = () => {
    clearInterval(intervalRef.current);
    sliderRef.current.slickPrev();
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 30000);
  };

  const handleNextClick = () => {
    clearInterval(intervalRef.current);
    sliderRef.current.slickNext();
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 30000);
  };

  if (!session || !cartItems) return null;

  const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <NavBar />

      {searchTerm === "" && selectedCategory === "All Departments" ? (
        <div className="pagecontent">
          <div className="backgroundimagediv">
            <div className="carousel-wrapper">
              <button className="slick-arrow slick-prev" onClick={handlePrevClick}></button>
              <Slider {...settings} ref={sliderRef}>
                {carouselImages.map((image, idx) => (
                  <div key={idx} className="carousel-image-container">
                    <img src={image} alt={`carousel-image-${idx}`} className="carousel-image" />
                  </div>
                ))}
              </Slider>
              <button className="slick-arrow slick-next" onClick={handleNextClick}></button>
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