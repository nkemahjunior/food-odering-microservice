"use client";

import { usePreventScrolling } from "@/shared/hooks/usePreventScrolling";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import ButtonBackUrl from "../buttons/ButtonBacKUrl";
import { useEffect, useState } from "react";

interface fnProps {
  disableScrolling?: boolean | string | null;
  children: React.ReactNode;
  rounded?: string;
  bg?: string;
  padding?: string;
  className?: string;
  disableCancelBtn?: boolean;
}

export default function ModalOverlayUrl({
  disableScrolling = false,
  children,
  rounded = "rounded-2xl",
  bg = "bg-white",
  padding = "px-6 pb-6 pt-2",
  className,
  disableCancelBtn,
}: fnProps) {
  usePreventScrolling(disableScrolling);
  const router = useRouter();

  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (disableScrolling) setMount(true);
    else setMount(false);
  }, [disableScrolling]);

  return (
    <div
      className={`items-centejxxx fixed inset-0 z-[100] flex max-h-screen justify-center ${mount && "overflow-y-auto"} border-solid bg-[rgb(0,0,0,0.2)]`}
      onClick={() => router?.back()}
    >
      <div
        className={`h-fit w-fit ${rounded} ${bg} ${padding} ${className} space-y-2`}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div
          className={`w-full justify-end ${disableCancelBtn ? "hidden" : "flex"}`}
        >
          <ButtonBackUrl />
        </div>

        {children}
      </div>
    </div>
  );
}
