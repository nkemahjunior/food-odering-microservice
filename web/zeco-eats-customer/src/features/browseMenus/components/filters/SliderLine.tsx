 interface sliderLineProps {
   refProp: React.RefObject<HTMLDivElement>;
   leftPosition: string;
   lgLeftPosition: string;
   width: string;
   lgWidth: string;
   isGrabbing: boolean;
   sliderBallPosition: number;
 }
 
export default function SliderLine({
  refProp,
  leftPosition,
  lgLeftPosition,
  width,
  lgWidth,
  isGrabbing,
  sliderBallPosition,
}: sliderLineProps) {
   return (
     <div
       ref={refProp}
       className={`absolute h-[2px] ${width} ${lgWidth} ${leftPosition} ${lgLeftPosition} ${
         sliderBallPosition > refProp.current?.getBoundingClientRect().x!
           ? "bg-secondary"
           : "bg-background"
       } ${isGrabbing && "cursor-grab"}`}
     ></div>
   );
}