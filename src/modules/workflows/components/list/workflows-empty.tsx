import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { ListEmpty } from "@/modules/shared/components/list-view/list-empty";
import { useCreateWorkflow } from "@/modules/workflows/hooks/use-workflows";

/**
 * PURPOSE: Empty state with CTA to create first workflow
 * RENDERS: ListEmpty message with "Create workflow" button
 * USED BY: WorkflowsList as emptyView fallback
 * ACTIONS: Create workflow → navigate to editor, show upgrade modal on error
 * DEPENDS: useCreateWorkflow, useUpgradeModal, useRouter
 */
export const WorkflowsEmpty = () => {
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
      <ListEmpty
        message="You haven't created any workflows yet. Get started by creating your first workflow"
        onNew={handleCreate}
      />
    </>
  );
};
