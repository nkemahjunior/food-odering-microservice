"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import ButtonWithIcon from "../button/ButtonWithIcon";
import { PiCaretUpDownFill } from "react-icons/pi";

interface fnProps {
  data: string[];
  onchange: (arg: string) => void;
}

const dropdownVariants: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 255,
      damping: 25,
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
export default function CustomSelect({ data, onchange }: fnProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(data.at(0) || "");
  const ref = useRef<HTMLDivElement | null>(null);

  const updateInputValue = (value: string) => {
    setInputValue(value);
    onchange(value);
    setOpen(false);
  };

  useEffect(() => {
    function detectClickOutside(e: MouseEvent) {
      if (ref.current && open && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        console.log("clicked outside");
      }
    }
    document.addEventListener("mousedown", detectClickOutside);

    return () => {
      document.removeEventListener("mousedown", detectClickOutside);
    };
  }, [open, ref]);

  // const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
  //   console.log("focus target", e.relatedTarget);
  //   console.log("current target", e.currentTarget);
  //   console.log("target", e.target);
  //   if (e.relatedTarget === null) {
  //     setOpen(false);
  //   }
  // };

  return (
    <div
      className="relative w-fit"
      ref={ref}

      // tabIndex={0}
      // onBlur={handleBlur}
    >
      <ButtonWithIcon
        width="w-[15rem]"
        justify="justify-between"
        font="text-sm"
        className="border-2 border-solid border-backgroundBorder px-6"
        events={{ onClick: () => setOpen((v) => !v) }}
        ariaAttributes={{
          "aria-label": "Toggle dropdown",
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "aria-controls": "select-dropdown",
          role: "combobox",
        }}
      >
        <span>{inputValue}</span>
        <span>
          <PiCaretUpDownFill />
        </span>
      </ButtonWithIcon>

      <AnimatePresence>
        {open && (
          <motion.ul
            aria-label="Dropdown menu"
            role="listbox"
            className="absolute left-0 top-12 flex h-[12rem] w-[15rem] flex-col items-center gap-y-3 overflow-y-auto rounded-lg bg-background py-2 shadow-lg shadow-secondary/10"
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {data.map((el, i) => (
              <li
                key={i}
                data-value={el}
                role="option"
                aria-selected={inputValue === el}
                className="cursor-pointer hover:bg-gray-100"
                onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                  updateInputValue(e.currentTarget.dataset.value!)
                }
              >
                {el}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
