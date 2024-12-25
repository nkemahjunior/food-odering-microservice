import { BiX } from "react-icons/bi";

export default function ItemCategories({
  category,
  ItemCategoriesArr,
  setItemCategories,
}: {
  category: string;
  ItemCategoriesArr: string[];
  setItemCategories: (arg: string[]) => void;
}) {
  const deleteCategory = () => {
    const arr = ItemCategoriesArr.filter((el) => el !== category);
    setItemCategories(arr);
  };
  return (
    <div className="w-fit rounded-lg bg-background px-3 py-2 font-medium">
      <div className="flex items-center space-x-2">
        <span>{category}</span>
        <button
          className="transition-colors duration-300 hover:bg-backgroundShade2"
          onClick={deleteCategory}
        >
          <BiX size={20} />
        </button>
      </div>
    </div>
  );
}
