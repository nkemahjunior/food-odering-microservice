import Image from "next/image";
import { FaShoppingBasket } from "react-icons/fa";

export default function NavBar2Mobile() {
  return (
    <div className="2xl:hidden">
      <div className="flex h-20 items-center">
        <div className="flex h-full basis-1/2 items-center justify-center gap-x-4 bg-primary py-4">
          <div className="relative h-[2rem] w-[2rem] overflow-hidden rounded-full">
            <Image
              src={"/devImages/profile.png"}
              alt="user's profile picture"
              fill={true}
            />
          </div>
          <p className="text-sm font-semibold">Aycan</p>
        </div>

        <div className="flex h-full basis-1/2 items-center justify-evenly bg-[#028643] py-4">
          <span className="text-backgroundBorder">
            <FaShoppingBasket size={44} />
          </span>
          <p className="font-semibold uppercase text-white">GBP 79.89</p>
        </div>
      </div>
    </div>
  );
}
