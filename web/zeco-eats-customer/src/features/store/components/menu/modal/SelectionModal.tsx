import Line from "@/shared/components/Line";
import CardTitle from "@/shared/components/text/CardTitle";
import { BsArrowLeft } from "react-icons/bs";
import SelectionTitle from "./SelectionTitle";
import { BiMinus, BiPlus } from "react-icons/bi";
import DecreaseIncreaseQty from "./DecreaseIncreaseQty";
import SelectionItemQty from "./SelectionItem";

export default function SelectionModal() {
  const fakeArr = Array.from({ length: 13 });
  return (
    <div className="w-[30rem] space-y-6">
      <div className="sticky top-0 -mb-4 flex items-center space-x-4 bg-white py-4">
        <span className="font-semibold">
          <BsArrowLeft />
        </span>
        <CardTitle
          text="Salt and Pepper Chicken- Regular"
          className="font-semibold"
        />
      </div>
      <Line />
      <div>
        <SelectionTitle
          title="Choose your 2 Bases Regular"
          status="Required"
          chooseAmt={2}
        />

        <div className="space-y-4">
          {fakeArr.map((el, i) => (
            <SelectionItemQty key={i} i={i} />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 py-4">
        <button className="flex h-[4rem] w-full items-center justify-center rounded-lg bg-secondary font-medium text-white transition-colors duration-300 hover:bg-secondaryTint">
          <span>Save &middot; £99.9</span>
        </button>
      </div>
    </div>
  );
}
