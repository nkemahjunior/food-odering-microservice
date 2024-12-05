import HeroText from "./HeroText";
import HeroColumn2 from "./HeroColumn2";
import HeroColumn3 from "./HeroColumn3";

export default function Hero() {
  return (
    <section className="relative mx-sm rounded-xl border-[1px] border-solid border-backgroundBorder bg-background p-4 md:mx-md lg:mx-lg xl:mx-xl xl:grid xl:h-[65dvh] xl:grid-cols-3 xl:overflow-hidden xl:pb-0 xl:pl-8 xl:pr-0 xl:pt-0 2xl:mx-xxl 2xl:h-[70dvh] 2xl:pb-0 2xl:pl-14 2xl:pr-0 2xl:pt-0">
      <HeroText />
      <HeroColumn2 />
      <HeroColumn3 />
    </section>
  );
}
