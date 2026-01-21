import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getMany>;

/**
 * PURPOSE: Prefetch workflows on server for hydration
 * PURE: No (tRPC query)
 * USED BY: Server components for instant client-side data
 * DEPENDS: @/trpc/server
 */
export const prefetchWorkflows = (params: Input) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};
