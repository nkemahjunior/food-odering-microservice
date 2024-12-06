export default function Ratings() {
  return (
    <div className="relative h-4 border-0 border-solid border-purple-900 text-sm">
      <div className="absolute left-0">3+</div>
      <div className="absolute left-[4.2rem] lg:left-[5.5rem]">3.5+</div>
      <div className="absolute left-[9.4rem] lg:left-[12.3rem]">4+</div>
      <div className="absolute left-[13.8rem] top-0 lg:left-[18.3rem]">
        4.5+
      </div>
      <div className="absolute left-[18.6rem] top-0 lg:left-[24.5rem]">5</div>
    </div>
  );
}
