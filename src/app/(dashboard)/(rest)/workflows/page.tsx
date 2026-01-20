import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  WorkflowsContainer,
  WorkflowsList,
} from "@/modules/workflows/components/workflows";
import { workflowsParamsLoader } from "@/modules/workflows/server/params-loader";
import { prefetchWorkflows } from "@/modules/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

/**
 * Workflows listing page with server-side URL param parsing and data prefetching.
 *
 * This page demonstrates the nuqs server-side integration pattern:
 *
 * 1. **Parse URL params**: Uses `workflowsParamsLoader` to parse the raw
 *    `searchParams` promise into typed values (page, pageSize, search)
 *
 * 2. **Prefetch data**: Passes parsed params to `prefetchWorkflows` which
 *    populates the tRPC query cache server-side
 *
 * 3. **Hydrate client**: Wraps children in `HydrateClient` to transfer the
 *    prefetched data to client components without refetching
 *
 * The `WorkflowsList` client component can then use `useQueryStates(workflowsParams)`
 * to read/write the same URL params with full type safety, and the prefetched
 * data will be immediately available.
 *
 * @example URL parameter flow
 * ```
 * URL: /workflows?page=2&search=invoice
 *
 * Server:
 *   params = await workflowsParamsLoader(searchParams)
 *   // { page: 2, pageSize: 10, search: "invoice" }
 *
 * Client (WorkflowsList):
 *   const [params, setParams] = useQueryStates(workflowsParams)
 *   // Same typed params, synced with URL
 * ```
 */
export default async function page({ searchParams }: Props) {
  const params = await workflowsParamsLoader(searchParams);

  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error !</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
