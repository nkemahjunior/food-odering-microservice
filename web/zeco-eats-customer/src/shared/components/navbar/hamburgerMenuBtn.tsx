"use client";

import { useState } from "react";

interface fnProps {
  showNavMobile: (show: boolean) => void;
}

export default function HamburgerMenuBtn({ showNavMobile }: fnProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    showNavMobile(newIsOpen);
  };

  return (
    <div className="z-20 cursor-pointer space-y-2" onClick={toggleMenu}>
      <span
        className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${isOpen ? "translate-y-2.5 rotate-45" : ""}`}
      ></span>
      <span
        className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
      ></span>
      <span
        className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${
          isOpen ? "-translate-y-2.5 -rotate-45" : ""
        }`}
      ></span>
    </div>
  );
}
