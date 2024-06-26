import React, { useEffect, useRef, useState } from "react";
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
import CarouselLeft from "../Images/CarouselLeft.png";
import CarouselRight from "../Images/CarouselRight.png"

const HomePage = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const cartItems = useSelector((state) => state.cartItems);
  const searchTerm = useSelector((state) => state.term.receivedTerm);
  const selectedCategory = useSelector((state) => state.category.receivedCategory);
  const sliderRef = useRef();
  const intervalRef = useRef(null);
  const [showLeftOutline, setShowLeftOutline] = useState(false);
  const [showRightOutline, setShowRightOutline] = useState(false);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 100000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickAway = (event) => {
      if (!event.target.closest(".carouselprevdiv") && !event.target.closest(".carouselnextdiv")) {
        setShowLeftOutline(false);
        setShowRightOutline(false);
      }
    };

    document.addEventListener("click", handleClickAway);
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, []);

  const handlePrevClick = () => {
    clearInterval(intervalRef.current);
    sliderRef.current.slickPrev();
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 100000);
    setShowLeftOutline(true);
  };

  const handleNextClick = () => {
    clearInterval(intervalRef.current);
    sliderRef.current.slickNext();
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 100000);
    setShowRightOutline(true);
    setTimeout(() => setShowRightOutline(false), 2000);
  };

  if (!session || !cartItems) return null;

  const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 250,
  };

  return (
    <>
      <NavBar />

      {searchTerm === "" && selectedCategory === "All Departments" ? (
        <div className="pagecontent">
          <div className="backgroundimagediv">
            <div className="carousel-wrapper">
              <div className={`carouselprevdiv ${showLeftOutline ? "show-outline" : ""}`} onClick={handlePrevClick}>
                <div className="leftoutline">
                  <img src={CarouselLeft} className="carouselleft" alt="left" onClick={handlePrevClick}></img>
                </div>
              </div>

              <Slider {...settings} ref={sliderRef}>
                {carouselImages.map((image, idx) => (
                  <div key={idx} className="carousel-image-container">
                    <img src={image} alt={`carousel${idx}`} className="carousel-image" />
                  </div>
                ))}
              </Slider>

              <div className={`carouselnextdiv ${showRightOutline ? "show-outline" : ""}`} onClick={handleNextClick}>
                <div className="rightoutline">
                  <img src={CarouselRight} className="carouselright" alt="right" onClick={handleNextClick}></img>
                </div>
              </div>
            </div>
          </div>

          <div className="suggestions">
            <div className="itemscarousel">
              <div className="container">
                <h2 className="lastitemsbought">Pick up where you left off </h2>
              </div>

              <div className="container">
                <h2 className="techitems">Women's fashion under $30</h2>
              </div>

              <div className="container">
                <h2 className="catchup">Catch up on talked-about titles</h2>
              </div>

              <div className="returncontainer">
                <h2 className="easyreturns">Easy returns</h2>
                <div className="returntext">Amazeon does not have flexible return shipping on orders & gifts</div>
              </div>
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