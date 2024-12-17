"use client";

import { usePreventScrolling } from "@/shared/hooks/usePreventScrolling";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

interface fnProps {
  disableScrolling: boolean | string | null;
  children: React.ReactNode;
  rounded?: string;
  bg?: string;
  padding?: string;
  className?: string
  disableCancelBtn?:boolean
}

export default function ModalOverlayUrl({
  disableScrolling,
  children,
  rounded = "rounded-2xl",
  bg = "bg-white",
  padding = "px-6 pb-6 pt-2",
  className,
  disableCancelBtn
}: fnProps) {
  const router = useRouter();

  usePreventScrolling(disableScrolling);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto border-solid bg-[rgb(0,0,0,0.2)]`}
      onClick={() => router?.back()}
    >
      <div
        className={`h-fit w-fit ${rounded} ${bg} ${padding} ${className} space-y-2`}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div className={` w-full justify-end ${disableCancelBtn ? 'hidden':'flex'}`}>
          <button
            className="flex items-center justify-center rounded-full bg-background p-2 hover:bg-backgroundShade1"
            onClick={() => router?.back()}
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
