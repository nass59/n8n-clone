import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

/**
 * Viewport configuration for responsive design and mobile optimization.
 *
 * @remarks
 * Separated from metadata as per Next.js 14+ best practices.
 * The `themeColor` affects the browser chrome on mobile devices.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

/**
 * Global metadata configuration for SEO and social sharing.
 *
 * @remarks
 * - Uses title template so child pages can set `title: "Page Name"` and get "Page Name | Nodebase"
 * - `metadataBase` is required for absolute URLs in OG images and canonical links
 * - All values are sourced from `siteConfig` for consistency
 *
 * @example
 * export const metadata: Metadata = {
 *   title: "Workflows", // Renders as "Workflows | Nodebase"
 * };
 */
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Root layout component defining the HTML document structure.
 *
 * @remarks
 * This component is intentionally minimal, focusing only on:
 * - HTML document structure (`<html>`, `<body>`)
 * - Font CSS variables application
 * - Language and accessibility attributes
 *
 * All client-side context providers are delegated to the `Providers` component,
 * keeping this layout as a pure Server Component.
 *
 * The `suppressHydrationWarning` on `<html>` prevents React warnings
 * when the dark mode class differs between server and client render.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={`${fontVariables} dark`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
