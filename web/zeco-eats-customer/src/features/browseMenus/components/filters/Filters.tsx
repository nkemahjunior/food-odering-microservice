import FilterDeliveryFee from "./FilterDeliveryFee";
import FilterUnder30Min from "./FilterUnder30Min";
import FilterHighestRated from "./FilterHighestRated";
import FilterRating from "./FilterRating";
import FilterPrice from "./FilterPrice";
import ResultsAndReset from "./ResultsAndReset";

export default function Filters() {
  return (
    <div className="mt-6 space-y-6">
      <div className="scrollbar-hidden flex w-full space-x-4 overflow-x-auto">
        <FilterDeliveryFee />
        <FilterUnder30Min />
        <FilterHighestRated />
        <FilterRating />
        <FilterPrice />
      </div>
      <ResultsAndReset />

      {/* <div className="absolute inset-0 z-[8] bg-red-400">Overlay</div> */}
    </div>
  );
}
