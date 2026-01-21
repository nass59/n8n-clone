import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

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
 * PURPOSE: Root layout with global metadata and provider setup
 * RENDERS: HTML document with Providers and children
 * USES: siteConfig for metadata, fontVariables for styling
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
