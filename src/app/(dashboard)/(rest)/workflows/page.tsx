import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { requireAuth } from "@/lib/auth-utils";
import {
  WorkflowsContainer,
  WorkflowsList,
} from "@/modules/workflows/components/workflows";
import { prefetchWorkflows } from "@/modules/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";

export default async function page() {
  await requireAuth();

  prefetchWorkflows();

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
