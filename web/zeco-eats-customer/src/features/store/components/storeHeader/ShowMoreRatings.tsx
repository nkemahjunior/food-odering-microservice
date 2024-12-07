import Link from "next/link";
import { BsArrowDown } from "react-icons/bs";

 
 
export default function ShowMoreRatings() {
  return (
    <Link
      href={" link to show more ratings"}
      className="flex h-[2rem] w-[7rem] items-center justify-center space-x-1 text-nowrap rounded-3xl bg-background font-medium transition-colors duration-300 hover:bg-backgroundShade2 lg:h-[2.5rem] lg:w-[9rem]"
    >
      <span>
        <BsArrowDown />
      </span>{" "}
      <span>Show more</span>
    </Link>
  );
}