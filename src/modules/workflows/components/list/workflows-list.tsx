"use client";

/**
 * PURPOSE: Render paginated workflows list with empty state
 * RENDERS: Grid of WorkflowItem components via ListItems
 * PATTERN: Suspense component - requires Suspense boundary parent
 * DATA: useSuspenseWorkflows provides items, pagination from URL params
 * EMPTY STATE: WorkflowsEmpty when no workflows exist
 * USED BY: WorkflowsContainer, wrapped in Suspense
 * PURE: No (tRPC query, URL params)
 */

import { ListItems } from "@/modules/shared/components/list-view/list-items";
import { useSuspenseWorkflows } from "../../hooks/use-workflows";
import { WorkflowsEmpty } from "./workflows-empty";
import { WorkflowItem } from "./workflows-item";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <ListItems
      emptyView={<WorkflowsEmpty />}
      getKey={(workflow) => workflow.id}
      items={workflows.data.items}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
    />
  );
};
