import { BsArrowRight } from "react-icons/bs";
import ImageContainer from "../image/ImageContainer";
import CardTitle from "../text/CardTitle";

 
 
export default function RestaurantTitleCart() {
    return (
      <div className="flex w-full justify-between border-2 border-solid border-red-600 ">
        <div className="flex items-center space-x-4">
          <ImageContainer
            height="h-[3rem]"
            width="w-[3rem]"
            imageAlt="photo of restaurant"
            src="/devImages/food1.webp"
            className="rounded-full"
          />

          <div className="flex flex-col space-y-1">
            <CardTitle text="The Place Restaurant" className="font-semibold text-secondary" />
            <span className="text-storeTextColorTint">412 Brixton Road</span>
          </div>
        </div>

        <button className="flex items-center justify-center">
          <span className="text-stone-800">
            <BsArrowRight />
          </span>
        </button>
      </div>
    );
}