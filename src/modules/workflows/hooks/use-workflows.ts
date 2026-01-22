/**
 * EXPORTS: useSuspenseWorkflows, useCreateWorkflow, useRemoveWorkflow
 * PURPOSE: Workflow data fetching and mutations with cache management
 * PATTERN: tRPC hooks with toast notifications and query invalidation
 * DEPENDS: useWorkflowsParams for URL state, tRPC client/query client
 */

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useWorkflowsParams } from "./use-workflows-params";

/**
 * PURPOSE: Fetch paginated workflows with suspense support
 * PURE: No (tRPC query, URL params)
 * RETURNS: SuspenseQuery with { data: { items, page, totalPages, ... } }
 * USED BY: WorkflowsList component
 * DEPENDS: useWorkflowsParams for pagination/search state
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

/**
 * PURPOSE: Create new workflow with optimistic UI updates
 * PURE: No (tRPC mutation, side effects)
 * RETURNS: UseMutation with mutate(input) callback
 * SIDE EFFECTS: Toast notification, cache invalidation
 * USED BY: WorkflowsHeader, WorkflowsEmpty components
 */
export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" created`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Failed to create workflow:${error.message}`);
      },
    })
  );
};

/**
 * PURPOSE: Delete workflow and update list state
 * PURE: No (tRPC mutation, side effects)
 * RETURNS: UseMutation with mutate({ id }) callback
 * SIDE EFFECTS: Toast notification, invalidates list and detail queries
 * USED BY: WorkflowItem, WorkflowsContainer components
 */
export const useRemoveWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" removed`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Failed to remove workflow:${error.message}`);
      },
    })
  );
};
