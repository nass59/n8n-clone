/**
 * Polar SDK client for subscription management and checkout.
 * Integrates with Better Auth for customer creation, checkout flows, and portal.
 * Env vars: POLAR_ACCESS_TOKEN, POLAR_SERVER (production|sandbox).
 */

import { Polar } from "@polar-sh/sdk";

/**
 * PURPOSE: SDK client for Polar subscription and payment operations
 * PURE: No (external API)
 * USED BY: auth.ts (Polar plugin), tRPC premiumProcedure (subscription checks), checkout flows
 * EXAMPLE: polarClient.customers.getStateExternal({ externalId: userId })
 */
export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
});
