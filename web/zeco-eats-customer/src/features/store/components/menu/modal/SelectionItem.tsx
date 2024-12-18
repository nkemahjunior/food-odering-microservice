import { useState } from "react";
import DecreaseIncreaseQty from "./DecreaseIncreaseQty";
import RadioBtn from "./RadioBtn";
import CheckBox from "./CheckBox";

interface fnProps {
  i: number;
  selectionType: "qty" | "radio" | "checkBox";
  max: number;
  min: number;
}

export default function SelectionItem({ i, selectionType, max, min }: fnProps) {

  
  return (
    <div className="flex h-[3.5rem] lg:h-[4rem] items-center justify-between border-b-[1px] border-solid border-b-backgroundBorder font-medium">
      <div className="h-full ">
        {" "}
        {selectionType === "radio" || selectionType === "checkBox" ? (
          <label
            className="flex h-full cursor-pointer items-center justify-center "
            htmlFor={i.toString()}
          >
            {" "}
            {/*use unique ids ad it will work*/}
            Egg Fried Rice {i} label
          </label>
        ) : (
          <span className="flex h-full items-center justify-center ">
            Egg Fried Rice {i}
          </span>
        )}
      </div>

      <div >
        {selectionType === "qty" && <DecreaseIncreaseQty max={max} min={min} />}

        {selectionType == "radio" && (
          <RadioBtn id={i.toString()} name="testradio"  />
        )}
        {selectionType === "checkBox" && (
          <CheckBox id={i.toString()} name="testcheck" />
        )}
      </div>
    </div>
  );
}
