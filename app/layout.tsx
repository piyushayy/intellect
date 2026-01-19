import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: {
    template: '%s | Intellect',
    default: 'Intellect | CUET Practice Questions & PYQs – Prepare for a Better College',
  },
  description: "Practice CUET questions, PYQs, and mock tests in a clean, student-friendly platform designed for better college admissions.",
  openGraph: {
    title: 'Intellect | CUET Practice Questions & PYQs',
    description: 'Master concepts in Math, Science, and English with interactive problem solving. Built for the ambitious CUET aspirant.',
    url: 'https://intellect.edu',
    siteName: 'Intellect',
    images: [
      {
        url: 'https://intellect.edu/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
        alt: 'Intellect CUET Prep',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intellect | CUET Practice Questions & PYQs',
    description: 'Master CUET with confidence. A calm, intelligent practice platform for Gen Z aspirants.',
  },
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
