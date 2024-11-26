
import Carousel from "@/shared/components/carousel/Carousel";
import DiscountDishes from "./DiscountDishes";
import DiscountHead from "./DiscountHead";

 
 
export default function DiscountSection() {
    return (
      <section className="xl:mx-lg 2xl:mx-xxl mx-sm  mt-spaceXsm  lg:mt-spaceXlg">
        <DiscountHead />
        <DiscountDishes />
      </section>
      
    );
}