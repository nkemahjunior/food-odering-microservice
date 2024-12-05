"use client";

import { useDeviceType } from "@/shared/hooks/useDeviceType";
import { truncate } from "fs/promises";
import { useEffect, useRef, useState } from "react";
import DisplaySelectedPrice from "./DisplaySelectedPrice";
import DeliveryPrices from "./DeleveryPrices";
import SliderLine from "./SliderLine";
import SliderBall from "./SliderBall";

export default function FilterSlider({
  modlaIsOpen,
  modalPosition,
  modalPadding,
}: {
  modlaIsOpen: boolean;
  modalPosition: number;
  modalPadding: number;
}) {
  const [selectedValue, setSelectedValue] = useState("1");
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [sliderBallPosition, setSliderBallPosition] = useState(0);
  const [positionOnSlider, setPositionOnSlider] = useState(0);
  const [slidePositions, setSlidePositions] = useState<number[]>([]);

  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);
  const ref4 = useRef<HTMLDivElement | null>(null);
  const positions = [ref1, ref2, ref3, ref4];

  const { isMobile } = useDeviceType();
  const slideMidPoint = isMobile ? 52 : 56; // in px

  useEffect(() => {
    if (ref1.current && ref2.current && ref3.current && ref4.current) {
      setSlidePositions([
        ref1.current.getBoundingClientRect().x,
        ref2.current.getBoundingClientRect().x,
        ref3.current.getBoundingClientRect().x,
        ref4.current.getBoundingClientRect().x,
      ]);

      setSliderBallPosition(ref1.current.getBoundingClientRect().x);
    }
  }, [modlaIsOpen, ref1, ref2, ref3, ref4]);

  useEffect(() => {
    if (sliderBallPosition === slidePositions[0]) setSelectedValue("1");
    if (sliderBallPosition === slidePositions[1]) setSelectedValue("2");
    if (sliderBallPosition === slidePositions[2]) setSelectedValue("3");
    if (sliderBallPosition === slidePositions[3]) setSelectedValue("4");
  }, [sliderBallPosition, slidePositions]);

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isGrabbing) return;
    const delay = 100;

    const selectNextPosition =
      positionOnSlider + 1 > 3 ? 3 : positionOnSlider + 1;

    const newSliderBallPosition =
      positions[selectNextPosition].current?.getBoundingClientRect().x;

    if (
      e.clientX >
      positions[positionOnSlider].current?.getBoundingClientRect().x! +
        slideMidPoint
    ) {
      setTimeout(() => {
        setSliderBallPosition(newSliderBallPosition!);
        setPositionOnSlider(selectNextPosition);
      }, delay);
    }

    if (
      e.clientX <
      positions[positionOnSlider].current?.getBoundingClientRect().x! -
        slideMidPoint
    ) {
      const selectPrevPosition =
        positionOnSlider - 1 < 0 ? 0 : positionOnSlider - 1;

      const newSliderBallPosition =
        positions[selectPrevPosition].current?.getBoundingClientRect().x;

      setTimeout(() => {
        setSliderBallPosition(newSliderBallPosition!);
        setPositionOnSlider(
          positionOnSlider - 1 < 0 ? 0 : positionOnSlider - 1,
        );
      }, delay);
    }
  };

  const moveBallOnClick = (e: React.MouseEvent) => {
    const mousePosition = e.clientX;

    if (mousePosition <= slidePositions[0] + slideMidPoint)
      setSliderBallPosition(slidePositions[0]);
    if (
      mousePosition >= slidePositions[0] + slideMidPoint &&
      mousePosition < slidePositions[1] + slideMidPoint
    )
      setSliderBallPosition(slidePositions[1]);
    if (
      mousePosition >= slidePositions[1] + slideMidPoint &&
      mousePosition < slidePositions[2] + slideMidPoint
    )
      setSliderBallPosition(slidePositions[2]);
    if (mousePosition >= slidePositions[2] + slideMidPoint)
      setSliderBallPosition(slidePositions[3]);
  };


  const onGrabSliderBall = () => {
    setIsGrabbing(true);
  };

  const onUnGrabSliderBall = () => {
    setIsGrabbing(false);
  };

  return (
    <div className="space-y-6">
      <DisplaySelectedPrice selectedValue={selectedValue} />
      <DeliveryPrices />

      <div
        className="relative h-[3rem] w-full touch-none select-none pt-5"
        onClick={moveBallOnClick}
        onPointerMove={handleMouseMove}
        onPointerUp={onUnGrabSliderBall}
      >
        <SliderLine
          refProp={ref1}
          leftPosition="left-0"
          lgLeftPosition="lg:left-0"
          width="w-[6.5rem]"
          lgWidth="lg:w-28"
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
        />
        <SliderLine
          refProp={ref2}
          leftPosition="left-[7rem]"
          lgLeftPosition="lg:left-[7.5rem]"
          width="w-[6.5rem]"
          lgWidth="lg:w-28"
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
        />
        <SliderLine
          refProp={ref3}
          leftPosition="left-[14rem]"
          lgLeftPosition="lg:left-[15rem]"
          width="w-[6.5rem]"
          lgWidth="lg:w-28"
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
        />
        <SliderLine
          refProp={ref4}
          leftPosition="left-[20.5rem]"
          lgLeftPosition="lg:left-[22rem]"
          width="w-[0.1px]"
          lgWidth=""
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
        />

        <SliderBall
          sliderBallPosition={sliderBallPosition}
          modalPosition={modalPosition}
          modalPadding={modalPadding}
          isMobile={isMobile}
          onGrabSliderBall={onGrabSliderBall}
        />
      </div>

      <div className="flex flex-col-reverse space-y-2 lg:flex-row lg:justify-end lg:space-x-4 lg:space-y-0">
        <button className="h-[3rem] w-full rounded-lg text-black hover:bg-background lg:w-[7rem]">
          <span>Reset</span>
        </button>
        <button className="h-[3rem] w-full rounded-lg bg-secondary text-white lg:w-[7rem]">
          <span>Apply</span>
        </button>
      </div>
    </div>
  );
}

