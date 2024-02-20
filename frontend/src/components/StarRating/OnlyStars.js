import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import "./OnlyStars.css"

const OnlyStars = ({ rating }) => {
  return (
    <div className='onlystarsreview'>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          className='onlystars'
          key={index}
          icon={index <= rating ? solidStar : regularStar}
        />
      ))}
    </div>
  );
};

export default OnlyStars;