
import Heading from "@/shared/components/text/Heading";
import PopularCategoriesCard from "./PopularCategoriesCard";

export default function PopularCategoriesSection() {
  return (
    <section className="mx-sm mt-Ysm bg-background md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl xl:bg-white 2xl:mx-xxl 2xl:mt-YXl">
      <div className="mb-Ysm lg:mb-Ylg 2xl:mb-YXl">
        <Heading text="ZecoEats Popular Categories" />
      </div>

      <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-3 md:gap-x-2 lg:gap-x-6 xl:gap-x-14 2xl:grid-cols-6 2xl:gap-x-4">
        <PopularCategoriesCard />
        <PopularCategoriesCard />
        <PopularCategoriesCard />
        <PopularCategoriesCard />
        <PopularCategoriesCard />
        <PopularCategoriesCard />
      </div>
    </section>
  );
}
