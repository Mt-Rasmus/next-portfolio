// src/fonts.ts
import { Montserrat, Roboto } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});
