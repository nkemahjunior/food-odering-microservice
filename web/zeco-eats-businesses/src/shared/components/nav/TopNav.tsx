"use client"
import { useState } from "react";
import Logo from "../Logo";

 
 
export default function TopNav() {
      const [showNavMobile, setShowNavMobile] = useState(false);
      const toggleNavMobile = (show: boolean) => {
        setShowNavMobile(show);
      };

    return (
      <div className="flex items-center justify-between  pt-4 ">
        <Logo />

        <div>
          <button className="hidden rounded-lg bg-background px-6 py-3 font-medium transition-colors duration-300 hover:bg-backgroundShade2 lg:block">
            <span>Logout</span>
          </button>
        </div>

        <div className="flex h-full w-16 items-center justify-center border-solid border-backgroundBorder lg:hidden">
          <div
            className="z-20 cursor-pointer space-y-2"
            onClick={() => toggleNavMobile(!showNavMobile)}
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${showNavMobile ? "translate-y-2.5 rotate-45" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${showNavMobile ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${
                showNavMobile ? "-translate-y-2.5 -rotate-45" : ""
              }`}
            ></span>
          </div>
        </div>
      </div>
    );
}