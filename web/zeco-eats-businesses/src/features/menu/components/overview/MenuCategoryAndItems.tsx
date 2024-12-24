
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import SortableCategories from "./SortableCategories";

export default function MenuCategoryAndItems() {
  return (
    <div className=" space-y-8">
      <div className="flex w-full space-x-4">
        <div className="has-[:focus]:border-secondary flex h-[2.5rem] w-full items-center space-x-2 rounded-lg border-2 border-solid border-transparent bg-background px-4 has-[:focus]:bg-white">
          <span>
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search item"
            className="w-full bg-inherit outline-none"
          />
        </div>

        <div className="flex space-x-4 items-center">
          <button className="flex h-[2.5rem] w-20 items-center justify-center space-x-1 rounded-lg bg-background">
            <span>
              <IoAddOutline />
            </span>
            <span>Add</span>
          </button>
          <button className="flex h-[2.5rem] w-20 items-center justify-center rounded-lg bg-background">
            Save
          </button>
        </div>
      </div>

      <div>
        <SortableCategories />
      </div>
    </div>
  );
}
