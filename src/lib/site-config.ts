/**
 * Base URL for the application.
 * Uses environment variable in production, falls back to localhost in development.
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
 * Central configuration object for the Nodebase application.
 */
export const siteConfig = {
  /** Application name used in titles and branding */
  name: "Nodebase",

  /** Short tagline for the application */
  tagline: "Workflow Automation Platform",

  /** Full description for SEO and meta tags */
  description:
    "A workflow automation platform combining AI capabilities with business process automation. Technical flexibility of code with the speed of no-code.",

  /** Base URL for the application (used for absolute URLs in metadata) */
  url: getBaseUrl(),

  /** Path to the default Open Graph image */
  ogImage: "/seo/og-image.jpg",

  /** Social media and contact links */
  links: {
    twitter: "https://twitter.com/nass190",
    github: "https://github.com/nass59",
  },

  /** Twitter handle for Twitter cards (without @) */
  twitterHandle: "@nass190",

  /** Default locale for the application */
  locale: "en-US",

  /** Theme color for browser chrome (mobile) */
  themeColor: "#000000",

  /** Creator/author information */
  creator: "nassim afrete",
} as const;

/**
 * Type representing the site configuration object.
 * Useful for typing props that accept partial config.
 */
export type SiteConfig = typeof siteConfig;
