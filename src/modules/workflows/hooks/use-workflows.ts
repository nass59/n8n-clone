import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useWorkflowsParams } from "./use-workflows-params";

/**
 * PURPOSE: Fetch workflows with suspense, respecting URL search params
 * PURE: No (tRPC query, URL read)
 * RETURNS: SuspenseQuery result with data.items, data.page, data.totalPages, etc.
 * USED BY: WorkflowsList, WorkflowsPagination components
 * DEPENDS: useWorkflowsParams for page/pageSize/search
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

/**
 * PURPOSE: Create new workflow with toast notifications
 * PURE: No (tRPC mutation, UI side effects)
 * RETURNS: UseMutation with mutate callback
 * USED BY: WorkflowsHeader, WorkflowsEmpty components
 * SIDE EFFECTS: Shows toast, invalidates getMany query cache
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
