import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideNav from "@/shared/components/nav/SideNav";
import TopNav from "@/shared/components/nav/TopNav";
import Line from "@/shared/components/Line";
import ModalProvider from "@/shared/context/modal/ModalProvider";
import Modal from "@/shared/components/modal/Modal";

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
        <ModalProvider>
          <Modal />
          <div className="sticky top-0 z-[10] w-full space-y-4 bg-white pl-6 pr-28 pt-4">
            <TopNav />
            <Line />
          </div>

          <div className="top-0h fixed left-0 z-[9] h-screen w-[15rem] overflow-y-auto border-r-2 border-solid border-backgroundBorder pl-6 pt-[1rem]">
            <SideNav />
          </div>

          <div className="ml-[15rem] px-28 pt-[1rem]">{children}</div>
        </ModalProvider>
      </body>
    </html>
  );
}
