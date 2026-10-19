import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { PwaRegistration } from "@/components/pwa-registration";
import "./globals.css";

const barlow = Barlow({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BUNEX — Smashburger in Teltow",
  description:
    "BUNEX Smashburger in Teltow — knusprig gesmasht, saftig serviert. Burger, Chicken, Veggie und mehr.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffec00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        {children}
        <PwaRegistration />
      </body>
    </html>
  );
}
