"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //  const pathname = usePathname();

  // Define auth paths where you don't want Navbar/Footer
  // const hideNavPaths = ["/auth", "/signup", "/signin"];

  // const hideNav = hideNavPaths.includes(pathname);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
   
        {children}
   
      </body>
    </html>
  );
}
