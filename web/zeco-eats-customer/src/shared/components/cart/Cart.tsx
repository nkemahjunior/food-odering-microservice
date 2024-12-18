"use client";
import ModalOverlayR from "../modal/ModalOverlayR";
import RestaurantTitleCart from "./RestaurantTitleCart";
import Line from "../Line";
import CartItem from "./CartItem";
import CloseClearCart from "./CloseClearCart";
import { AnimatePresence, motion } from "motion/react";

interface fnProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export default function Cart({ open, setOpen }: fnProps) {
  const fakeArr = Array.from({ length: 3 });
  return (
    <ModalOverlayR open={open} setOpen={setOpen} controlChildren>
      {" "}
      {open && (
        <motion.div
          initial={{ translateX: "100%" }}
          animate={{ translateX: "0%" }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="absolute right-0 h-full w-[30%] overflow-y-auto border-2 border-solid border-green-600 bg-white px-4 py-4"
        >
          <div className="relative h-full w-full space-y-4">
            <CloseClearCart setOpen={setOpen} />
            <RestaurantTitleCart />
            <Line />
            <div className="space-y- divide-y-[1px] divide-backgroundBorder">
              {fakeArr.map((el, i) => (
                <CartItem key={i} />
              ))}
            </div>
            <Line />
            <div className="flex items-center justify-between font-semibold text-secondary">
              <span>SubTotal</span>
              <span>£133.32</span>
            </div>{" "}
            <button className="absolute bottom-0 flex h-[3.5rem] w-full items-center justify-center rounded-lg bg-secondary font-semibold text-white transition-colors duration-300 hover:bg-secondaryTint">
              <span>Go to checkout</span>
            </button>
          </div>
        </motion.div>
      )}
    </ModalOverlayR>
  );
}
