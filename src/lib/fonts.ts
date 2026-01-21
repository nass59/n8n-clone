/**
 * Google Fonts configuration for Next.js.
 * fontVariables string applied to <html> to expose --font-sans and --font-mono CSS vars.
 */

import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";

/**
 * PURPOSE: Primary sans-serif font (Spline Sans) with weights 300-700
 * OUTPUT: CSS variable --font-sans for Tailwind config
 * USED BY: Root layout to apply globally
 */
export const fontSans = Spline_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * PURPOSE: Monospace font (Spline Sans Mono) for code and technical content
 * OUTPUT: CSS variable --font-mono for Tailwind config
 * USED BY: Root layout, code blocks, data displays
 */
export const fontMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * PURPOSE: Combined CSS variable string for both fonts
 * OUTPUT: Space-separated className string
 * USED BY: <html className={fontVariables}> in root layout
 */
export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
