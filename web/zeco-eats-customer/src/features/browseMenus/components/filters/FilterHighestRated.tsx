"use client"
import { useState } from "react";
import { BiMedal } from "react-icons/bi";
import FilterBtn from "./FilterBtn";

export default function FilterHighestRated() {
    const [open, setOpen] = useState(false);
  return (
    <div>
      <FilterBtn
        filterName="Highest rated"
        toggleModal={setOpen}
        btnIcon={<BiMedal />}
        iconPosition="beforeText"
      />

      <div
        className={`absolute inset-x-0 bottom-0 h-[50dvh] bg-red-600 lg:inset-x-auto lg:bottom-auto lg:h-[20rem] lg:w-[20rem] ${open ? "block" : "hidden"}`}
      >
        modal
      </div>
    </div>
  );
}
