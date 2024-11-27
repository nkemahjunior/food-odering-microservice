import SectionTitle from "@/shared/components/SectionTitle";
import FAQ1 from "./FAQ1";
import FAQ from "./FAQ";


export default function KnowAboutUsSection() {
  return (
    <section className="border-h2 mx-sm mt-Ysm border-solid border-emerald-600 bg-backgroundd md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl 2xl:mx-xxl 2xl:mt-YXl">
      <div className="mb-Ysm flex justify-center lg:mb-Ylg 2xl:mb-YXl ">
        <SectionTitle titleSM="Know more about us!" />
      </div>

      <div className="space-y-10 bg-secondary py-8 xl:space-y-0">
        <div className="space-y-8 lg:space-y-10 2xl:space-y-12 px-4 lg:px-12">
          <FAQ1 question="How does Zeco Eats work" />
          <FAQ
            question="Can I track my order in real-time?"
            answer="Yes, we offer real-time order tracking. You can monitor your package's location and status through the tracking link provided after your purchase."
          />
          <FAQ
            question="Are there any special discounts or promotions available?"
            answer="Yes, we frequently offer special discounts and promotions. Check the 'Offers' section on our website or subscribe to our newsletter to stay updated."
          />
          <FAQ
            question="What payment methods are accepted?"
            answer="We accept major payment methods, including credit/debit cards, PayPal, and other region-specific payment options."
          />
        </div>
      </div>
    </section>
  );
}
