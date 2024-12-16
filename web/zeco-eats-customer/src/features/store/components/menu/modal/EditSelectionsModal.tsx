import { BsArrowRight } from "react-icons/bs";

 
 
export default function EditSelectionsModal() {
    return (
      <button className="flex h-[4rem] w-full items-center justify-between rounded-lg bg-background px-4 font-medium text-red-600">
        <span>Edit Selections</span>
        <span className="text-stone-500">
          <BsArrowRight />
        </span>
      </button>
    );
}