// onTouchStart={() => {
//             console.log("touch startttttttttttttt");
//           }}
//           onTouchEnd={() => {
//             console.log("touch endddddddddddddddd");
//           }}
//           // onTouchMove={() => {
//           //   console.log("touch movinggggggggg");
//           // }}

/**
 *   const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isGrabbing) return;
    const movement = e.clientX - sliderBallPosition;

    console.log("initial, ", sliderBallPosition);
    console.log("initial2, ", positionOnSlider);
    console.log("clientX, " + e.clientX);
    console.log("movement, " + movement);

    const currentPos = positionOnSlider;
    const newSliderBallPosition =
      positions[
        currentPos + 1 > 3 ? 3 : currentPos + 1
      ].current?.getBoundingClientRect().x;

    if (
      e.clientX >
      positions[positionOnSlider].current?.getBoundingClientRect().x! +
        slideMidPoint
    ) {
      setTimeout(() => {
        console.log("1 second has passed for!");
        setSliderBallPosition(newSliderBallPosition!);
        setPositionOnSlider(currentPos + 1 > 3 ? 3 : currentPos + 1);
      }, 1000);
      //return;
    }

    console.log("ok11, " + sliderBallPosition!);
    console.log("ok22, " + e.clientX);

    // if(newSliderBallPosition! - e.clientX <50  ) return

    if (
      e.clientX <
      positions[positionOnSlider].current?.getBoundingClientRect().x! -
        slideMidPoint
    ) {
      // if (e.clientX - sliderBallPosition > slideMidPoint) {
      //   console.log("caught himmmmmmmmm");
      //   console.log(currentPos);
      //   return;
      // }

      console.log(" ok enter");
      console.log("enter client", e.clientX);
      console.log(
        "enter position",
        positions[positionOnSlider].current?.getBoundingClientRect().x! -
          slideMidPoint,
      );

      const newSliderBallPosition =
        positions[
          currentPos - 1 < 0 ? 0 : currentPos - 1
        ].current?.getBoundingClientRect().x;

      setTimeout(() => {
        console.log("1 second has passed revvvvvvvv!");
        setSliderBallPosition(newSliderBallPosition!);
        setPositionOnSlider(currentPos - 1 < 0 ? 0 : currentPos - 1);
      }, 1000);
    }
  };
 */
