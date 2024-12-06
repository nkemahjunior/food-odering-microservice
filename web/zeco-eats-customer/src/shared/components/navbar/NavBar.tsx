"use client"
import NavBar1 from "./NavBar1";
import NavBar1Mobile from "./NavBar2Mobile";
import NavBar2 from "./NavBar2";
import { usePathname } from "next/navigation";

export default function NavBar() {

  const pathname = usePathname()
  const notHome = pathname !== "/home";
  console.log("----------",notHome);
  return (
    <>
      <nav
        className={`${notHome && "border-b-2 border-solid border-background bg-white lg:sticky lg:top-0 lg:z-[1] 2xl:mb-8"}`}
      >
        <NavBar1 />
        <NavBar2 notHome={notHome} />
      </nav>
      <NavBar1Mobile notHome={notHome} />
    </>
    // <>
    //   <NavBar1Mobile />
    // </>
  );
}

