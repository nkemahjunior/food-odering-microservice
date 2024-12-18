"use client";
import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import ModalOverlayR from "../modal/ModalOverlayR";
import { BsArrowRight } from "react-icons/bs";
import ImageContainer from "../image/ImageContainer";
import CardTitle from "../text/CardTitle";
import RestaurantTitleCart from "../cart/RestaurantTitleCart";
import CartIncreaseDecreaseQty from "../cart/CartIncreaseDecreaseQty";
import CartItem from "../cart/CartItem";

export default function CartNavBar({
  roundedBottom,
  mobile,
}: {
  roundedBottom: boolean;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {" "}
      <div
        className={`flex cursor-pointer items-center justify-evenly ${roundedBottom && "rounded-bl-xl"} h-full bg-[#028643] font-semibold text-white`}
        onClick={() => setOpen(true)}
      >
        <div className="flex h-full items-center border-solid px-4">
          <FaShoppingBasket size={44} />{" "}
        </div>
        <div className="flex h-full items-center text-nowrap border-l-[1px] border-solid border-white px-4 2xl:border-l-2">
          23 items
        </div>

        <div className="hidden h-full items-center border-l-[1px] border-solid border-white px-4 md:flex 2xl:border-l-2">
          GBP 79.89
        </div>
      </div>
      <ModalOverlayR open={open} setOpen={setOpen} controlChildren>
        <div className="absolute right-0 h-full w-[30%] space-y-4 px-4 items-center border-2 border-solid border-green-600 bg-white">
          <RestaurantTitleCart />

          <div>
            <CartItem/>
          </div>
        </div>
      </ModalOverlayR>
    </>
  );
}
