"use client";

import { Dispatch, SetStateAction } from "react";

interface fnProps {
  filterName: string;
  // toggleModal: (arg: void) => void
  toggleModal: Dispatch<SetStateAction<boolean>>;
  btnIcon?: React.ReactNode;
  iconPosition?: "beforeText" | "afterText";
}

export default function FilterBtn({
  filterName,
  toggleModal,
  btnIcon,
  iconPosition,
}: fnProps) {
  return (
    <button
      onClick={() => toggleModal((v) => !v)}
      className="flex w-fit space-x-2 text-nowrap rounded-3xl bg-background font-medium px-4 py-2 transition-colors duration-200 hover:bg-stone-200"
    >
      {btnIcon && iconPosition == "beforeText" && <span>{btnIcon}</span>}
      {filterName}
      {btnIcon && iconPosition == "afterText" && <span>{btnIcon}</span>}
    </button>
  );
}
