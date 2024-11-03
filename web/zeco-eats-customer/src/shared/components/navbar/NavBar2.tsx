"use client";
import { GoPersonFill } from "react-icons/go";
import HamburgerMenuBtn from "./hamburgerMenuBtn";
import { useState } from "react";
import Link from "next/link";

export default function NavBar2() {
  const [showNavMobile, setShowNavMobile] = useState(false);
  const toggleNavMobile = (show: boolean) => {
    setShowNavMobile(show);
  };

  return (
    <div className="h-20 px-4 lg:flex lg:h-fit lg:gap-x-6 lg:px-6 2xl:px-24">
      <div
        className={`flex h-full items-center justify-between space-x-1 text-2xl font-extrabold text-[#03081F] xl:text-4xl`}
      >
        <div className="flex items-center">
          <div>Zeco Eats</div>
          <div className="-rotate-90 bg-[#FC8A06] px-[0.20rem] py-1 text-xs xl:px-1 xl:text-xl">
            cm
          </div>
        </div>

        <div className="flex h-full w-16 items-center justify-center border-l-[1px] border-solid border-stone-400">
          <div
            className="z-20 cursor-pointer space-y-2 lg:hidden"
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

      {showNavMobile && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-5 lg:hidden"
          onClick={() => toggleNavMobile(false)}
        ></div>
      )}

      <ul
        className={`fixed right-0 top-16 z-20 h-fit space-y-4 py-4 transition-transform duration-300 ease-in-out lg:static lg:right-auto lg:top-auto lg:z-0 lg:h-auto lg:space-y-0 lg:py-0 ${showNavMobile ? "translate-x-0" : "translate-x-full lg:translate-x-0"} font-medium lg:flex lg:flex-grow lg:items-center lg:justify-between`}
      >
        <li>
          <Link
            className="= block w-full p-2 hover:bg-[#FC8A06] lg:w-auto lg:rounded-xl lg:p-2 lg:hover:text-white xl:p-3 2xl:rounded-3xl 2xl:px-6"
            href={"/"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="= block w-full p-2 hover:bg-[#FC8A06] lg:w-auto lg:rounded-xl lg:p-2 lg:hover:text-white xl:p-3 2xl:rounded-3xl 2xl:px-6"
            href={"/"}
          >
            Browse Menu
          </Link>{" "}
        </li>
        <li>
          <Link
            className="= block w-full p-2 hover:bg-[#FC8A06] lg:w-auto lg:rounded-xl lg:p-2 lg:hover:text-white xl:p-3 2xl:rounded-3xl 2xl:px-6"
            href={"/"}
          >
            Special Offers
          </Link>
        </li>
        <li>
          <Link
            className="= block w-full p-2 hover:bg-[#FC8A06] lg:w-auto lg:rounded-xl lg:p-2 lg:hover:text-white xl:p-3 2xl:rounded-3xl 2xl:px-6"
            href={"/"}
          >
            Restaurants
          </Link>
        </li>
        <li>
          <Link
            className="= block w-full p-2 hover:bg-[#FC8A06] lg:w-auto lg:rounded-xl lg:p-2 lg:hover:text-white xl:p-3 2xl:rounded-3xl 2xl:px-6"
            href={"/"}
          >
            Track Order
          </Link>
        </li>

        <li className="= flex w-full items-center gap-x-2 bg-[#03081F] p-2 text-white lg:w-auto lg:rounded-xl lg:p-2 xl:p-3 2xl:rounded-3xl 2xl:px-6">
          <span className="block rounded-full bg-[#FC8A06] p-1">
            <GoPersonFill color="#03081F" />
          </span>
          <Link href={"/"}>Login/Signup</Link>
        </li>
      </ul>
    </div>
  );
}
