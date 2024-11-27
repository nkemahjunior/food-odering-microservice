"use client"
import { BiMinus, BiPlus } from "react-icons/bi";
import { useState } from "react";
import { motion } from "motion/react";
import FAQ1Card from "./FAQ1Card";

export default function FAQ1({ question }: { question: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ height: "auto" }}
      animate={{ height: open ? "auto" : "2rem" }}
      transition={{ duration: 0.3 }}
      className="space-y-6 overflow-hidden lg:space-y-8"
    >
      <div
        className="flex cursor-pointer justify-center"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex w-full items-center justify-between text-white md:w-[70%] lg:w-full 2xl:w-[60%]">
          <p className="tdext-secondary text-lg font-bold">{question}</p>
          <p>{open ? <BiMinus /> : <BiPlus />}</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:justify-center lg:space-x-4 lg:space-y-0">
        <FAQ1Card
          title="Place an Order!"
          imagePath="/knowAboutUs/order-food1.png"
          desc="Place order through our website"
        />
        <FAQ1Card
          title="Track Progress"
          imagePath="/knowAboutUs/food1.png"
          desc="Your can track your order status "
        />
        <FAQ1Card
          title="Get your Order!"
          imagePath="/knowAboutUs/order1.png"
          desc="Receive your order!"
        />
      </div>
      <div className="flex justify-center px-1">
        <p className="text-center text-white md:w-[68%] lg:w-full 2xl:w-[58%]">
          Zeco Eats simplifies the food ordering process. Browse through our
          diverse menu, select your favorite dishes, and proceed to checkout.
          Your delicious meal will be on its way to your doorstep in no time!
        </p>
      </div>
    </motion.div>
  );
}
