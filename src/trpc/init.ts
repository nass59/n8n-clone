/** biome-ignore-all lint/suspicious/useAwait: temp */

/**
 * PURPOSE: Initialize tRPC server with context and procedure types
 * EXPORTS: createTRPCRouter, createCallerFactory, baseProcedure, protectedProcedure, premiumProcedure
 * TRANSPORT: superjson serializer (supports Date, Set, Map, etc.)
 * USED BY: /trpc/routers/_app.ts and all tRPC procedure files
 */

import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";
import { auth } from "@/lib/auth";
import { polarClient } from "@/lib/polar";

/**
 * PURPOSE: Build request context with auth/customer info
 * PATTERN: React.cache() ensures singleton per request
 * NOTE: Currently returns stub { userId }, to be expanded with session
 */
export const createTRPCContext = cache(async () => {
  return { userId: "user_123" };
});

/**
 * PURPOSE: Initialize tRPC instance with superjson transformer
 * TRANSFORMER: superjson handles Date, Map, Set serialization
 */
const t = initTRPC.create({
  transformer: superjson,
});

/**
 * PURPOSE: Public procedure - no auth required
 * USED BY: Login, signup, public data endpoints
 */
export const baseProcedure = t.procedure;

/**
 * PURPOSE: Create tRPC router with type safety
 * USED BY: Workflow router, integrations router, etc.
 */
export const createTRPCRouter = t.router;

/**
 * PURPOSE: Create RPC caller for direct server invocation
 * USED BY: Server actions, SSR data fetching
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * PURPOSE: Authenticated procedure - requires valid session
 * AUTH: Validates via Better Auth session from headers
 * ERROR: Throws UNAUTHORIZED if no session
 * CONTEXT: Adds ctx.auth (session object) to procedures
 * USED BY: Protected endpoints (workflows, integrations, etc.)
 */
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});

/**
 * PURPOSE: Premium procedure - requires active Polar subscription
 * AUTH: Extends protectedProcedure (requires session first)
 * SUBSCRIPTION: Validates via Polar API (activeSubscriptions check)
 * ERROR: Throws FORBIDDEN if no active subscription
 * CONTEXT: Adds ctx.customer (Polar customer object) to procedures
 * USED BY: Premium features (advanced automation, etc.)
 */
export const premiumProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });

    if (
      !customer.activeSubscriptions ||
      customer.activeSubscriptions.length === 0
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Active subscription required",
      });
    }

    return next({ ctx: { ...ctx, customer } });
  }
);
