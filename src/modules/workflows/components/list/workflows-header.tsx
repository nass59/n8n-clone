"use client";

import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { ListHeader } from "@/modules/shared/components/list-view/list-header";
import { useCreateWorkflow } from "../../hooks/use-workflows";

/**
 * PURPOSE: Page header with "New workflow" button
 * RENDERS: Title, description, create button with loading state
 * USED BY: WorkflowsContainer as header section
 * ACTIONS: Create workflow → navigate to editor, show upgrade modal on error
 * DEPENDS: useCreateWorkflow, useUpgradeModal, useRouter
 */
export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <ListHeader
        actionDisabled={disabled}
        actionLabel="New workflow"
        actionLoading={createWorkflow.isPending}
        description="Create and manage your workflows"
        onAction={handleCreate}
        title="Workflows"
      />
    </>
  );
};
