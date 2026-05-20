import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}