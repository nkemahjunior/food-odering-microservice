import { BsArrowRight } from "react-icons/bs";

 
 
export default function RadioButtonSelectionModal() {
  return (
    <div className="mr-6 flex h-full items-center justify-center space-x-4">
      <label className="has-[:checked]:bg-secondardy relative flex items-center justify-center rounded-full p-1 has-[:checked]:bg-secondary has-[:checked]:ring-4 has-[:checked]:ring-secondary">
        <input
          name="food"
          type="radio"
          className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-solid border-secondary bg-white accent-white transition-colors duration-300 checked:h-2 checked:w-2"
        />

        <span className="absolute ml-14 text-stone-500 peer-checked:hidden">
          <BsArrowRight />
        </span>
      </label>
    </div>
  );
}