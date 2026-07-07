import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface StarRatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  initialRating = 0,
  onChange,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);

  const set = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          icon={index <= rating ? solidStar : regularStar}
          onClick={() => set(index)}
          className="cursor-pointer text-xl text-amz-star"
        />
      ))}
      {rating > 0 && (
        <button
          type="button"
          onClick={() => set(0)}
          className="ml-2 text-sm text-amz-link hover:text-amz-link-hover hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
