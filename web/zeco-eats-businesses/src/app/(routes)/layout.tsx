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
        className={`${geistSans.variable} ${geistMono.variable} text-sm antialiased`}
      >
        <div className="sticky top-0 z-[10] w-full space-y-4 bg-white pl-6 pr-28 pt-4">
          <TopNav />
          <Line />
        </div>

        <div className="fixed  left-0 top-0h z-[9] h-screen w-[15rem] overflow-y-auto border-r-2 border-solid border-backgroundBorder pl-6 pt-[1rem]">
          <SideNav />
        </div>

        <div className="ml-[15rem]  px-28 pt-[1rem]">
          {children}
        </div>

        {/* <div className="grid grid-cols-[13fr,87fr]">
          <div className="h-screen  sticky  top-14 w-full border-2 border-solid border-backgroundBorder pl-6">
            <SideNav />
          </div>
          <div className="border-0 border-solid border-yellow-400 px-28">
            {children}
          </div>
        </div> */}
      </body>
    </html>
  );
}
