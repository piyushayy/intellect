import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Intellect | CUET Learning Platform",
  description: "Master CUET with confidence. A calm, intelligent practice platform for Gen Z aspirants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(outfit.className, dmSerif.variable, "min-h-screen antialiased bg-slate-50")}>
        {children}
      </body>
    </html>
  );
}
