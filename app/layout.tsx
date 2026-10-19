import type { Metadata, Viewport } from "next";
import { Karla, Playfair_Display } from "next/font/google";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
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
  themeColor: "#f4bd18",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${karla.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
