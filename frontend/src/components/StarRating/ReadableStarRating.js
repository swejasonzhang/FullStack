import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const ReadOnlyStarRating = ({ rating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          icon={index <= rating ? solidStar : regularStar}
        />
      ))}
      &nbsp;
      {rating} out of 5
    </div>
  );
};

export default ReadOnlyStarRating;
