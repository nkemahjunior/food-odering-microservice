import Image from "next/image";
import OrderProcess from "./OrderProcess";
import HeroOrderProcesses from "./HeroOrderProcesses";
import HeroColumn3Image from "./HeroColumn3Image";
import HeroColumn3ImageContainer from "./HeroColumn3ImageContainer";

export default function HeroColumn3() {
  return (
      <div className="-ml-40 hidden rounded-tl-[15rem]  xl:block xl:bg-primary 2xl:-ml-56">
          
        <div className="-ml-4 flex h-full w-[98%] ">
            <HeroColumn3ImageContainer />
            <HeroOrderProcesses />  
        </div>
    </div>
  );
}
