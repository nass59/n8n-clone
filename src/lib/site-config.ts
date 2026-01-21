/**
 * Global site configuration for metadata, branding, and URLs.
 * Used for SEO, social cards, theme, and navigation constants.
 * Single source of truth for site info (name, description, links, locale).
 */

/**
 * PURPOSE: Resolve base URL from env vars or defaults (localhost)
 * PURE: Yes
 * USED BY: siteConfig.url for absolute URLs in metadata
 */
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

/**
 * PURPOSE: Central config object for all site metadata and branding
 * PURE: Yes
 * USED BY: HTML head meta tags, social cards, navigation, landing pages
 */
export const siteConfig = {
  name: "Nodebase",
  tagline: "Workflow Automation Platform",
  description:
    "A workflow automation platform combining AI capabilities with business process automation. Technical flexibility of code with the speed of no-code.",
  url: getBaseUrl(),
  ogImage: "/seo/og-image.jpg",
  links: {
    twitter: "https://twitter.com/nass190",
    github: "https://github.com/nass59",
  },
  twitterHandle: "@nass190",
  locale: "en-US",
  themeColor: "#000000",
  creator: "nassim afrete",
} as const;

/**
 * PURPOSE: Type representing site configuration structure
 * PURE: Yes
 * USED BY: Typing config props and partial overrides
 */
export type SiteConfig = typeof siteConfig;
