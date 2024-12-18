"use client";
import DishImageModal from "./modal/DishImageModal";
import BackToRestaurantModal from "./modal/BackToRestaurantModal";
import DishInfoModal from "./modal/DishInfoModal";
import { useRef } from "react";
import { useIsIntersecting } from "@/shared/hooks/useIsIntersecting";
import StickyModalTitle from "./modal/StickyModalTitle";

export default function MenuCardModal({
  gapx = "gap-x-8",
  isModal,
}: {
  gapx?: string;
  isModal?: boolean;
}) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const isIntersecting = useIsIntersecting(
    observerRef,
    true,
    { root: null, rootMargin: "0px ", threshold: 1 },
    [],
  );

  return (
    <div
      className={` ${!isModal ? "flex w-full justify-center bg-[#f7f7f7] lg:bg-white" : " "} `}
    >
      <div
        className={`${!isModal ? "lg:min-h-[32rem]" : "min-h-[35rem]"} w-full lg:w-[65rem]`}
      >
        {!isModal && <BackToRestaurantModal />}
        {isModal && (
          <StickyModalTitle
            isIntersecting={isIntersecting}
            title="Pesto Mozzarella"
          />
        )}
        <div ref={observerRef} className="h-1 w-full "></div>

        <div
          className={`flex h-full w-full flex-col space-y-4 lg:flex-row lg:space-y-0 ${gapx}`}
        >
          <DishImageModal isModal={isModal} />
          <DishInfoModal isModal={isModal} />
        </div>
      </div>
    </div>
  );
}

/**
 * https://www.ubereats.com/store/oodles-wok-holborn/tAsgf1VdSM-6MbC-k6q58Q?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%2522b40b207f-555d-48cf-ba31-b0be93aab9f1%2522%252C%2522sectionUuid%2522%253A%25229ac76cf8-47bf-5654-b6a3-66d20aae67bd%2522%252C%2522subsectionUuid%2522%253A%25229b54604e-8958-5731-aa80-854394c6ce23%2522%252C%2522itemUuid%2522%253A%2522382c1032-f739-5cd9-8728-53825165fc8e%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxvbmRvbiUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMkNoSUpkZDRocnd1ZzJFY1JtU3JWM1ZvNmxsSSUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJnb29nbGVfcGxhY2VzJTIyJTJDJTIybGF0aXR1ZGUlMjIlM0E1MS41MDcyMTc4JTJDJTIybG9uZ2l0dWRlJTIyJTNBLTAuMTI3NTg2MiU3RA%3D%3D&ps=1
 */
