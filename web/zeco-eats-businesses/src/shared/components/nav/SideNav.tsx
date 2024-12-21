//import Link from "next/link";
//import { IoMdHome } from "react-icons/io";
import NavLink, { nestedLinks } from "./NavLink";

 
const obj:nestedLinks = {
  mainLink: "main 1",
  childLink: [
    " child 1",
    "child 2",
    {
      mainLink: "child main 1",
      childLink: [
        " child child main",
        " child child main",
        { mainLink: "child main link 3", childLink: ["one ", "two"] },
      ],
    },
  ],
  initialPaddingLeft: 0,
  paddingIncrement: 1,
};

export default function SideNav() {
    return (
      <div className="h-screen w-[20vw] border-2 border-solid border-red-700">
        {/* <Link href="" className="block border-2 border-solid border-purple-700">
          {" "}
          <span>
            <IoMdHome />
          </span>

        </Link> */}
        <NavLink nested={false} nestedLinks={obj} />
      </div>
    );
}