"use client";

import { ListItems } from "@/modules/shared/components/list-view/list-items";
import { WorkflowsEmpty } from "@/modules/workflows/components/list/workflows-empty";
import { useSuspenseWorkflows } from "../../hooks/use-workflows";

/**
 * PURPOSE: Render workflows list with pagination/search respecting URL params
 * RENDERS: ListItems with workflow name, empty state fallback
 * SUSPENDS: While workflows are loading (requires Suspense boundary)
 * USED BY: WorkflowsContainer as children
 * DATA: From useSuspenseWorkflows (page, pageSize, search from URL)
 */
export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <ListItems
      emptyView={<WorkflowsEmpty />}
      getKey={(workflow) => workflow.id}
      items={workflows.data.items}
      renderItem={(workflow) => <p>{workflow.name}</p>}
    />
  );
};
