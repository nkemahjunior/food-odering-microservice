import FAQ1 from "./FAQ1";
import FAQ from "./FAQ";
import Heading from "@/shared/components/text/Heading";

export default function KnowAboutUsSection() {
  return (
    <section className="border-h2 bg-backgroundd mx-sm mt-Ysm border-solid border-emerald-600 md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl 2xl:mx-xxl 2xl:mt-YXl">
      <div className="mb-Ysm flex justify-center lg:mb-Ylg 2xl:mb-YXl">
        <Heading text="Know more about us!" />
      </div>

      <div className="space-y-10 bg-secondary py-8 xl:space-y-0">
        <div className="space-y-8 px-4 lg:space-y-10 lg:px-12 2xl:space-y-12">
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
