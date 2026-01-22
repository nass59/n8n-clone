/**
 * PURPOSE: Configure and create React Query client instance
 * EXPORTS: makeQueryClient factory function
 * CACHE: staleTime 30s - queries considered fresh for 30 seconds
 * DEHYDRATION: Serialize pending queries for SSR (Suspense support)
 * USED BY: /trpc/client.tsx for singleton instance creation
 */

import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

/**
 * PURPOSE: Factory function to create configured QueryClient
 * STALE_TIME: 30 seconds - data revalidation interval
 * DEHYDRATION: Include pending queries for Suspense boundaries in SSR
 * SERIALIZER: superjson for Date, Map, Set support
 * RETURNS: Configured QueryClient instance
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}
