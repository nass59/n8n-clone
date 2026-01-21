/**
 * Server-side Better Auth instance with Polar subscription plugin.
 * Provides email/password auth, session management, account linking, and subscription checkout.
 * Session: 7-day expiry, 24-hour refresh window, 5-min cookie cache.
 * Rate limit: 100 req/60s.
 */

import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/db";
import { polarClient } from "@/lib/polar";

/**
 * PURPOSE: Main Better Auth server instance for authentication and session management
 * PURE: No (DB, Polar API)
 * USED BY: auth-utils.ts (getSession, requireAuth), tRPC context
 * PLUGINS: nextCookies (RSC support), Polar (customer creation, checkout, portal)
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
 * PURPOSE: Type representing authenticated session with user and Polar data
 * OUTPUT: Contains user data, session metadata, and subscription info (if Polar customer)
 * USED BY: Auth guards, tRPC context, protected components
 */
export type Session = typeof auth.$Infer.Session;
