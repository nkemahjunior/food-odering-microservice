"use client";
import { useEffect, useRef, useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import FilterBtn from "./FilterBtn";
import FilterSlider from "./FilterSlider";
import { BiX } from "react-icons/bi";
import { useDeviceType } from "@/shared/hooks/useDeviceType";
import { motion } from "motion/react";
import { usePreventScrolling } from "@/shared/hooks/usePreventScrolling";

export default function FilterDeliveryFee() {
  const [open, setOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, isLaptop, isDesktop } = useDeviceType();

  useEffect(() => {
    if (modalRef.current) {
      setModalPosition(modalRef.current.getBoundingClientRect().x);
    }
  }, [open]);

  //disable scrolling when modal is open
  // usePreventScrolling(open);

  return (
    <>
      <div ref={modalRef}>
        <FilterBtn
          filterName="Delivery fee"
          toggleModal={setOpen}
          btnIcon={<BsArrowDownShort />}
          iconPosition="afterText"
        />
        <motion.div
          initial={isMobile ? { height: "0vh", opacity: 0 } : false}
          animate={isMobile ? { height: open ? "40vh" : "0vh" } : false}
          transition={
            isMobile
              ? {
                  duration: 0.4,
                  ease: "easeInOut",
                  opacity: { duration: 0.2 },
                }
              : undefined
          } // Only apply transition for mobile
          className={`absolute inset-x-0 bottom-0 z-10 h-0 space-y-3 overflow-x-hidden rounded-t-3xl bg-white shadow-2xl shadow-black lg:inset-x-auto lg:bottom-auto lg:mt-2 lg:h-[22rem] lg:w-[28rem] lg:space-y-6 lg:rounded-xl lg:px-8 lg:py-4 ${open ? "lg:block" : "lg:hidden"}`}
        >
          <div className="flex justify-between">
            <p className="w-full border-b-[1px] border-solid border-stone-200 py-4 text-center text-lg font-semibold lg:border-b-0 lg:text-start lg:text-xl lg:font-bold">
              Delivery fee
            </p>
            <button
              className="hidden lg:flex lg:items-center lg:justify-center"
              onClick={() => setOpen(false)}
            >
              <span>
                <BiX size={25} />
              </span>
            </button>
          </div>

          <div className="px-6 lg:px-0">
            <FilterSlider
              modlaIsOpen={open}
              modalPosition={modalPosition}
              modalPadding={isMobile ? 24 : 32} //padding in px
            />
          </div>
        </motion.div>
      </div>
      <div className={` fixed inset-0 -left-4 z-[8] bg-[rgba(0,0,0,0.1)] ${open ?  " ": "hidden"}`} onClick={() => setOpen(false)}></div>
    </>
  );
}


/**
 *   return (
    <motion.div ref={modalRef}
      initial={{height: isMobile ? }}
    >
      <FilterBtn
        filterName="Delivery fee"
        toggleModal={setOpen}
        btnIcon={<BsArrowDownShort />}
        iconPosition="afterText"
      />
      <div
        className={`absolute inset-x-0 bottom-0 z-10 h-[50dvh] space-y-3 overflow-x-hidden rounded-t-3xl bg-white shadow-2xl shadow-black lg:inset-x-auto lg:bottom-auto lg:mt-2 lg:h-[22rem] lg:w-[28rem] lg:space-y-6 lg:rounded-xl lg:px-8 lg:py-4 ${open ? "block" : "hidden"}`}
      >
        <div className="flex justify-between">
          <p className="w-full border-b-[1px] border-solid border-stone-200 py-4 text-center text-lg font-semibold lg:border-b-0 lg:text-start lg:text-xl lg:font-bold">
            Delivery fee
          </p>
          <button
            className="hidden lg:flex lg:items-center lg:justify-center"
            onClick={() => setOpen(false)}
          >
            <span>
              <BiX size={25} />
            </span>
          </button>
        </div>

        <div className="px-6 lg:px-0">
          <FilterSlider
            modlaIsOpen={open}
            modalPosition={modalPosition}
            modalPadding={isMobile ? 24 : 32} //padding in px
          />
        </div>
      </div>
    </motion.div>
  );
 */