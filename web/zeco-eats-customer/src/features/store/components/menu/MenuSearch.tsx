"use client"
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

 
 
export default function MenuSearch() {
    const [focus, setFocus] = useState(false);
    return (
      <div
        className={`flex items-center space-x-3 overflow-hidden rounded-3xl border-2 border-solid ${focus ? "border-secondary bg-white" : "border-backgroundShade1 bg-backgroundShade1"} pl-4`}
      >
        <span className="flex h-full items-center">
          <BiSearch />
        </span>
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="text"
          className="w-[20rem] bg-inherit py-2 outline-none placeholder:text-storeTextColorTint"
          placeholder="Search in The Place Restaurant"
        />
      </div>
    );
}