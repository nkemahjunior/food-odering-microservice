import Rating from "@/shared/components/ratings/Rating";
import RatingText from "./RatingText";
import Heading from "@/shared/components/text/Heading";
import { BsArrowDown } from "react-icons/bs";
import Link from "next/link";
import ShowMoreRatings from "./ShowMoreRatings";

export default function StoreRatings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between lg:flex-none lg:justify-normal">
        <Heading text="Ratings and reviews" />
        <div className="w-fit lg:hidden">
          <ShowMoreRatings />
        </div>
      </div>
      <div className="flex w-full space-x-2 rounded-lg border-solid border-backgroundBorder lg:border-[1px] lg:py-2">
        <div className="flex w-[30%] flex-col items-center justify-center space-y-2 rounded-lg border-[1px] border-solid border-backgroundBorder p-2 lg:rounded-none lg:border-0 lg:p-0">
          <p className="text-base font-medium">4.5</p>
          <div>
            <Rating rating={4.5} />
          </div>
          <p className="text-xs">87 Ratings</p>
        </div>

        <div className="w-full space-y-4 rounded-lg border-[1px] border-solid border-backgroundBorder p-2 lg:w-[50%] lg:rounded-none lg:border-0 lg:p-0">
          <RatingText />
          <div className="hidden space-y-4 lg:block">
            <RatingText />

            <ShowMoreRatings />
          </div>
        </div>
      </div>
    </div>
  );
}
