import Footer from "./Footer";
import FooterCopyRight from "./FooterCopyRight";

export default function FooterSection() {
  
  return (
    <section className="mx-sm mt-Ysm bg-background md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl 2xl:mx-xxl 2xl:mt-YXl">
      <div className="px-4 py-12 md:px-12 lg:px-4 lg:py-16 2xl:py-20">
        <Footer />
      </div>
     <FooterCopyRight/>
    </section>
  );
}
