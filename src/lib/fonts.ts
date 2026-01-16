import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";

/**
 * Primary sans-serif font for body text and UI elements.
 *
 * @remarks
 * Available via CSS variable `--font-sans` in Tailwind config.
 * Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
 */
export const fontSans = Spline_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * Monospace font for code blocks, technical content, and data displays.
 *
 * @remarks
 * Available via CSS variable `--font-mono` in Tailwind config.
 * Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
 */
export const fontMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * Combined CSS class string containing all font CSS variables.
 * Apply this to the `<html>` element to make fonts available globally.
 *
 * @example
 * <html className={`${fontVariables} dark`} lang="en">
 */
export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
