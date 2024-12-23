import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideNav from "@/shared/components/nav/SideNav";
import TopNav from "@/shared/components/nav/TopNav";
import Line from "@/shared/components/Line";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zeco-eats-businesses",
  description:
    "A platform for business owners to manage orders, menus, and analytics on Zeco Eats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-sm antialiased `}
      >
        <div className="w-full pl-6 pr-28 mb-8 space-y-4 sticky top-0 bg-white">
          <TopNav />
          <Line/>
        </div>
        <div className="grid grid-cols-[13fr,87fr]">
          <div className=" w-full pl-6 border-solid border-r-2 border-backgroundBorder ">
            <SideNav />
          </div>
          <div className="border-0 border-solid border-yellow-400 px-28">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
