"use client";
import ModalOverlayUrl from "@/shared/components/modal/ModalOverlayUrl";
import { SELECTION, VIEW_DISH } from "@/features/store/utils/modalUrlKeys";
import { useSearchParams } from "next/navigation";
import MenuCardModal from "../MenuCardModal";
import SelectionModal from "./SelectionModal";

export default function StoreModalUrl() {
  const searchParams = useSearchParams();
  const viewDish = searchParams.get(VIEW_DISH);
  const selection = searchParams.get(SELECTION);

  //on component mout use the id to fetch data for this modal
  return (
    <>
      <div className={`${viewDish ? "block" : "hidden"} h-full w-full`}>
        <ModalOverlayUrl disableScrolling={viewDish} className="mt-[10%]">
          <MenuCardModal isModal />
        </ModalOverlayUrl>
      </div>

      {/* <div className={`${selection ? "block" : "hidden"} h-full w-full`}>
        <ModalOverlayUrl disableScrolling={selection} className=" mt-[25%]" disableCancelBtn>
          <SelectionModal />
        </ModalOverlayUrl>
      </div> */}
    </>
  );
}
