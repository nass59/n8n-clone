"use client";

import { ListHeader } from "@/modules/shared/components/list-view/list-header";
import { useCreateWorkflowWithNavigation } from "../../hooks/use-create-workflow-with-navigation";

/**
 * PURPOSE: Page header with "New workflow" button
 * RENDERS: Title, description, create button with loading state
 * USED BY: WorkflowsContainer as header section
 * ACTIONS: Create workflow → navigate to editor, show upgrade modal on error
 * DEPENDS: useCreateWorkflowWithNavigation
 */
export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const { handleCreate, isPending, modal } = useCreateWorkflowWithNavigation();

  return (
    <>
      {modal}
      <ListHeader
        actionDisabled={disabled}
        actionLabel="New workflow"
        actionLoading={isPending}
        description="Create and manage your workflows"
        onAction={handleCreate}
        title="Workflows"
      />
    </>
  );
};
