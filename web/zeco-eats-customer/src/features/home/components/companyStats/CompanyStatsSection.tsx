import Stat from "./Stat";

 
 
export default function CompanyStatsSection() {
    return (
      <section className="mx-sm mt-Ysm md:mx-md lg:mx-lg lg:mt-Ylg xl:mx-xl 2xl:mx-xxl 2xl:mt-YXl bg-primary  rounded-lg">
        <div className=" xl:flex p-8" >
          <Stat amount={10} stat="Registered Riders" />
          <Stat amount={200} stat="Oders Delivered" />
          <Stat amount={20} stat="Restaurants Partnered" />
          <Stat amount={1000} stat="Food Items" noBorder={true} />
        </div>
      </section>
    );
}