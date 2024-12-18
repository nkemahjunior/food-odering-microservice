import { BiTrash } from "react-icons/bi";
import CloseBtn from "../buttons/CloseBtn";

 
 
export default function CloseClearCart({setOpen}: { setOpen: (arg: boolean) => void }) {
  return (
    <div className="flex w-full items-center justify-between pb-4">
      <CloseBtn setOpen={setOpen} />

      <button className="flex h-[2rem] items-center justify-center space-x-2 rounded-lg bg-background px-4 font-medium text-red-600 transition-colors duration-300 hover:bg-backgroundShade2">
        <span>
          <BiTrash />
        </span>
        <span>Clear cart</span>
      </button>
    </div>
  );
}