"use client"
import { useState } from "react";
import FilterBtn from "./FilterBtn";

export default function FilterUnder30Min() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <FilterBtn filterName="Under 30 min" toggleModal={setOpen} />

      <div
        className={`absolute inset-x-0 bottom-0 h-[50dvh] bg-red-600 lg:inset-x-auto lg:bottom-auto lg:h-[20rem] lg:w-[20rem] ${open ? "block" : "hidden"}`}
      >
        modal
      </div>
    </div>
  );
}
