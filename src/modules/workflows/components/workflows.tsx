"use client";

import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "@/components/entity-components";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "@/modules/workflows/hooks/use-workflows";
import { useWorkflowsParams } from "@/modules/workflows/hooks/use-workflows-params";

export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      onChange={onSearchChange}
      placeholder="Search workflows"
      value={searchValue}
    />
  );
};

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex flex-1 items-center justify-center">
      <code>{JSON.stringify(workflows.data, null, 2)}</code>
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

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      onPageChange={(page) => setParams({ ...params, page })}
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
    />
  );
};

export const WorkflowsContainer = ({ children }: PropsWithChildren) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      pagination={<WorkflowsPagination />}
      search={<WorkflowSearch />}
    >
      {children}
    </EntityContainer>
  );
};
