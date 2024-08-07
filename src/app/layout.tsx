import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Logo } from "../components/Logo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marin Hoodies",
  description: "Marin County neighborhood information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Logo />
        {children}
      </body>
    </html>
  );
}
