import { DOMAttributes, InputHTMLAttributes } from "react";

interface fnProps {
  id: string;
  attributes?: InputHTMLAttributes<HTMLInputElement>;
  events?: DOMAttributes<HTMLInputElement>;
  className?: string;
  py?: string;
  px?: string;
  width?: string;
  rounded?: string;
  bg?: string;
  focusBorderColor?: string;
  focusBg?: string;
}

export default function TextInput({
  id,
  attributes,
  events,
  className,
  py = "py-2",
  px = "px-2",
  width = "w-full",
  rounded = "rounded-lg",
  bg = "bg-background",
  focusBorderColor = "focus:border-secondary",
  focusBg = "focus:bg-white",
}: fnProps) {
  return (
    <input
      id={id}
      {...attributes}
      {...events}
      type="text"
      className={`${focusBorderColor} ${focusBg} ${width} ${rounded} border-2 border-solid border-transparent ${bg} ${px} ${py}  ${className}`}
    />
  );
}
