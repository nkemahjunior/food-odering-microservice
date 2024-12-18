"use client"
import ControSelectedQtyProvider, {
  ControlSelectedQtyContext,
  controlSelectedQtyTypes,
} from "@/features/store/contexts/ControlSelectedQtyProvider";
import SelectionItem from "./SelectionItem";
import SelectionTitle from "./SelectionTitle";
import { useContext, useEffect } from "react";

interface fnProps {
  title: string;
  status: string;
  chooseAmt: number;
  selectionType: "qty" | "radio" | "checkBox";
  max: number;
  min: number;
}

export default function Selection({
  title,
  status,
  chooseAmt,
  selectionType,
  max,
  min,
}: fnProps) {
  const fakeArr = Array.from({ length: 5 });

  const { setSelectionMinMax } = useContext(
    ControlSelectedQtyContext,
  ) as controlSelectedQtyTypes;

  useEffect(() => {
    setSelectionMinMax({
      max: max,
      min: min,
    });
  }, []);

  return (
    <div>
      <SelectionTitle title={title} status={status} chooseAmt={chooseAmt} />

      
        <div className="space-y-4">
        {fakeArr.map((el, i) => (
            // an item also has its min and max eg you can not select more 3 chicken 
            <SelectionItem max={3} min={1} key={i} i={i} selectionType={selectionType} />
          ))}
        </div>
      
    </div>
  );
}
