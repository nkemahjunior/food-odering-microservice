import CardTitle from "@/shared/components/text/CardTitle";
import { BiLocationPlus } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import StoreLocationItem from "./StoreLocationItem";
import StoreOpeningHours from "./StoreOpeningHours";

export default function StoreLocationAndInfo() {
  return (
    <div className="lg:grid w-full grid-cols-[70fr,30fr] border-[1px] border-solid border-backgroundBorder rounded-lg hidden ">
      <div className="">
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

