
import { FaShoppingBasket } from "react-icons/fa";

export default function CartNavBar({
  roundedBottom,
  mobile,
}: {
  roundedBottom: boolean;
  mobile?: boolean;
    }) {
    
    
  return (
    <div
      className={`flex items-center justify-evenly ${roundedBottom && "rounded-bl-xl"} h-full bg-[#028643] font-semibold text-white`}
    >
      <div className="flex h-full items-center border-solid px-4">
        <FaShoppingBasket size={44} />{" "}
      </div>
      <div className="flex h-full items-center text-nowrap border-l-[1px] border-solid border-white px-4 2xl:border-l-2">
        23 items
      </div>

      <div className="hidden h-full items-center border-l-[1px] border-solid border-white px-4 md:flex 2xl:border-l-2">
        GBP 79.89
      </div>
    </div>
  );
}
