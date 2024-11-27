import PartnerCard from "./PartnerCard";

export default function PartnerWithUsSection() {
  return (
    <section className="mx-sm xl:space-y-0 space-y-10 mt-Ysm flex flex-col border-h2  border-solid border-emerald-600 md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl xl:flex-row xl:gap-x-4 2xl:mx-xxl 2xl:mt-YXl">
      <PartnerCard
        details={{
          title: "Earn more with lower fees",
          signupText: "Signup as a business",
          signupText2: "Partner with us",
          imagePath: "/partner/restaurant.webp",
        }}
      />
      <PartnerCard
        details={{
          title: "Avail exclusive perks",
          signupText: "Signup as a rider",
          signupText2: "Ride with us",
          imagePath: "/partner/rider.webp",
        }}
      />
    </section>
  );
}
