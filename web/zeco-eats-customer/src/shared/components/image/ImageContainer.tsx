import Image from "next/image";
import { MutableRefObject, RefAttributes } from "react";

interface FnProps {
  height: string;
  width: string;
  src: string;
  imageAlt: string;
  quality?: number;
  roundedCorners?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  events?: React.DOMAttributes<any>;
  ref?: MutableRefObject<HTMLImageElement | null>;
  style?: React.CSSProperties;
  className?:string
}

export default function ImageContainer({
  height,
  width,
  src,
  imageAlt,
  quality = 75,
  events,
  roundedCorners,
  objectFit = "cover",
  ref,
  style,
  className
}: FnProps) {
  return (
    <div
      className={`relative ${height} ${width} overflow-hidden ${roundedCorners} ${className} `}
    >
      <Image
        ref={ref}
        {...events}
        src={src}
        alt={imageAlt}
        fill
        quality={quality}
        style={{
          objectFit: objectFit,
          ...style,
        }}
      />
    </div>
  );
}
