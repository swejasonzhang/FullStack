import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarHover = (hoveredRating) => {
    setRating(hoveredRating);
  };

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    onChange(clickedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          icon={index <= rating ? solidStar : regularStar}
          onMouseEnter={() => handleStarHover(index)}
          onClick={() => handleStarClick(index)}
        />
      ))}
      out of 5
    </div>
  );
};

export default StarRating;