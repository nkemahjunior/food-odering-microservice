"use client";

import {
  ModalContext,
  modalContextTypes,
} from "@/shared/context/modal/ModalProvider";
import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";

export default function CloseBtn({
  color = "bg-background",
  hoverColor = "bg-backgroundShade1",
}: {
  color?: string;
  hoverColor?: string;
}) {
  const { closeModal } = useContext(ModalContext) as modalContextTypes;
  return (
    <button
      onClick={closeModal}
      className={`flex items-center justify-center rounded-full transition-colors duration-300  ${color} p-2 hover:${hoverColor} `}
    >
      <span>
        <RxCross2 size={20} />
      </span>
    </button>
  );
}
