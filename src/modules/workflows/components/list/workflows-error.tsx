"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { ListError } from "@/modules/shared/components/list-view/list-error";
import { useTRPC } from "@/trpc/client";

/**
 * PURPOSE: Error state fallback for workflows list with retry capability
 * RENDERS: ListError message with "Try again" button
 * USED BY: Suspense error boundary fallback in page layout
 * ACTIONS: Invalidates workflows query to trigger refetch
 */
export const WorkflowsError = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const handleRetry = useCallback(() => {
    queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
  }, [queryClient, trpc.workflows.getMany]);

  return (
    <ListError message="Error loading workflows..." onRetry={handleRetry} />
  );
};
