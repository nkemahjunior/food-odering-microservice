"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  usePrevNextButtons,
} from "@/shared/components/carousel/EmblaCarouselArrowBtns";
import "@/features/browseMenus/styles/foodCategoriesSliderStyle.css";
import Breakfast from "../icons/breakfast-svgrepo-com.svg";
import BBQ from "../icons/bbq-chi-ken-svgrepo-com.svg";
import Bakery from "../icons/bread-svgrepo-com.svg";
import FastFood from "../icons/fast-food-svgrepo-com.svg";
import Vegan from "../icons/salad-svgrepo-com.svg";
import Supper from "../icons/supper-restaurant-svgrepo-com.svg";
import Launch from "../icons/food-svgrepo-com.svg";
import FamilyMeals from "../icons/fried-chicken-meal-svgrepo-com.svg";
import Dessert from "../icons/pumpkin-food-fall-svgrepo-com.svg";
import Coffee from "../icons/coffee-svgrepo-com.svg"
import FruitJuice from "../icons/juice-svgrepo-com.svg"
import Soup from "../icons/soup-svgrepo-com.svg"
import Snack from "../icons/popcorn-svgrepo-com.svg"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function FoodCategoriesSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: "auto",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const foodCategoriesIcons = [
    { Icon: Breakfast, name: "Breakfast" },
    { Icon: Launch, name: "Lunch" },
    { Icon: Supper, name: "Supper" },
    { Icon: Bakery, name: "Bakery" },
    { Icon: FamilyMeals, name: "Family Meals" },
    { Icon: BBQ, name: "BBQ" },
    { Icon: FastFood, name: "Fast Food" },
    { Icon: Dessert, name: "Dessert" },
    { Icon: Vegan, name: "Vegan" },
    { Icon: Soup, name: "Soup" },
    { Icon: FruitJuice, name: "Fruit Juice" },
    { Icon: Coffee, name: "Coffee" },
    { Icon: Snack, name: "Snacks" },
  ];

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {foodCategoriesIcons.map((el, i) => (
            <div
              className="embla__slide flex cursor-pointer flex-col items-center space-y-2"
              key={i}
            >
              <el.Icon width={35} height={35} />
              <p className="text-xs font-medium "> {el.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-0 top-4 m-auto hidden touch-manipulation rounded-full bg-background p-1 text-black hover:bg-stone-200 disabled:hidden lg:block lg:p-2"
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
      >
        <BsArrowLeft size={20} />
      </button>
      <button
        className="absolute right-0 top-4 m-auto hidden touch-manipulation rounded-full bg-background p-1 text-black hover:bg-stone-200 disabled:hidden lg:block lg:p-2"
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
      >
        <BsArrowRight size={20} />
      </button>
    </div>
  );
}

//CATEGORIES
/**
 * breakfast
 * launch
 * super
 * BBQ
 * Family Meals
 * Cameroonian
 * Salads
 * Bakery
 * Ice Cream
 * Fast Foods
 * Vegan
 * Desserts and sweets
 */
