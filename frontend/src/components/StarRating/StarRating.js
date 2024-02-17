import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import "./StarRating.css"

const StarRating = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    if (onChange) {
      onChange(clickedRating);
    }
  };

  const clearRating = () => {
    setRating(0);
    if (onChange) {
      onChange(0);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          icon={index <= rating ? solidStar : regularStar}
          onClick={() => handleStarClick(index)}
          className= "staricon"
        />
      ))}
      {rating > 0 && <div className="clearrating" onClick={clearRating}>Clear </div>}
    </div>
  );
};

export default StarRating;

