import CardTitle from "@/shared/components/text/CardTitle";
import { BiLocationPlus } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import StoreLocationItem from "./StoreLocationItem";
import StoreOpeningHours from "./StoreOpeningHours";

export default function StoreLocationAndInfo() {
  return (
    <div className="grid w-full grid-cols-[70fr,30fr] border-2 border-solid border-red-700">
      <div className="border-2 border-solid border-fuchsia-600">
        {" "}
        restaurant map
      </div>

          <div>
              <StoreLocationItem />
              <StoreOpeningHours/>
        </div>
    </div>
  );
}

