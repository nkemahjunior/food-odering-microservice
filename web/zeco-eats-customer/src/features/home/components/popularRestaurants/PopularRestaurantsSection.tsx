import Carousel from "@/shared/components/carousel/Carousel";
import SectionTitle from "@/shared/components/SectionTitle";
import { EmblaOptionsType } from "embla-carousel";

export default function PopularRestaurantsSection() {
  const OPTIONS: EmblaOptionsType = { loop: true, slidesToScroll: "auto" };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <section className="mx-sm mt-Ysm border-2 border-solid border-green-500  md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl  2xl:mx-xxl 2xl:mt-YXl">
      <div className="mb-Ysm lg:mb-Ylg 2xl:mb-YXl">
        <SectionTitle titleSM="ZecoEats Popular Restaurants" />
      </div>
      <Carousel slides={SLIDES} options={OPTIONS} />
    </section>
  );
}
