"use client"
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla h-32" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide h border-2 border-solid border-green-700">
          Slide 1
        </div>
        <div className="embla__slide h-full border-solid border-green-700">
          Slide 2
        </div>
        <div className="embla__slide h-full border-solid border-green-700">
          Slide 3
        </div>
      </div>
    </div>
  );
}
