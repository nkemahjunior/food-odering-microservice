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
    <div>
      {/* <DishCard /> */}

      {isMobile ? (
        <DishesCarouselMobile />
      ) : (
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 bg-background">
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
          <DishCard />
        </div>
      )}
    </div>
  );
}
