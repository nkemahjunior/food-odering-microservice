"use client";

import { RxCross2 } from "react-icons/rx";

export default function CloseBtn({
  setOpen,
  color = "bg-background",
  hoverColor = "bg-backgroundShade1",
}: {
  setOpen: (arg: boolean) => void;
  color?: string;
  hoverColor?: string;
}) {
  return (
    <button
      onClick={() => setOpen(false)}
      className={`flex items-center justify-center rounded-full ${color} p-2 hover:${hoverColor} `}
    >
      <span>
        <RxCross2 size={20} />
      </span>
    </button>
  );
}
