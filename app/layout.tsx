import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Study with Zenith",
  description: "An AI-powered study platform with gamification, quiz system, and AI mentor.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} dark`}>
      <body className="font-sans antialiased bg-black text-white selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
