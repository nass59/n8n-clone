import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { WorkflowsContainer } from "@/modules/workflows/components/list/workflows-container";
import { WorkflowsError } from "@/modules/workflows/components/list/workflows-error";
import { WorkflowsList } from "@/modules/workflows/components/list/workflows-list";
import { WorkflowsLoading } from "@/modules/workflows/components/list/workflows-loading";
import { workflowsParamsLoader } from "@/modules/workflows/server/params-loader";
import { prefetchWorkflows } from "@/modules/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

/**
 * PURPOSE: Workflows listing page with server-side URL param parsing and data prefetching
 * RENDERS: Workflows list with error boundary, loading state, and tRPC hydration
 */
export default async function page({ searchParams }: Props) {
  const params = await workflowsParamsLoader(searchParams);

  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
