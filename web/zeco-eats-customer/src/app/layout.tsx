import type { Metadata } from "next";
import { Fuzzy_Bubbles, Inter, Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import { auth } from "./auth";
import ExpiredTokenCheck from "./ExpiredTokenCheck";
import { poppins } from "@/shared/fonts/fonts";

export const metadata: Metadata = {
  title: "zeco eats",
  description: "Get your food wherever you want",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const session = await auth();
  // console.log("-----------------");
  // console.log(session);
  // console.log("-----------------");

  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        {/* <AuthProvider session={session}>
          <ExpiredTokenCheck>
              {children}
          </ExpiredTokenCheck>
        </AuthProvider> */}
      </body>
    </html>
  );
}
