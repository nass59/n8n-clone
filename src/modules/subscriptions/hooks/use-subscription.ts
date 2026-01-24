/**
 * Subscription hooks for Polar integration via Better Auth.
 * Provides type-safe access to customer subscription state.
 *
 * @module subscriptions/hooks
 * @see Better Auth Polar plugin: https://www.better-auth.com/docs/plugins/polar
 */

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

/**
 * Query key factory for subscription-related queries.
 * Centralizes key management for cache invalidation.
 */
export const subscriptionKeys = {
  all: ["subscription"] as const,
  state: () => [...subscriptionKeys.all, "state"] as const,
} as const;

/**
 * Type representing the customer state from Polar via Better Auth.
 * Inferred from the authClient for type safety.
 */
export type CustomerState = Awaited<
  ReturnType<typeof authClient.customer.state>
>["data"];

/**
 * Hook to fetch the current user's subscription state from Polar.
 * Uses React Query for caching, deduplication, and automatic refetching.
 *
 * Configuration follows Vercel React Best Practices (Section 4.3):
 * - staleTime: 5 minutes - subscription status rarely changes mid-session
 * - gcTime: 10 minutes - keep cached data for background tabs
 * - refetchOnWindowFocus: true - ensure fresh data when user returns
 *
 * @returns React Query result with customer subscription state
 */
export const useSubscription = () => {
  return useQuery({
    queryKey: subscriptionKeys.state(),
    queryFn: async (): Promise<CustomerState> => {
      const response = await authClient.customer.state();

      // Handle error response from Better Auth
      if (response.error) {
        throw new Error(
          response.error.message ?? "Failed to fetch subscription state"
        );
      }

      return response.data;
    },
    // Subscription state is relatively stable - 5 min staleness is reasonable
    staleTime: 5 * 60 * 1000,
    // Keep cached data for 10 minutes for background tabs
    gcTime: 10 * 60 * 1000,
    // Refetch when window regains focus to catch subscription changes
    refetchOnWindowFocus: true,
    // Don't retry on auth errors
    retry: (failureCount, error) => {
      // Don't retry auth-related errors
      if (
        error.message?.includes("unauthorized") ||
        error.message?.includes("Unauthorized")
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook to check if the current user has an active subscription.
 * Provides a simplified boolean interface for subscription gating.
 *
 * @returns Object containing:
 * - hasActiveSubscription: boolean indicating active subscription status
 * - subscription: the first active subscription object (if any)
 * - isLoading: loading state
 * - Additional React Query state (error, refetch, etc.)
 */
export const useHasActiveSubscription = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription();

  // Explicit boolean check per Vercel Best Practices (Rule 6.7)
  // Using explicit comparison instead of && to avoid rendering issues
  const hasActiveSubscription =
    customerState?.activeSubscriptions != null &&
    customerState.activeSubscriptions.length > 0;

  return {
    hasActiveSubscription,
    subscription: customerState?.activeSubscriptions?.[0],
    isLoading,
    ...rest,
  };
};
