"use client";
import SectionTitle from "@/shared/components/SectionTitle";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function DiscountHead() {
  return (
    <div className="flex items-center justify-between border-2 border-solid border-red-700">
      <SectionTitle titleSM="Up to -40% Discount Offers 🎊" titleMD="Up to -40% 🎊 Zeco Eats exclusive deals"/>

      <div className="border-2 border-solid border-red-700 2xl:w-fit">
        <div className="flex space-x-1 overflow-hidden rounded-2xl border-2 border-solid border-secondary px-1 py-2 2xl:hidden">
          <label htmlFor="dishes">
            <IoIosArrowDropdownCircle />
          </label>
          <select
            defaultValue={"pF"}
            name="dishes"
            id="dishes"
            className="appearance-none text-xs focus:outline-none"
          >
            <option value="vegan">Vegan</option>
            <option value="sushi">Sushi</option>
            <option value="pF">Pizza & Fast food</option>
            <option value="others">Others</option>
          </select>
        </div>

        <ul className="hidden space-x-10 whitespace-nowrap border-2 border-solid border-red-700 2xl:flex">
          <li
            className="rounded-3xl border-[1px] border-solid border-primary border-opacity-0 px-12 py-4 transition-colors duration-300 hover:border-opacity-100 hover:font-semibold hover:text-primary"
            value="vegan"
          >
            Vegan
          </li>
          <li
            className="rounded-3xl border-[1px] border-solid border-primary border-opacity-0 px-12 transition-colors duration-300 py-4 hover:border-opacity-100 hover:font-semibold hover:text-primary"
            value="sushi"
          >
            Sushi
          </li>
          <li
            className="rounded-3xl border-[1px] border-solid border-primary border-opacity-0 px-12 transition-colors duration-300 py-4 hover:border-opacity-100 hover:font-semibold hover:text-primary"
            value="pF"
          >
            Pizza & Fast food
          </li>
          <li
            className="rounded-3xl border-[1px] border-solid border-primary border-opacity-0 px-12 transition-colors duration-300 py-4 hover:border-opacity-100 hover:font-semibold hover:text-primary"
            value="others"
          >
            Others
          </li>
        </ul>
      </div>
    </div>
  );
}
