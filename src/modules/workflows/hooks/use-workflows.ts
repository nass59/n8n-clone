import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";

/**
 * Hook to fetch all workflows using Suspense
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getMamy.queryOptions());
};

/**
 * Hook to create a new workflow
 */
export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" created`);

        queryClient.invalidateQueries(trpc.workflows.getMamy.queryOptions());
      },
      onError: (error) => {
        toast.error(`Failed to create workflow:${error.message}`);
      },
    })
  );
};
