/**
 * Polar SDK client for subscription and payment management.
 *
 * This module provides the configured Polar client used throughout Nodebase
 * for managing customer subscriptions, checkout flows, and billing portal access.
 *
 * @remarks
 * Polar integrates with Better Auth to provide:
 * - Automatic customer creation on user signup
 * - Subscription checkout flows (e.g., `/pro` upgrade path)
 * - Customer portal for self-service billing management
 * - Subscription state verification for premium features
 *
 * @see {@link @/lib/auth} - Better Auth configuration using this client
 * @see {@link @/trpc/init} - Premium procedure using this client for subscription checks
 */

import { Polar } from "@polar-sh/sdk";

/**
 * Pre-configured Polar SDK client instance.
 *
 * Used for server-side operations including:
 * - Verifying customer subscription status in `premiumProcedure`
 * - Configuring Better Auth's Polar plugin for checkout and portal
 *
 * @example
 * ```typescript
 * // Check if a user has an active subscription
 * const customer = await polarClient.customers.getStateExternal({
 *   externalId: userId,
 * });
 *
 * const hasActiveSubscription = customer.activeSubscriptions?.length > 0;
 * ```
 *
 * @remarks
 * Required environment variables:
 * - `POLAR_ACCESS_TOKEN` - API access token from Polar dashboard
 * - `POLAR_SERVER` - Set to "production" for live mode, any other value uses sandbox
 *
 * @see https://docs.polar.sh/developers/sdk
 */
export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
});
