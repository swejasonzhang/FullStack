import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface OnlyStarsProps {
  rating: number;
}

export default function OnlyStars({ rating }: OnlyStarsProps) {
  return (
    <div className="pl-1.75 text-xs">
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          className="ml-0.5 text-amz-star"
          icon={index <= rating ? solidStar : regularStar}
        />
      ))}
    </div>
  );
}
