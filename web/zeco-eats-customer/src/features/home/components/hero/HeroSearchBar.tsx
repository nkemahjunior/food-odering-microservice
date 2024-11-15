import { IoIosArrowDroprightCircle } from "react-icons/io";

 
 
export default function HeroSearchBar() {
  return (
    <div className="flex h-fit  md:justify-center xl:justify-start ">
      <input
        className="w-full rounded-3xl border-2 border-solid border-backgroundBorder  pl-6 focus:outline-none  xl:w-[60%] 2xl:xl:w-[63%]"
        placeholder="Enter location"
        type="text"
      />

      <button className="-ml-10 h-fit rounded-full  bg-primary p-1">
        <span className="text-secondary xl:hidden">
          <IoIosArrowDroprightCircle size={"48"} />
        </span>
        <span className="hidden px-8 py-2 text-white xl:block">search</span>
      </button>
    </div>
  );
}