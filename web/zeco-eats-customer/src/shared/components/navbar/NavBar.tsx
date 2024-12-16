"use client";
import NavBar1 from "./NavBar1";
import NavBar1Mobile from "./NavBar2Mobile";
import NavBar2 from "./NavBar2";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const notHome = pathname !== "/home";
  const blacklistedRoutes = ["/dish-details", ];
  const hideNavBar = blacklistedRoutes.some((route) =>
    pathname.endsWith(route),
  );


  

  return (
    <>
      <nav
        className={`${notHome && "lg: lg: lg: sticky top-0 z-[1] border-solid border-backgroundBorder bg-white 2xl:mb-8 2xl:border-b-[1px]"}`}
      >
        <NavBar1 />
        {!hideNavBar && <NavBar2 notHome={notHome} />}
      </nav>
      {/* <NavBar1Mobile pathname={pathname} /> */}
    </>
    // <>
    //   <NavBar1Mobile />
    // </>
  );
}
