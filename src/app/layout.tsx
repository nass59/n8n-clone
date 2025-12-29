import type { Metadata } from "next";
import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DevPlayground - Building the Web of Tomorrow",
  description:
    "An interactive laboratory for CSS experiments, TypeScript utilities, and UI components. Explore the resources for modern web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${splineSans.variable} dark`} lang="en">
      <body className={`${splineSansMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
