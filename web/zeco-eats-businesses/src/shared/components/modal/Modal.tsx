"use client";
import { useContext } from "react";
import { usePreventScrolling } from "../../hooks/usePreventScrolling";
import CloseBtn from "./CloseBtn";
import {
  ModalContext,
  modalContextTypes,
} from "@/shared/context/modal/ModalProvider";

export default function Modal() {
  const { open, closeModal, modalContent, modalProps } = useContext(
    ModalContext,
  ) as modalContextTypes;
  usePreventScrolling(open);

  return (
    <div
      className={`${open ? "fixed" : "hidden"} inset-0 z-[100] flex h-screen w-full bg-[rgb(0,0,0,0.2)] ${modalProps?.childPos} ${modalProps?.centerChildVer && "items-center"} `}
      onClick={closeModal}
    >
      <div
        className={`relative ${modalProps?.height} ${modalProps?.width}`}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div
          className={` ${modalProps?.bg} ${modalProps?.className} h-full w-full overflow-y-auto`}
        >
          {modalProps?.showCloseBtn && (
            <div className={`flex w-full ${modalProps?.closeBtnPos}`}>
              <CloseBtn />
            </div>
          )}
          {modalContent}
        </div>
      </div>
    </div>
  );
}
