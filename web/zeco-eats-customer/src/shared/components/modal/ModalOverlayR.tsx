import { usePreventScrolling } from "@/shared/hooks/usePreventScrolling";
import { RxCross2 } from "react-icons/rx";

interface fnProps {
  children: React.ReactNode;
  controlChildren?: boolean;
  open: boolean;
  setOpen: (arg: boolean) => void;
  rounded?: string;
  bg?: string;
  padding?: string;
}

export default function ModalOverlayR({
  children,
  controlChildren,
  setOpen,
  open,
  rounded = "rounded-lg",
  bg = "bg-white",
  padding = "px-6 pb-6 pt-2",
}: fnProps) {
  usePreventScrolling(open)
  return (
    <div
      className={`absoluteb ${open ? "fixed" : "hidden"} inset-0 z-[101] ${controlChildren ? " " : `flex items-center justify-center`} h-screen w-full border-solid bg-[rgb(0,0,0,0.2)]`}
      onClick={() => setOpen(false)}
    >
      <div
        className={`relativem h-fit w-fit ${controlChildren ? " " : `${rounded} ${bg} ${padding} space-y-2`}`}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {/* {!controlChildren && (
          <div className={`flex w-full justify-end`}>
            <button className="flex items-center justify-center rounded-full bg-background p-2 hover:bg-backgroundShade1">
              <span>
                <RxCross2 size={20} />
              </span>
            </button>
          </div>
        )} */}

        {children}
      </div>
    </div>
  );
}
