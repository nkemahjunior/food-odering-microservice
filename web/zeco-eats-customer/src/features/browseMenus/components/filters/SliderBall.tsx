 interface sliderBallProps {
   sliderBallPosition: number;
   modalPosition: number;
   modalPadding: number;
   isMobile: boolean;
   onGrabSliderBall: () => void;
 }
 
export default function SliderBall({
  sliderBallPosition,
  modalPosition,
  modalPadding,
  isMobile,
  onGrabSliderBall,
}: sliderBallProps) {

  return (
    <div
      className="absolute -translate-y-[13px] cursor-grab touch-none select-none rounded-full bg-slate-50 p-3 shadow-inner shadow-secondary lg:-translate-y-[15px] lg:p-4"
      style={{
        left: `${sliderBallPosition - modalPosition - modalPadding - (!isMobile ? 8 : 8)}px`,
      }}
      onPointerDown={onGrabSliderBall}
    ></div>
  );
}