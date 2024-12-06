"use client";
import { BsClock } from "react-icons/bs";
import { motion } from "motion/react";
import { GrDown } from "react-icons/gr";
import OpeningDayAndTime from "./OpeningDayAndTime";
import { useState } from "react";

export default function StoreOpeningHours() {
  const [open, setOpen] = useState(false);
  const toggleDropDown = () => setOpen((v) => !v);
  return (
    <div className="mt-2">
      <div className="flex cursor-pointer" onClick={toggleDropDown}>
        <div className="flex basis-[20%] items-center justify-center">
          <span>
            <BsClock size={20} />
          </span>
        </div>
        <div className="flex basis-[80%] border-b-2 border-solid border-backgroundBorder py-2">
          <div className="basis-[80%]">
            <p className="text-base font-medium">Open</p>
            <p className="text-storeTextColorTint">Open untill 10:00 PM</p>
          </div>
          <div className="flex basis-[20%] items-center justify-center">
            <button className={`${open ? "rotate-180" : "rotate-0"}`}>
              <GrDown size={15} />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="space-y-3 "
        initial={{ height: "0rem", overflowY: "hidden" }}
        animate={open ? { height: "10rem", overflowY: "auto", paddingTop:"0.75rem" } : undefined}
        transition={open ? { duration: 0.3, ease: "easeIn" } : undefined}
      >
        <OpeningDayAndTime day="Monday" time="9:00 AM - 6:00PM" />
        <OpeningDayAndTime day="Tuesday - Friday" time="9:00 AM - 10:00PM" />
        <OpeningDayAndTime day="Saturday" time="11:00 AM - 10:00PM" />
        <OpeningDayAndTime day="Sunday" time="12:00 PM - 11:00PM" />
      </motion.div>
    </div>
  );
}
