import Hero from "../components/hero/Hero";
import DiscountSection from "../components/discounts/DiscountSection";
import PopularCategoriesSection from "../components/popularCategories/PopularCategoriesSection";
import PopularRestaurantsSection from "../components/popularRestaurants/PopularRestaurantsSection";
import PartnerWithUsSection from "../components/partnerWithUs/PartnerWithUsSection";
import KnowAboutUsSection from "../components/knowAboutUs/KnowAboutUsSection";
import CompanyStatsSection from "../components/companyStats/CompanyStatsSection";

export default function HomeUi() {
  return (
    <>
      <Hero />
      <DiscountSection />
      <PopularCategoriesSection />
      <PopularRestaurantsSection />
      <PartnerWithUsSection />
      <KnowAboutUsSection />
      <CompanyStatsSection />
    </>
  );
}
