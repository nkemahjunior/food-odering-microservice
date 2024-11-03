import { Fuzzy_Bubbles, Inter, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const fuzzyBubbles = Fuzzy_Bubbles({
  weight: ["400", "700"],
  subsets: ["latin"],
});
