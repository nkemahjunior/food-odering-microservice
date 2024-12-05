import SectionTitle from "@/shared/components/SectionTitle";
import PopularCategoriesCard from "./PopularCategoriesCard";


 
 
export default function PopularCategoriesSection() {
    return (
      <section className="md:mx-md xl:mx-xl 2xl:mt-YXl mt-Ysm lg:mt-Ylg mx-sm  bg-background lg:mx-lg xl:bg-white 2xl:mx-xxl">
        <div className="2xl:mb-YXl mb-Ysm lg:mb-Ylg">
          <SectionTitle titleSM="ZecoEats Popular Categories" />
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