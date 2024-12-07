
import StoreHeaderImage from "./StoreHeaderImage";
import StoreTitleAndDesc from "./StoreTitleAndDesc";
import StoreLocationAndInfo from "./StoreLocationAndInfo";
import StoreRatings from "./StoreRatings";

export default function StoreHeader() {
  return (
    <div className="space-y-8">
      <div className="-mt-[1.6rem] lg:mx-lg lg:mb-0 xl:mx-xl 2xl:mx-[14rem]">
        <StoreHeaderImage />
      </div>
      <div className="mx-sm  space-y-4 lg:space-y-8 md:mx-md lg:mx-lg xl:mx-xl 2xl:mx-[14rem]">
        <StoreTitleAndDesc />
        <StoreLocationAndInfo />
        <StoreRatings />
      </div>
    </div>
  );
}
