"use client";

import { useDeviceType } from "@/shared/hooks/useDeviceType";
import { useEffect, useRef, useState } from "react";
import SliderLine from "./SliderLine";
import SliderBall from "./SliderBall";
import DisplaySelectedRating from "./DisplaySelectedRating";
import Ratings from "./Ratings";

export default function FilterRatingSlider({
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
  const ref5 = useRef<HTMLDivElement | null>(null);
  const positions = [ref1, ref2, ref3, ref4, ref5];

  const { isMobile } = useDeviceType();
  const slideMidPoint = isMobile ? 38.4 : 48; // in px

  useEffect(() => {
    if (
      ref1.current &&
      ref2.current &&
      ref3.current &&
      ref4.current &&
      ref5.current
    ) {
      setSlidePositions([
        ref1.current.getBoundingClientRect().x,
        ref2.current.getBoundingClientRect().x,
        ref3.current.getBoundingClientRect().x,
        ref4.current.getBoundingClientRect().x,
        ref5.current.getBoundingClientRect().x,
      ]);

      //24, 120, 216, 312, 388.796875]
      //   setSliderBallPosition(ref1.current.getBoundingClientRect().x);
      setSliderBallPosition(ref3.current.getBoundingClientRect().x);
    }
  }, [modlaIsOpen, ref1, ref2, ref3, ref4, ref5]);

  useEffect(() => {
    if (sliderBallPosition === slidePositions[0]) setSelectedValue("3");
    if (sliderBallPosition === slidePositions[1]) setSelectedValue("3.5");
    if (sliderBallPosition === slidePositions[2]) setSelectedValue("4");
    if (sliderBallPosition === slidePositions[3]) setSelectedValue("4.5");
    if (sliderBallPosition === slidePositions[4]) setSelectedValue("5");
  }, [sliderBallPosition, slidePositions]);

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isGrabbing) return;
    const delay = 100;
    const numOfSlideLines = 4

    const selectNextPosition =
      positionOnSlider + 1 > numOfSlideLines
        ? numOfSlideLines
        : positionOnSlider + 1;

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
    if (
      mousePosition >= slidePositions[2] + slideMidPoint &&
      mousePosition < slidePositions[3] + slideMidPoint
    )
      setSliderBallPosition(slidePositions[3]);
    if (mousePosition >= slidePositions[3] + slideMidPoint)
      setSliderBallPosition(slidePositions[4]);
  };

  const onGrabSliderBall = () => {
    setIsGrabbing(true);
  };

  const onUnGrabSliderBall = () => {
    setIsGrabbing(false);
  };

  return (
    <div className="space-y-6">
      <DisplaySelectedRating selectedValue={selectedValue} />
      <Ratings />

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
          width="w-[4.8rem]"
          lgWidth="lg:w-24"
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
          direction="over"
        />
        <SliderLine
          refProp={ref2}
          leftPosition="left-[5rem]"
          lgLeftPosition="lg:left-[6.5rem]"
          width="w-[4.8rem]"
          lgWidth="lg:w-24"
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
          direction="over"
        />
        <SliderLine
          refProp={ref3}
          leftPosition="left-[10rem]"
          lgLeftPosition="lg:left-[13rem]"
          width="w-[4.8rem]"
          lgWidth="lg:w-24"
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
          direction="over"
        />
        <SliderLine
          refProp={ref4}
          leftPosition="left-[15rem]"
          lgLeftPosition="lg:left-[19.5rem]"
          width="w-[4.8rem]"
          lgWidth="lg:w-24"
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
          direction="over"
        />
        <SliderLine
          refProp={ref5}
          leftPosition="left-[19rem]"
          lgLeftPosition="lg:left-[24rem]"
          width="w-[8px]"
          lgWidth=""
          isGrabbing={isGrabbing}
          sliderBallPosition={sliderBallPosition}
          direction="over"
          test={true}
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
        <button className="h-[3rem] w-full rounded-lg font-medium text-black transition-colors duration-300 hover:bg-backgroundShade2 lg:w-[7rem]">
          <span>Reset</span>
        </button>
        <button className="h-[3rem] w-full rounded-lg bg-secondary font-medium text-white transition-colors duration-300 hover:bg-secondaryTint lg:w-[7rem]">
          <span>Apply</span>
        </button>
      </div>
    </div>
  );
}
