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
import KitchenPot from "../Images/KitchenPot.jpg";
import Paint from "../Images/Paint.jpg";
import Decor from "../Images/Decor.jpg";
import Bedding from "../Images/Bedding.jpg";
import Fashion from "../Images/Fashion.jpg";
import Womens from "../Images/Women's.jpg";
import Mens from "../Images/Men's.jpg";
import Kids from "../Images/Kid's.jpg";
import School from "../Images/School.jpg";
import Makeup from "../Images/Makeup.jpg";
import Soda from "../Images/Soda.jpg";
import Merch from "../Images/Merch.jpg";
import Snacks from "../Images/Snacks.jpg"

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
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

  const login = (e) => {
    e.preventDefault();
    history.push('/login');
  }

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const areConditionsMet = searchTerm !== "" || selectedCategory !== "All Departments";
    setAreButtonsDisabled(areConditionsMet);

    if (!areConditionsMet) {
      intervalRef.current = setInterval(() => {
        sliderRef.current.slickNext();
      }, 10000);

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

    if (!areButtonsDisabled) {
      document.addEventListener("click", handleClickAway);
      return () => {
        document.removeEventListener("click", handleClickAway);
      };
    }
  }, [areButtonsDisabled]);

  const handlePrevClick = () => {
    if (!areButtonsDisabled) {
      clearInterval(intervalRef.current);
      sliderRef.current.slickPrev();
      intervalRef.current = setInterval(() => {
        sliderRef.current.slickNext();
      }, 10000);
      setShowLeftOutline(true);
    }
  };

  const handleNextClick = () => {
    if (!areButtonsDisabled) {
      clearInterval(intervalRef.current);
      sliderRef.current.slickNext();
      intervalRef.current = setInterval(() => {
        sliderRef.current.slickNext();
      }, 10000);
      setShowRightOutline(true);
      setTimeout(() => setShowRightOutline(false), 2000);
    }
  };

  if (!session || !cartItems) return null;

  const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    draggable: false,
    swipe: false
  };

  return (
    <>
      <NavBar setIsContentGrayedOut={setIsContentGrayedOut} />

      {searchTerm === "" && selectedCategory === "All Departments" ? (
        <div className={`pagecontent ${isContentGrayedOut ? 'grayed-out' : ''}`}>
          <div className="backgroundimagediv">
            <div className={`carousel-wrapper`}>
              <div className={`carouselprevdiv ${showLeftOutline ? "show-outline" : ""} ${areButtonsDisabled ? "disabled" : ""}`} onClick={handlePrevClick}>
                <div className="leftoutline">
                  <img src={CarouselLeft} className={`carouselleft ${areButtonsDisabled ? "disabled" : ""}`} alt="Previous" onClick={handlePrevClick} aria-hidden="true" />
                </div>
              </div>

              <Slider {...settings} ref={sliderRef}>
                {carouselImages.map((image, idx) => (
                  <div key={idx} className="carousel-image-container">
                    <img src={image} alt={`Carousel slide ${idx + 1}`} className="carousel-image" />
                  </div>
                ))}
              </Slider>

              <div className={`carouselnextdiv ${showRightOutline ? "show-outline" : ""} ${areButtonsDisabled ? "disabled" : ""}`} onClick={handleNextClick}>
                <div className="rightoutline">
                  <img src={CarouselRight} className={`carouselright ${areButtonsDisabled ? "disabled" : ""}`} alt="Next" onClick={handleNextClick} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <div className="suggestions">
            <div className="itemscarousel">
              <div className="container">
                {user === null ? (
                  <>
                    <h2 className="header">New home arrivals under $50</h2>
                    <div className="homearrivals">
                      <div className="kitchenDiv">
                        <img className="kitchenimg" src={KitchenPot} alt="Kitchen & dining" />
                        Kitchen & dining
                      </div>

                      <div className="homeDiv">
                        <img src={Paint} alt="Home improvement" />
                        Home improvement
                      </div>

                      <div className="décorDiv">
                        <img src={Decor} alt="Décor" />
                        Décor
                      </div>

                      <div className="beddingDiv">
                        <img src={Bedding} alt="Bedding & bath" />
                        Bedding & bath
                      </div>
                    </div>
                    <div className="homeall">Shop the latest from home</div>
                  </>
                ) : (
                  <h2 className="header">Pick up where you left off</h2>
                )}
              </div>

              <div className="container">
                {user === null ? (
                  <>
                    <h2 className="header">Summer fashion for all</h2>
                    <div className="summerfashion">

                      <div>
                        <img src={Fashion} alt="All Fashion" />
                        All fashion
                      </div>

                      <div>
                        <img src={Womens} alt="Women's" />
                        Women's
                      </div>

                      <div>
                        <img src={Mens} alt="Men's" />
                        Men's
                      </div>

                      <div>
                        <img src={Kids} alt="Kid's" />
                        Kid's
                      </div>
                    </div>

                    <div className="summershop">Shop now</div>
                  </>
                ) : (
                  <h2 className="header">Women's fashion under $30</h2>
                )}
              </div>

              <div className="container">
                {user == null ? (
                  <>
                    <h2 className="catchup">Save on school essentials</h2>
                    <div className="school">
                      <img className="schoolimg" src={School} alt="imgschool"></img>
                    </div>

                    <div className="schoolshop">Shop All</div>
                  </>
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

              <div className="container">
                <h2 className="makeuptext">New on Amazeon: Too Faced</h2>
                <div className="makeupdiv">
                  <img className="makeupimg" src={Makeup} alt="makeup"></img>
                </div>
                <div className="shopmakeup">Shop now</div>
              </div>

              <div className="container">
                <h2 className="sodatext">Discover a new kind of soda</h2>
                <div className="sodadiv">
                  <img className="sodaimg" src={Soda} alt="soda"></img>
                </div>
                <div className="shopsoda">Start sipping now</div>
              </div>

              <div className="container">
                <h2 className="merchtext">Modify by Merch on Demand</h2>
                <div className="merchdiv">
                  <img className="merchimg" src={Merch} alt="merch"></img>
                </div>
                <div className="shopmerch">Shop now</div>
              </div>

              <div className="container">
                <h2 className="snackstext">Bite-sized waffle cone snacks</h2>
                <div className="snacksdiv">
                  <img className="snacksimg" src={Snacks} alt="snacks"></img>
                </div>
                <div className="shopsnacks">Start snacking now</div>
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
