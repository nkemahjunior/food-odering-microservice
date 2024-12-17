import { useState } from "react";
import DecreaseIncreaseQty from "./DecreaseIncreaseQty";
import RadioBtn from "./RadioBtn";

interface fnProps {
  i: number;
  selectionType: "qty" | "radio" | "checkBox";
  max: number;
  min: number;
}

export default function SelectionItem({ i, selectionType, max, min }: fnProps) {


  return (
    <div className="flex items-center justify-between border-b-[1px] border-solid border-b-backgroundBorder py-4 font-medium">
      <span>Egg Fried Rice {i}</span>
      {selectionType === "qty" && <DecreaseIncreaseQty max={max} min={min} />}
      {selectionType == "radio" && (
        <RadioBtn id={i.toString()} name="testbtn" />
      )}
      {selectionType === "checkBox" && <input type="checkbox" name="" id="" />}
    </div>
  );
}
