import { motion } from "motion/react";

interface fnProps {
  scrollContainerWidth: number;
  menuTitleDimension: Record<"width" | "left", number>;
}

export default function CurrentMenuIndicator({
  scrollContainerWidth,
  menuTitleDimension,
}: fnProps) {
  return (
    <div
      className={`h-1 bg-backgroundShade1`}
      style={{ width: `${scrollContainerWidth}px` }}
    >
      <motion.div
        initial={{
          transform: `translateX(${menuTitleDimension.left}px)`,
          width: `${menuTitleDimension.width}px`,
        }}
        animate={{
          transform: `translateX(${menuTitleDimension.left}px)`,
          width: `${menuTitleDimension.width}px`,
        }}
        transition={{ ease: "linear", duration: "0.3" }}
        //  style={
        //   {
        //     width: `${menuTitleDimension.width}px`,
        //     transform: `translateX(${menuTitleDimension.left}px)`,
        //   }
        // }
        className={`h-full bg-secondary`}
      ></motion.div>
    </div>
  );
}
