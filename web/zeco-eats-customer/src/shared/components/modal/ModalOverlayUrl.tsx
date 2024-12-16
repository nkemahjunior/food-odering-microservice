import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

interface fnProps {
  id:number
  children: React.ReactNode;
  open?: string | null;
  router?: AppRouterInstance;
  rounded?: string;
  bg?: string;
  padding?: string;
}

export default function ModalOverlayUrl({
  id,
  children,
  //setOpen,
  open,
  router,
  rounded = "rounded-lg",
  bg = "bg-white",
  padding = "px-6 pb-6 pt-2", //bg-[rgb(0,0,0,0.2)]
}: fnProps) {
  return (
    <div
      className={`absoluteb ${open === `true${id}` ? "fixed" : "hidden"} inset-0 z-[100] flex  items-center justify-center border-solid bg-[rgb(0,0,0,0.07)]`}
      onClick={() => router?.back()}
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
