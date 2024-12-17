import { BiMinus, BiPlus } from "react-icons/bi";

 
 
export default function DecreaseIncreaseQty() {
    return (
      <div className="flex items-center space-x-4">
        <button className="flex items-center justify-center rounded-full bg-background p-2 transition-colors duration-300 hover:bg-backgroundShade2">
          {" "}
          <span>
            <BiMinus />
          </span>
        </button>
        <p>1</p>
        <button className="flex items-center justify-center rounded-full bg-background p-2 transition-colors duration-300 hover:bg-backgroundShade2">
          <span>
            <BiPlus />
          </span>
        </button>
      </div>
    );
}