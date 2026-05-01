import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/organism/Navbar";
import Footer from "./components/organism/Footer";
import "./globals.css";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="pt-16">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
