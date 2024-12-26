"use client";
import TextInput from "@/shared/components/inputs/TextInput";
import { ChangeEvent, useState } from "react";

interface fnProps {
  id: string;
  label: string;
  initialState: string;
  className?: string;
  inputWidth?: string;
}

export default function EditItemInput({
  id,
  label,
  initialState,
    className,
  inputWidth="w-full"
}: fnProps) {
  const [value, setValue] = useState<string>(initialState);
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>

      <TextInput
        id={id}
        attributes={{ value: value }}
        width={inputWidth}
        events={{
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value),
        }}
      />

      {/* <input
        id="itemName"
        type="text"
        className="focus:border-secondary w-full rounded-lg border-2 border-solid border-transparent bg-background px-2 py-2 focus:bg-white"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      /> */}
    </div>
  );
}
