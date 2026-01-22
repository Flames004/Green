import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({
  rating = 0,
  editable = false,
  onChange = () => {},
  size = 18,
}) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hovered
          ? star <= hovered
          : star <= rating;

        return (
          <Star
            key={star}
            size={size}
            className={`cursor-pointer transition ${
              filled
                ? "text-emerald-700 fill-emerald-700"
                : "text-gray-300"
            }`}
            onClick={() => editable && onChange(star)}
            onMouseEnter={() => editable && setHovered(star)}
            onMouseLeave={() => editable && setHovered(0)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
