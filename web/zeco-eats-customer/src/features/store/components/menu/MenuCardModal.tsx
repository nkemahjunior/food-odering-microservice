"use client";
import ImageContainer from "@/shared/components/image/ImageContainer";
import CardTitle from "@/shared/components/text/CardTitle";
import Heading from "@/shared/components/text/Heading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

export default function MenuCardModal({
  gapx = "gap-x-8",
  isModal,
}: {
  gapx?: string;
  isModal?: boolean;
}) {
  const router = useRouter();
  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [hover, setHover] = useState(false);
  const [translateProps, setTranslateProps] = useState<
    Record<string, number | undefined>
  >({
    y: undefined,
    x: undefined,
  });

  const scaleAndMoveImage = (e: React.PointerEvent) => {
    if (imageRef.current) {
      setHover(true);
      const imageRect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - imageRect.left;
      const y = e.clientY - imageRect.top;

      const imageWidth = imageRect.right - imageRect.left;
      const imageHeight = imageRect.bottom - imageRect.top;

      // Convert px to percentages
      const xPercentage = (x / imageWidth) * 100;
      const yPercentage = (y / imageHeight) * 100;

      setTranslateProps({
        x: xPercentage,
        y: yPercentage,
      });
    }
  };

  return (
    <div
      className={` ${!isModal ? "flex w-full justify-center bg-[#f7f7f7] lg:bg-white" : " "}`}
    >
      {" "}
      <div
        className={`${!isModal ? "lg:h-[32rem]" : "h-[35rem]"} w-full lg:w-[65rem]`}
      >
        <button
          className={`${!isModal ? "hidden items-center lg:flex" : "hidden"} mb-4 w-full space-x-2 font-medium`}
          onClick={() => {
            router.back();
          }}
        >
          <span>
            <BiArrowBack />
          </span>
          <span>Back to restaurant name</span>
        </button>
        <div
          className={`flex h-full w-full flex-col space-y-4 lg:flex-row lg:space-y-0 ${gapx}`}
        >
          <div className="relative w-full lg:w-[50%]">
            <div className="absolute left-2 top-4 z-[1] lg:hidden">
              <button
                className="flex items-center justify-center rounded-full bg-background p-3 hover:bg-backgroundShade1"
                onClick={() => {
                  router.back();
                }}
              >
                <span>
                  <RxCross2 size={20} />
                </span>
              </button>
            </div>
            <ImageContainer
              ref={imageRef}
              className="cursor-zoom-in transition-transform duration-300"
              style={{
                transform: hover ? `scale(2) ` : "scale(1) ",
                transformOrigin: `${translateProps.x}% ${translateProps.y}%`,
              }}
              events={{
                onPointerMove: (e: React.PointerEvent) => scaleAndMoveImage(e),
                onPointerLeave: () => setHover(false),
              }}
              height="lg:h-full h-[12rem]"
              src="/devImages/food1.webp"
              width=" w-full"
              imageAlt="picture of this dish"
              quality={100}
            />
          </div>

          <div className="flex w-full flex-col justify-center space-y-6 px-4 lg:w-[50%] lg:px-0">
            <div className="space-y-2 border-b-[1px] border-solid border-backgroundBorder pb-6">
              <Heading text="Pesto Mozzarella" />
              <p className="text-lg text-storeTextColorTint lg:text-xl">
                £99.99
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque velit id quam asperiores officiis illum at veniam
                deleniti! Tenetur minima enim harum placeat fuga eaque?
              </p>
            </div>

            <div className="space-y-2">
              <CardTitle text="Special Instructions" />

              <textarea
                placeholder="Add a note here. Please contact the restaurant directly if you have an allergy"
                className={`h-[5rem] w-full resize-none text-wrap rounded-lg border-2 border-solid border-transparent bg-backgroundShade1 p-4 placeholder:text-storeTextColorTint focus:border-secondary focus:bg-white`}
              />
              <p className="text-storeTextColorTint">
                You may be charged for extras
              </p>

              <div className="flex w-[5rem] items-center justify-center rounded-lg bg-backgroundShade1">
                <select name="" id="" className="w-[85%] py-2 outline-none">
                  {numbers.map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pb-2k sticky bottom-0 -mx-4 bg-white px-2 py-4 lg:static lg:bottom-auto lg:-mx-0 lg:px-0 lg:py-0">
              {/* <div className="border-green-70 h-[0.5rem] w-full border-2 border-solid bg-[#03081f] blur-lg lg:hidden mb-8"></div> */}
              <div className="space-y-4 font-medium transition-colors duration-300">
                <button className="flex h-[4rem] w-full items-center justify-center rounded-lg bg-secondary text-white hover:bg-secondaryTint">
                  <span>
                    Add {3} to order &middot; £{288.6}
                  </span>
                </button>

                {!isModal ? null : (
                  <Link
                    href="storeName/dish-details"
                    className="flex h-[4rem] w-full items-center justify-center rounded-lg bg-background text-secondary hover:bg-backgroundShade2"
                  >
                    <span>see details</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
