"use client"
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

interface fnProps {
  children: React.ReactNode;
  //open: boolean;
  //setOpen: (arg: boolean) => void;
  rounded?: string;
  bg?: string;
  padding?: string;
}

export default function ModalOverlayI({
  children,
  //setOpen,
  //open,
  rounded = "rounded-lg",
  bg = "bg-white",
  padding = "px-6 pb-6 pt-2",
}: fnProps) {

     const router = useRouter();
  return (
    <div
      className={`absoluteb ${/*open ? "fixed" : "hidden"*/ ""} fixed inset-0 z-[100] flex h-screen w-full items-center justify-center border-solid bg-[rgb(0,0,0,0.2)]`}
      onClick={() => {
        router.back();
      }} //onClick={() => setOpen(false)}
    >
      <div
        className={`h-fit w-fit ${rounded} ${bg} ${padding} space-y-2`}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div className={`flex w-full justify-end`}>
          <button
            className="flex items-center justify-center rounded-full bg-background p-2 hover:bg-backgroundShade1"
            onClick={() => {
              router.back();
            }}
          >
            <span>
              <RxCross2 size={20} />
            </span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
