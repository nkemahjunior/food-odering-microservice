import Image from "next/image";
import { FaShoppingBasket } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import UserLocation from "./UserLocation";
import CartNavBar from "./CartNavBar";

export default function NavBar2Mobile({ pathname }: { pathname: string }) {
  
  return (
    <>
      {" "}
      <div
        className={`2xl:hidden ${pathname !== "/home" && "sticky top-0 z-[1]"}`}
      >
        <div className="flex h-20 items-center lg:h-24">
          <div className="flex h-full basis-1/2 items-center justify-center gap-x-4 bg-primary py-4">
            <div className="relative h-[2rem] w-[2rem] overflow-hidden rounded-full">
              <Image
                src={"/devImages/profile.png"}
                alt="user's profile picture"
                fill={true}
              />
            </div>
            <p className="font-medium">Aycan</p>
          </div>

          {/* <div className="flex h-full basis-1/2 items-center justify-evenly bg-[#028643] py-4">
            <span className="text-backgroundBorder">
              <FaShoppingBasket size={44} />
            </span>
            <p className="font-medium uppercase text-white">GBP 79.89</p>
          </div> */}
          <div className="h-full basis-1/2">
            <CartNavBar roundedBottom={false} mobile />
          </div>
        </div>
      </div>
      <div
        className={`mx-sm mb-[1.5rem] mt-[1.5rem] flex justify-end text-sm md:mb-6 md:mt-6 xl:mx-lg 2xl:hidden ${pathname == "/store" ? "hidden" : "block"}`}
      >
        <UserLocation iconSize={18} />
      </div>
    </>
  );
}
