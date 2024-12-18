import ImageContainer from "../image/ImageContainer";
import CartIncreaseDecreaseQty from "./CartIncreaseDecreaseQty";

 
 
export default function CartItem() {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-[20%]">
          <ImageContainer
            height="h-[5rem]"
            width="w-full"
            imageAlt="photo of restaurant"
            src="/devImages/food1.webp"
            className="rounded-lg"
          />
        </div>

        <div className="flex w-full flex-col justify-center text-storeTextColorTint">
          <p className="text-base font-semibold text-secondary">
            Hot Pepper Soup
          </p>
          <div className="flex flex-wrap items-center space-x-1">
            {" "}
            <span>Sauce:</span>
            <span>Sauce stew (£2.00),</span>
            <span>Groundnut stew (£4.00)</span>
            <span>Sauce stew (£2.00),</span>
            <span>Groundnut stew (£4.00)</span>
            <span>Sauce stew (£2.00),</span>
            <span>Groundnut stew (£4.00)</span>
          </div>

          <p className="mt-2 font-medium">£116.5</p>
        </div>

        <div className="">
          <CartIncreaseDecreaseQty />
        </div>
      </div>
    );
}