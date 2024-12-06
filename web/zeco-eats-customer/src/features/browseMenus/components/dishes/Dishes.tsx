"use client";
import { useEffect, useState } from "react";
import DishesCarouselMobile from "./DishesCarouselMobile";
import DishCard from "./DishCard";

export default function Dishes() {
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
    <div className="mt-6">
      {/* <DishCard /> */}

      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4">
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        
      </div>
    </div>
  );
}
