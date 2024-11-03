import Logo from "@/shared/components/Logo";
import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import OrderProcess from "./OrderProcess";
import HeroText from "./HeroText";
import HeroColumn2 from "./HeroColumn2";
import HeroColumn3 from "./HeroColumn3";

export default function Hero() {
  return (
    <div className="border-backgroundBorder mx-sm bg-background xl:mx-lg 2xl:mx-xxl relative rounded-xl border-[1px] border-solid p-4 xl:grid xl:h-[65dvh] xl:grid-cols-3 xl:overflow-hidden xl:border-l-rose-600 xl:pb-0 xl:pl-8 xl:pr-0 xl:pt-0 2xl:h-[70dvh] 2xl:pb-0 2xl:pl-14 2xl:pr-0 2xl:pt-0">
      
      <HeroText />
      <HeroColumn2 />
      <HeroColumn3 />
    </div>
  );
}
