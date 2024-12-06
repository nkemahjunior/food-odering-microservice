"use client";
import Carousel from "@/shared/components/carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState } from "react";
import PopularRestaurantLargeScreen from "./PopularRestaurantsLargeScreen";
import Heading from "@/shared/components/text/Heading";

export default function PopularRestaurantsSection() {
  const OPTIONS: EmblaOptionsType = { loop: true, slidesToScroll: "auto" };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    function checkScreenWidth() {
      window.screen.width < 768 ? setIsMobile(true) : setIsMobile(false);
    }
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return (
    <section className="mx-sm mt-Ysm md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl 2xl:mx-xxl 2xl:mt-YXl">
      <div className="mb-Ysm lg:mb-Ylg 2xl:mb-YXl">
        <Heading text="ZecoEats Popular Restaurants" />
      </div>
      {isMobile ? (
        <Carousel slides={SLIDES} options={OPTIONS} />
      ) : (
        <PopularRestaurantLargeScreen />
      )}
    </section>
  );
}
