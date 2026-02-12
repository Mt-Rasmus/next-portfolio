import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Provider } from "@/components/ui/provider";
import EmotionRegistry from "./EmotionRegistry";
import "./globals.css";
import { montserrat } from "./fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Rasmus Ståhl",
  description: "Simple portfolio site showing off some of my projects.",
  icons: {
    icon: "/r2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <EmotionRegistry>
          <Provider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Provider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
