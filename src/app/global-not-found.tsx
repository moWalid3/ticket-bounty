import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 tracking-tighter">
          404 - Page Not Found
        </h1>
        <p>This page does not exist.</p>
      </body>
    </html>
  );
}
