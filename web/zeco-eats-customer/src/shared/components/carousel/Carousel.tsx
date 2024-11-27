"use client";
import "@/shared/styles/carousel.css"
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowBtns";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

export default function Carousel({slides, options}:PropType) {

  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

   const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
     const autoplay = emblaApi?.plugins()?.autoplay;
     if (!autoplay) return;

     const resetOrStop =
       autoplay.options.stopOnInteraction === false
         ? autoplay.reset
         : autoplay.stop;

     resetOrStop();
   }, []);

   const {
     prevBtnDisabled,
     nextBtnDisabled,
     onPrevButtonClick,
     onNextButtonClick,
   } = usePrevNextButtons(emblaApi, onNavButtonClick);
  
  return (
    <section className="embla border-red-700 border-solid border-4 ">
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container border-solid border-2 border-yellow-400  ">
          {slides.map((index) => (
            <div className="embla__slide border-solid border-green-800 border-2 w-[200rem]" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );

  // const scrollPrev = useCallback(() => {
  //   console.log("prev");
  //   if (emblaApi) emblaApi.scrollPrev();
  // }, [emblaApi]);

  // const scrollNext = useCallback(() => {
  //   console.log("next");
  //   if (emblaApi) emblaApi.scrollNext();
  // }, [emblaApi]);

  // useEffect(() => {
  //   if (emblaApi) {
  //     console.log(emblaApi.slideNodes()); // Access API
  //   }
  // }, [emblaApi]);

  // return (
  //   <div className="embla">
  //     <div className="embla__viewport" ref={emblaRef}>
  //       <div className="overflow-hidden" /*ref={emblaRef}*/>
  //         <div className="flex h-[25rem] gap-x-4">
  //           <div className="w-fullp w-[60%] min-w-0 flex-none border-2 border-solid border-green-700">
  //             Slide 1
  //           </div>
  //           <div className="w-fullp w-[60%] min-w-0 flex-none border-2 border-solid border-green-700">
  //             Slide 2
  //           </div>
  //           <div className="w-fullp w-[60%] min-w-0 flex-none border-2 border-solid border-green-700">
  //             Slide 3
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <button className="embla__prev" onClick={scrollPrev}>
  //       Prev
  //     </button>
  //     <button className="embla__next" onClick={scrollNext}>
  //       Next
  //     </button>
  //   </div>
  // );
}

const sliderData = [
  {
    id: 1,
    title: "Serene Nature Scene with Sunlight Streaming Through Trees",
    url: "/devImages/profile.png",
  },
  {
    id: 2,
    title: "Tranquil Beach with Gentle Waves and Clear Blue Sky",
    url: "/hero/heroImg1.png",
  },
  {
    id: 3,
    title: "Lush Forest Scene with Rays of Sunlight Peeking Through",
    url: "/hero/heroImg2.png",
  },
  {
    id: 4,
    title: "Elegant Woman in City Setting with a Chic Attitude",
    url: "/devImages/profile.png",
  },
  {
    id: 5,
    title: "Majestic Tree in Vibrant Autumn Colors",
    url: "/devImages/profile.png",
  },
  {
    id: 6,
    title: "Serene Nature Scene with Sunlight Streaming Through Trees",
    url: "/devImages/profile.png",
  },
  {
    id: 7,
    title: "Tranquil Beach with Gentle Waves and Clear Blue Sky",
    url: "/devImages/profile.png",
  },
  {
    id: 8,
    title: "Lush Forest Scene with Rays of Sunlight Peeking Through",
    url: "/devImages/profile.png",
  },
  {
    id: 9,
    title: "Elegant Woman in City Setting with a Chic Attitude",
    url: "/devImages/profile.png",
  },
  {
    id: 10,
    title: "Majestic Tree in Vibrant Autumn Colors",
    url: "/devImages/profile.png",
  },
];

// export default function Carousel() {
//   // const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

//     const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

//     return (
//       <div className="embla" ref={emblaRef}>
//         <div className="embla__container">
//           <div className="embla__slide">Slide 1</div>
//           <div className="embla__slide">Slide 2</div>
//           <div className="embla__slide">Slide 3</div>
//         </div>
//       </div>
//     );

//   // return (
//   //   <div
//   //     className="mx-auto flex h-screen w-full items-center justify-center overflow-hidden bg-gray-200"
//   //     ref={emblaRef}
//   //   >
//   //     <div className="flex">
//   //       {sliderData?.map((item) => {
//   //         return (
//   //           <div
//   //              className="embla__slide relative h-full w-full" key={item.id}>

//   //             {/* the image */}
//   //             <img className="h-full w-full" src={item.url} alt="" />

//   //             {/* title/subtitle */}
//   //             <h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 translate-y-[3rem] transform bg-cyan-600 px-2 py-2 text-xl font-extrabold text-white md:w-auto md:translate-y-[9rem] lg:translate-y-48 lg:px-8 lg:py-4 lg:text-2xl">
//   //               {item.title}
//   //             </h1>
//   //           </div>
//   //         );
//   //       })}
//   //     </div>
//   //   </div>
//   // );
// }
