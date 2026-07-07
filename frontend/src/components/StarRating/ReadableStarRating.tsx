import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface ReadOnlyStarRatingProps {
  rating: number;
}

export default function ReadOnlyStarRating({
  rating,
}: ReadOnlyStarRatingProps) {
  return (
    <div className="flex items-center text-base">
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          className="ml-0.5 text-amz-star"
          icon={index <= rating ? solidStar : regularStar}
        />
      ))}
      <span className="ml-2">{rating} out of 5</span>
    </div>
  );
}
