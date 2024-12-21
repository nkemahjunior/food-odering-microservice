import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideNav from "@/shared/components/nav/SideNav";
import TopNav from "@/shared/components/nav/TopNav";


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
  description: "A platform for business owners to manage orders, menus, and analytics on Zeco Eats",
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
        <TopNav />
        <div className="grid grid-cols-[30fr,70fr]">
          <SideNav />
          {children}
        </div>
      </body>
    </html>
  );
}
