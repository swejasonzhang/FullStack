import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import CarouselRight from "../Images/CarouselRight.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.session);
  const user = session.user;
  const cartItems = useSelector((state) => state.cartItems);
  const searchTerm = useSelector((state) => state.term.receivedTerm);
  const selectedCategory = useSelector((state) => state.category.receivedCategory);
  const sliderRef = useRef();
  const intervalRef = useRef(null);
  const [showLeftOutline, setShowLeftOutline] = useState(false);
  const [showRightOutline, setShowRightOutline] = useState(false);
  const [isContentGrayedOut, setIsContentGrayedOut] = useState(false);

  const login = (e) => {
    e.preventDefault();
    history.push('/login');
  }

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm === "" && selectedCategory === "All Departments") {
      intervalRef.current = setInterval(() => {
        sliderRef.current.slickNext();
      }, 5000);

      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const handleClickAway = (event) => {
      if (!event.target.closest(".carouselprevdiv") && !event.target.closest(".carouselnextdiv")) {
        setShowLeftOutline(false);
        setShowRightOutline(false);
      }
    };

    if (searchTerm === "" && selectedCategory === "All Departments") {
      document.addEventListener("click", handleClickAway);
      return () => {
        document.removeEventListener("click", handleClickAway);
      };
    }
  }, [searchTerm, selectedCategory]);

  const handlePrevClick = () => {
    clearInterval(intervalRef.current);
    sliderRef.current.slickPrev();
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 5000);
    setShowLeftOutline(true);
  };

  const handleNextClick = () => {
    clearInterval(intervalRef.current);
    sliderRef.current.slickNext();
    intervalRef.current = setInterval(() => {
      sliderRef.current.slickNext();
    }, 5000);
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
      <NavBar setIsContentGrayedOut={setIsContentGrayedOut} />

      {searchTerm === "" && selectedCategory === "All Departments" ? (
        <div className={`pagecontent ${isContentGrayedOut ? 'grayed-out' : ''}`}>
          <div className="backgroundimagediv">
            <div className={`carousel-wrapper`}>
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
                {user === null ? (
                  <h2 className="lastitemsbought">New home arrivals under $50</h2>
                ) : (
                  <h2 className="lastitemsbought">Pick up where you left off</h2>
                )}
              </div>

              <div className="container">
                {user === null ? (
                  <h2 className="lastitemsbought">Summer fashion for all</h2>
                ) : (
                  <h2 className="lastitemsbought">Women's fashion under $30</h2>
                )}
              </div>

              <div className="container">
                {user == null ? (
                  <h2 className="catchup">Save on school essentials</h2>
                ) : (
                  <h2 className="catchup">Catch up on talked-about titles</h2>
                )}
              </div>

              <div className={`returncontainer ${user === null ? 'same-size' : ''}`}>
                {user === null ? (
                  <div>
                    <h2 className="easyreturns">Sign in for the best experience
                      <div className="carouselsignin" onClick={login}>Sign in securely</div>
                    </h2>
                  </div>
                ) : (
                  <div>
                    <h2 className="easyreturns">Easy returns</h2>
                    <div className="returntext">Amazeon does not have flexible return shipping on orders & gifts</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isContentGrayedOut && <div className="overlay"></div>}
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
