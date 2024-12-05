"use client";

import useEmblaCarousel from "embla-carousel-react";
import "../../styles/DishesCarouselMobile.css";
import DishCard from "./DishCard";

export default function DishesCarouselMobile() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: "auto",
  });
  const slides = Array.from(Array(10).keys());

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((el) => (
            <div className="embla__slide cursor-pointer" key={el}>
              <DishCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
