import ImageContainer from "@/shared/components/image/ImageContainer";
import CardTitle from "@/shared/components/text/CardTitle";
import Heading from "@/shared/components/text/Heading";
import { useRef, useState } from "react";

export default function MenuCardModal() {
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
      const image = imageRef.current;
      const imageRect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - imageRect.left;
      const y = e.clientY - imageRect.top;

      const imageWidth = imageRect.right - imageRect.left;
      const imageHeight = imageRect.bottom - imageRect.top;
      if (x > imageWidth / 2) console.log(" going right");
      else console.log("going left");

      // setTimeout(() => {
      //   setTranslateProps({
      //     y:200,
      //     x: 20,
      //   });
      // }, 0);

      // console.log("x , y ", x, y);
      // console.log("rect ", imageRect);
      // console.log("client x ", e.clientX);
      // console.log("client y ", e.clientY);

      // Calculate the percentage of the mouse position inside the image
      const xPercentage = (x / imageRect.width) * 100;
      const yPercentage = (y / imageRect.height) * 100;

      // Smoothly update translate values
      setTranslateProps({
        // x: x > imageWidth / 2 ? -xPercentage : xPercentage,
        // y: y < imageHeight / 2 ? yPercentage : -yPercentage,
        x: xPercentage,
        y: yPercentage,
      });
    }
  };

  return (
    <div className="h-[65dvh] w-[60vw]">
      <div className="flex h-full w-full gap-x-8">
        <ImageContainer
          ref={imageRef}
          className="transition-transform duration-300 cursor-zoom-in"
          style={{
            transform: hover
              ? `scale(1.2) translate(${translateProps.x}px, ${translateProps.y}px)`
              : "scale(1) translate(0, 0)",
          }}
          events={{
            onPointerMove: (e: React.PointerEvent) => scaleAndMoveImage(e), //scaleAndMoveImage,
            onPointerOut: () => setHover(false),
          }}
          height="h-full"
          src="/devImages/food1.webp"
          width="w-[50%]"
          imageAlt="picture of this dish"
          quality={100}
        />

        <div className="flex w-[50%] flex-col justify-center space-y-6">
          <div className="space-y-2 border-b-[1px] border-solid border-backgroundBorder pb-6">
            <Heading text="Pesto Mozzarella" />
            <p className="text-lg text-storeTextColorTint lg:text-xl">£99.99</p>
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
              className={`h-[5rem] w-full resize-none text-wrap rounded-lg border-2 border-solid border-transparent bg-backgroundShade1 p-4 focus:border-secondary focus:bg-white`}
            />
            <p className="text-storeTextColorTint">
              You may be charged for extras
            </p>

            <div>
              <select
                name=""
                id=""
                className="w-[5rem] rounded-lg bg-backgroundShade1 px-2 py-2 outline-none"
              >
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button className="flex h-[4rem] w-full items-center justify-center rounded-lg bg-secondary text-white hover:bg-secondaryTint">
              <span>
                Add {3} to order &middot; £{288.6}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
