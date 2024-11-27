import DiscountDishes from "./DiscountDishes";
import DiscountHead from "./DiscountHead";

export default function DiscountSection() {
  return (
    <section className="xl:mx-xl md:mx-md 2xl:mt-YXl mt-Ysm lg:mt-Ylg mx-sm lg:mx-lg 2xl:mx-xxl">
      <div className="2xl:mb-YXl mb-Ysm lg:mb-Ylg">
        <DiscountHead />
      </div>
      <DiscountDishes />
    </section>
  );
}
