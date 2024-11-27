import Carousel from "@/shared/components/carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";

export default function DiscountDishes() {
  const OPTIONS: EmblaOptionsType = { loop: true, slidesToScroll: "auto" };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="">
      <Carousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
