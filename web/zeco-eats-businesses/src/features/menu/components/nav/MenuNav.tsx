"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuNav() {
    const pathname = usePathname()

   
  return (
    <div className="font-medium flex justify-between">
      <div className="flex items-center space-x-8">
        <Link  href="overview" className={` ${pathname=='/menu/overview' ? '  border-secondary':' border-transparent'} pb-2 border-solid border-b-4 `}>
          Overview
        </Link>
        <Link  href="menus" className={` ${pathname=='/menu/menus' ? '  border-secondary':' border-transparent'} pb-2 border-solid border-b-4 `}>
          Menus
        </Link>
        <Link  href="categories" className={` ${pathname=='/menu/categories' ? '  border-secondary':' border-transparent'} pb-2 border-solid border-b-4 `}>
          Categories
        </Link>
        <Link  href="items" className={` ${pathname=='/menu/items' ? '  border-secondary':' border-transparent'} pb-2 border-solid border-b-4 `}>
          Items
        </Link>
        <Link  href="customisations" className={` ${pathname=='/menu/customisations' ? '  border-secondary':' border-transparent'} pb-2 border-solid border-b-4 `}>
          Customisations
        </Link>
      </div>

      <div>
        <Link  href="see-changes" className={` ${pathname=='/menu/see-changes' ? '  border-secondary':' border-transparent'} pb-2 border-solid border-b-4 `}>
          See changes
        </Link>
      </div>
    </div>
  );
}
