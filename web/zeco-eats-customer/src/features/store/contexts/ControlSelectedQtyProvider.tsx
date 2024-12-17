"use client";
import { createContext, useState } from "react";

export interface controlSelectedQtyTypes {
  SelectionMinMax: Record<"max" | "min", number>;
  setSelectionMinMax: (arg: Record<"max" | "min", number>) => void;

  totalSelected: number;
  setTotalSelected: (arg: number) => void;
}

export const ControlSelectedQtyContext =
  createContext<controlSelectedQtyTypes | null>(null);

export default function ControSelectedQtyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [SelectionMinMax, setSelectionMinMax] = useState({
    min: 0,
    max: 0,
  });

  const [totalSelected, setTotalSelected] = useState(0);

  return (
    <ControlSelectedQtyContext.Provider
      value={{
        SelectionMinMax,
        setSelectionMinMax,
        totalSelected,
        setTotalSelected,
      }}
    >
      {children}
    </ControlSelectedQtyContext.Provider>
  );
}
