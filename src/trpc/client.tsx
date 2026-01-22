"use client";

/**
 * PURPOSE: Root tRPC + React Query provider for client-side API access
 * EXPORTS: TRPCProvider, useTRPC hook (exported as context), TRPCReactProvider component
 * PATTERN: Singleton query client in browser, fresh instance on server
 * TRANSPORT: httpBatchLink with superjson serialization (date, Set, Map support)
 * USED BY: Root layout (app/_app.tsx)
 */

// NOTE: "use client" allows mounting from server component root

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";
import superjson from "superjson";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "./routers/_app";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;

/**
 * PURPOSE: Lazily create or return singleton QueryClient instance
 * BEHAVIOR: Server creates fresh instance, browser caches singleton
 * NOTE: Singleton prevents React Suspense from destroying client on initial render
 */
function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

/**
 * PURPOSE: Compute tRPC endpoint URL based on environment
 * CLIENT: Empty string (uses relative path)
 * SERVER: Vercel URL or localhost:3000
 * RETURNS: Base URL + /api/trpc
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") {
      return "";
    }

    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    return "http://localhost:3000";
  })();

  return `${base}/api/trpc`;
}

/**
 * PURPOSE: Wrap app with tRPC client + React Query providers
 * COMPOSITION: QueryClientProvider > TRPCProvider > children
 * NOTE: useState for trpcClient avoids re-creating during Suspense boundaries
 * USED BY: Root layout as wrapper around {children}
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
