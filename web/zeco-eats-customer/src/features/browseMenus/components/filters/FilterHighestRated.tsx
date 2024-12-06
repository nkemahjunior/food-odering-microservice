"use client"
import { BiMedal } from "react-icons/bi";


export default function FilterHighestRated() {

  return (
    <div>


      <button className="flex w-fit space-x-2 text-nowrap rounded-3xl bg-background px-4 py-2 font-medium transition-colors duration-200 hover:bg-stone-200">
        <span>
          <BiMedal />
        </span>
        <span> Highest rated</span>
      </button>
    </div>
  );
}
