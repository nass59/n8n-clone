/**
 * PURPOSE: Create workflow and navigate to editor with error handling
 * PATTERN: Combines useCreateWorkflow with navigation and upgrade modal
 * RETURNS: { handleCreate, isPending, modal } for UI binding
 * USED BY: WorkflowsHeader, WorkflowsEmpty components
 */

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useCreateWorkflow } from "./use-workflows";

export const useCreateWorkflowWithNavigation = () => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = useCallback(() => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  }, [createWorkflow, router, handleError]);

  return {
    handleCreate,
    isPending: createWorkflow.isPending,
    modal,
  };
};
