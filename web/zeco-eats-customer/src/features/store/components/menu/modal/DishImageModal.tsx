import ImageContainer from "@/shared/components/image/ImageContainer";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function DishImageModal() {
  const router = useRouter();
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
    <div className="w-full lg:sticky lg:top-[8rem] lg:h-[35rem] lg:w-[50%]">
      <button
        className="absolute left-2 top-4 z-[1] flex items-center justify-center rounded-full bg-background p-3 hover:bg-backgroundShade1 lg:hidden"
        onClick={() => {
          router.back();
        }}
      >
        <span>
          <RxCross2 size={20} />
        </span>
      </button>

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
  );
}
