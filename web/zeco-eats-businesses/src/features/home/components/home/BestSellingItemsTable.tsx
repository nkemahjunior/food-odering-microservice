import Heading2 from "@/shared/components/text/Heading2";
import Image from "next/image";
import React from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

// Example data with image URLs
const bestSellingItemsData = [
  {
    name: "Grilled Chicken Sandwich",
    quantitySold: 1200,
    totalSales: 1200,
    category: "Main Course",
    image: "/devImages/food1.webp",
    status: "up",
  },
  {
    name: "Veggie Burger",
    quantitySold: 850,
    totalSales: 850,
    category: "Main Course",
    image: "/devImages/food1.webp",
    status: "down",
  },
  {
    name: "Spaghetti Carbonara",
    quantitySold: 1000,
    totalSales: 1000,
    category: "Main Course",
    image: "/devImages/food1.webp",
    status: "up",
  },
  {
    name: "Spaghetti Carbonara",
    quantitySold: 1000,
    totalSales: 1000,
    category: "Main Course",
    image: "/devImages/food1.webp",
    status: "up",
  },
  {
    name: "Spaghetti Carbonara",
    quantitySold: 1000,
    totalSales: 1000,
    category: "Main Course",
    image: "/devImages/food1.webp",
    status: "down",
  },
  // Add more items here
];

export default function BestSellingItemsTable() {
  return (
    <div className=" space-y-8">
      <div className="flex w-full items-center justify-between ">
        <Heading2 text="Best Selling Items" />
        <div className="w-fit rounded-lg bg-background p-2">
          <p>Last 30 days</p>
        </div>
      </div>
      <div className="w-full rounded-xl border-[1px] border-solid border-backgroundBorder py-4">
        <table className="w-full table-auto">
          <thead className="">
            <tr>
              <th className="px-4 py-4 text-start text-textTint">Item</th>
              <th className="px-4 py-4 text-start text-textTint">
                Quantity sold
              </th>
              <th className="px-4 py-4 text-start text-textTint">Sales</th>
              <th className="px-4 py-4 text-start text-textTint">Reviews</th>
            </tr>
          </thead>

          <tbody>
            {bestSellingItemsData.map((el, i) => (
              <tr
                key={i}
                className="cursor-pointer border-b-[0px] border-solid border-backgroundBorder transition-colors duration-300 last:border-b-0 hover:bg-background"
              >
                <td className="flex items-center space-x-4 px-4 py-4 text-start">
                  <span className="relative block h-8 w-8 overflow-hidden rounded-full">
                    <Image src={el.image} alt={el.name} fill />
                  </span>
                  <span>{el.name}</span>
                </td>

                <td className="px-4 py-4 text-start">{el.quantitySold}</td>

                <td className="space-x-2 px-4 py-4 text-start">
                  <div className="flex w-full space-x-3">
                    <span
                      className={`${el.status === "up" ? "bg-green-300 text-green-900" : "bg-red-300 text-red-900"} flex h-6 w-6 items-center justify-center rounded-full`}
                    >
                      {el.status === "up" ? (
                        <MdArrowUpward />
                      ) : (
                        <MdArrowDownward />
                      )}
                    </span>
                    <span>£{el.totalSales}</span>
                  </div>
                </td>

                <td className="px-4 py-4 text-start">{20}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 *     <div className="h-fit rounded-xl border-[1px] border-solid border-backgroundBorder py-4">
      <div className="w-full px-4 py-4">
        <Heading2 text="Best Selling Items" />
      </div>
      <table className="w-full table-autoj">
        <thead className="bg-background">
          <tr>
            <th className="px-4 py-4 text-start">Item</th>
            <th className="px-4 py-4 text-start">Quantity sold</th>
            <th className="px-4 py-4 text-start">Sales</th>
            <th className="px-4 py-4 text-start">Reviews</th>
          </tr>
        </thead>
        <tbody>
          {bestSellingItemsData.map((el, i) => (
            <tr key={i} className="odd:bg-white even:bg-background">
              <td className="flex items-center space-x-2 px-4 py-4 text-start">
                <span className="relative block h-6 w-6 overflow-hidden rounded-full">
                  <Image src={el.image} alt={el.name} fill />
                </span>
                <span>{el.name}</span>
              </td>

              <td className="flex space-x-2 px-4 py-4 text-start">
                <span
                  className={`${el.status === "up" ? "bg-green-300 p-2 text-green-900" : "bg-red-300 p-2 text-red-900"} overflow-hidden rounded-full`}
                >
                  {el.status === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                </span>
                <span>{el.quantitySold}</span>
              </td>

              <td className="flex space-x-2 px-4 py-4 text-start">
                <span></span>
                <span>{el.totalSales}</span>
              </td>
              <td className="px-4 py-4 text-start">{20}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 */
