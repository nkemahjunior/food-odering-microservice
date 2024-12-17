import DecreaseIncreaseQty from "./DecreaseIncreaseQty";
import RadioBtn from "./RadioBtn";

export default function SelectionItem({
  i,
  selectionType,
}: {
  i: number;
  selectionType: "qty" | "radio" | "checkBox";
}) {
  return (
    <div className="flex items-center justify-between border-b-[1px] border-solid border-b-backgroundBorder py-4 font-medium">
      <span>Egg Fried Rice {i}</span>
      {selectionType === "qty" && <DecreaseIncreaseQty />}
      {selectionType == "radio" && <RadioBtn id={i.toString()} name="testbtn" />}
      {selectionType === "checkBox" && <input type="checkbox" name="" id="" />}
    </div>
  );
}
