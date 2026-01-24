"use client";

import { ListEmpty } from "@/modules/shared/components/list-view/list-empty";
import { useCreateWorkflowWithNavigation } from "../../hooks/use-create-workflow-with-navigation";

/**
 * PURPOSE: Empty state with CTA to create first workflow
 * RENDERS: ListEmpty message with "Create workflow" button
 * USED BY: WorkflowsList as emptyView fallback
 * ACTIONS: Create workflow → navigate to editor, show upgrade modal on error
 * DEPENDS: useCreateWorkflowWithNavigation
 */
export const WorkflowsEmpty = () => {
  const { handleCreate, modal } = useCreateWorkflowWithNavigation();

  return (
    <>
      {modal}
      <ListEmpty
        message="You haven't created any workflows yet. Get started by creating your first workflow"
        onNew={handleCreate}
      />
    </>
  );
};
