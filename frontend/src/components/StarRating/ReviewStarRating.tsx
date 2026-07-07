import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface ReviewStarRatingProps {
  rating: number;
  totalRatings: number;
}

export default function ReviewStarRating({
  rating,
  totalRatings,
}: ReviewStarRatingProps) {
  return (
    <div className="flex items-center gap-1 text-base">
      <span>{rating}</span>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          className="ml-0.5 text-amz-star"
          icon={index <= rating ? solidStar : regularStar}
        />
      ))}
      <span className="ml-1 text-xs text-amz-link sm:text-sm">
        {totalRatings} ratings
      </span>
    </div>
  );
}
