"use client"
import { useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import FilterBtn from "./FilterBtn";

export default function FilterPrice() {
    const [open, setOpen] = useState(false);
  return (
    <div>
      <FilterBtn
        filterName="Price"
        toggleModal={setOpen}
        btnIcon={<BsArrowDownShort />}
        iconPosition="afterText"
      />

      <div
        className={`absolute inset-x-0 bottom-0 h-[50dvh] bg-red-600 lg:inset-x-auto lg:bottom-auto lg:h-[20rem] lg:w-[20rem] ${open ? "block" : "hidden"}`}
      >
        modal
      </div>
    </div>
  );
}
