"use client";

import { useRouter } from "next/navigation";
import { EntityHeader } from "@/components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useCreateWorkflow } from "../../hooks/use-workflows";

/**
 * Header component for the workflows list page.
 *
 * Displays the page title, description, and a "New workflow" button.
 * Handles workflow creation via tRPC mutation and navigates to the
 * new workflow's editor page on success. Shows an upgrade modal if
 * the user hits their subscription limits.
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
      <EntityHeader
        description="Create and manage your workflows"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        newButtonLabel="New workflow"
        onNew={handleCreate}
        title="Workflows"
      />
    </>
  );
};
