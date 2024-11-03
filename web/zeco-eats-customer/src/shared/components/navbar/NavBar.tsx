import NavBar1 from "./NavBar1";
import NavBar1Mobile from "./NavBar2Mobile";
import NavBar2 from "./NavBar2";

export default function NavBar() {
  return (
    <nav className="lg:space-y-4 xl:text-lg">
      <NavBar1 />
      <NavBar2 />
      <NavBar1Mobile />
    </nav>
  );
}
