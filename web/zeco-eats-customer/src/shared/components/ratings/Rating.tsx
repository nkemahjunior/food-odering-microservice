import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

type fnProps = {
  rating: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  className?: string;
  textColor?:string
  
};

export default function Rating({
  rating,
  maxRating = 5,
    className = "",
  textColor
}: fnProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {stars.map((el) => (
        <span
          key={el}
          //    className={`cursor-pointer `}
        >
          {
            el <= Math.floor(rating) ? (
              <FaStar className={`${textColor ? textColor : 'text-yellow-500'}`} />
            ) : rating % 1 !== 0 && el  ==  Math.floor(rating) + 1 ? (
              <FaStarHalfStroke className={`${textColor ? textColor : 'text-yellow-500'}`} />
            ) : (
              <FaRegStar className="text-gray-400" />
            )

            // <FaRegStar className="text-gray-400" />
          }
        </span>
      ))}

      {/* {rating % 1 !== 0 && (
        <span className="">
          <FaStarHalfStroke className="strok -ml-4 text-yellow-500" />
        </span>
      )} */}
    </div>
  );
}
