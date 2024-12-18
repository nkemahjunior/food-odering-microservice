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
import Line from "../Line";
import CloseBtn from "../buttons/CloseBtn";
import { BiTrash } from "react-icons/bi";
import Cart from "../cart/Cart";

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
        className={`flex cursor-pointer items-center justify-evenly ${roundedBottom && "rounded-bl-xl"} h-full overflow-y-auto bg-[#028643] font-semibold text-white`}
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
      
      <Cart open={open} setOpen={setOpen}/>
    </>
  );
}
