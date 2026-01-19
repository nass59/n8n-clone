import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/db";
import { polarClient } from "@/lib/polar";

/**
 * The main Better Auth instance configured for Nodebase.
 *
 * Provides authentication via email/password with the following features:
 * - **Database**: PostgreSQL via Prisma adapter with Neon serverless support
 * - **Sessions**: 7-day expiry with 24-hour refresh and 5-minute cookie cache
 * - **Account Linking**: Allows linking Google and GitHub accounts
 * - **Rate Limiting**: 100 requests per 60-second window
 * - **Polar Integration**: Automatic customer creation and subscription checkout
 *
 * @remarks
 * The `nextCookies()` plugin enables seamless cookie handling in React Server Components.
 * The Polar plugin creates a customer record on signup and enables the `/pro` checkout flow.
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  rateLimit: {
    window: 60,
    max: 100,
  },
  plugins: [
    nextCookies(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: process.env.POLAR_PRODUCT_ID || "",
              slug: "pro",
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],
});

/**
 * Inferred session type from the Better Auth configuration.
 *
 * Contains the authenticated user data and session metadata. This type
 * automatically includes any additional fields added by plugins (e.g., Polar customer data).
 */
export type Session = typeof auth.$Infer.Session;
