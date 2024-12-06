import Heading from "@/shared/components/text/Heading";
import { BiStar } from "react-icons/bi";

export default function StoreTitleAndDesc() {
  const restaurantKeywords = [
    // use this info to search for restaurants on the platform
    "Pizza",
    "American",
    "Italian",
    "Pasta",
    "Burgers",
    "Kebab",
    "Chicken",
    "Fried Chicken",
    "Halal",
    "Vegetarian",
    "Vegan Friendly",
    "Kids Friendly",
    "Sandwich",
    "Wraps",
    "Wings",
    "Salads",
    "Drinks",
    "Desserts",
    "Family Meals",
    "Children",
  ];

  return (
    <div className="text-storeTextColorTint flex w-full justify-between">
      <div className="max-w-[70%] space-y-2 border-2 border-solid border-red-600">
        <Heading text="My Place Restaurant" />

        <div className="">
          <p className="flex flex-wrap space-x-1">
            <span className="font-medium text-black">4.0</span>{" "}
            <span>
              {" "}
              <BiStar />
            </span>
            <span>(86)</span>
            <span className="text-nowrap">£2 Delivery fee &middot;</span>
            {restaurantKeywords.map((el) => (
              <span className="text-nowrap">{el}&nbsp;&middot;</span>
            ))}
          </p>
        </div>
        <p> Min Order value for this store is £15</p>
      </div>

      <div className="basis- flex h-fit text-nowrap rounded-lg border-2 border-solid border-backgroundBorder px-2 py-1">
        <div className="h-fit border-r-2 border-solid border-backgroundBorder px-8 py-2">
          <p className="font-medium text-black">£2 Delivery fee</p>{" "}
          <p>Pricing & fees</p>
        </div>
        <div className="h-fit px-8 py-2">
          <p className="font-medium text-black">20-40 min</p>{" "}
          <p>Delivery Time</p>
        </div>
      </div>
    </div>
  );
}
