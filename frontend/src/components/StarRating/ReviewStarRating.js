import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import "./ReviewStarRating.css"

const ReviewStarRating = ({ rating, totalRatings }) => {
  return (
    <div className='everythingreview'>{rating}
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          className='reviewstar'
          key={index}
          icon={index <= rating ? solidStar : regularStar}
        />
      ))}
      &nbsp;
      {totalRatings} ratings
    </div>
  );
};

export default ReviewStarRating;
