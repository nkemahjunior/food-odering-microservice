"use client";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "motion/react";
import { useState } from "react";

export default function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="space-y-4 overflow-hidden lg:space-y-n8"
      initial={{ height: "auto" }}
      //   animate={{ height: open ? "auto" : "3rem" }}
      animate={{ height: open ? "auto" : "auto" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center">
        <div
          onClick={() => setOpen((v) => !v)}
          className="bpg-primary flex w-full cursor-pointer items-center justify-between text-white md:w-[70%] lg:w-full 2xl:w-[60%]"
        >
          <p className="  font-medium">{question}</p>
          <p>{open ? <BiMinus /> : <BiPlus />}</p>
        </div>
      </div>

      <motion.div
        initial={{ height: "auto" }}
        animate={{ height: open ? "auto" : "0rem" }}
        transition={{ duration: 0.3 }}
        className="flex justify-center px-1"
      >
        <p className="text-white md:w-[68%] lg:w-full 2xl:w-[58%]">{answer}</p>
      </motion.div>

      {/* {open && (
        <div className="flex justify-center px-1">
          <p className="text-white md:w-[68%] lg:w-full 2xl:w-[58%]">
            {answer}
          </p>
        </div>
      )} */}
    </motion.div>
  );
}
