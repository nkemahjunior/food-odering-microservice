import Link from "next/link";
import { FaMapMarkerAlt, FaShoppingBasket } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import UserLocation from "./UserLocation";

export default function NavBar1() {
  return (
    <div className="hidden h-20 justify-between overflow-hidden rounded-b-xl border-b-[1px] border-l-[1px] border-r-[1px] border-solid border-backgroundBorder bg-background pl-8 font-medium 2xl:mx-xxl 2xl:flex">
      <div className="flex items-center">
        <p>
          🌟 Get 5% off your first order, &nbsp;
          <Link className="font-semibold text-primary underline" href={"/"}>
            Promo: ORDER1
          </Link>
        </p>
      </div>

      <div className="flex items-center space-x-4  text-secondary">
        <UserLocation iconSize={24} />
        {/* <button className="border-2 border-solid border-red-600 text-primary underline ">
          Change Location
        </button> */}
      </div>

      <div className="space flex items-center rounded-bl-xl bg-[#028643] font-semibold text-white">
        <div className="flex h-full items-center border-solid px-4">
          <FaShoppingBasket size={44} />{" "}
        </div>
        <div className="flex h-full items-center border-l-2 border-solid px-4">
          23 items
        </div>
        <div className="flex h-full items-center border-l-2 border-solid px-4">
          GBP 79.89
        </div>
      </div>
    </div>
  );
}
