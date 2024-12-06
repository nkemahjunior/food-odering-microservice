interface sliderLineProps {
  refProp: React.RefObject<HTMLDivElement>;
  leftPosition: string;
  lgLeftPosition: string;
  width: string;
  lgWidth: string;
  isGrabbing: boolean;
  sliderBallPosition: number;
  direction: "under" | "over";
  test?: boolean;
}

export default function SliderLine({
  refProp,
  leftPosition,
  lgLeftPosition,
  width,
  lgWidth,
  isGrabbing,
  sliderBallPosition,
  direction,
  test,
}: sliderLineProps) {
  return (
    <div
      ref={refProp}
      className={`absolute h-[2px] ${width} ${lgWidth} ${leftPosition} ${lgLeftPosition} ${
        sliderBallPosition > refProp.current?.getBoundingClientRect().x! &&
        direction == "under"
          ? "bg-secondary"
          : "bg-background"
      } ${
        sliderBallPosition <= refProp.current?.getBoundingClientRect().x! &&
        direction == "over"
          ? "bg-secondary"
          : "bg-background"
      } ${isGrabbing && "cursor-grab"}`}
    >
      {/*test && "*"*/}
    </div>
  );
}
