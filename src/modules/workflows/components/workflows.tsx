"use client";

import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "@/modules/workflows/hooks/use-workflows";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex flex-1 items-center justify-center">
      {JSON.stringify(workflows.data, null, 2)}
    </div>
  );
};

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

export const WorkflowsContainer = ({ children }: PropsWithChildren) => {
  return (
    <EntityContainer header={<WorkflowsHeader />}>{children}</EntityContainer>
  );
};
