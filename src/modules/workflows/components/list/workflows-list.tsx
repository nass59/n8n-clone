"use client";

import { ListItems } from "@/modules/shared/components/list-view/list-items";
import { WorkflowsEmpty } from "@/modules/workflows/components/list/workflows-empty";
import { useSuspenseWorkflows } from "../../hooks/use-workflows";

/**
 * Displays the list of workflows for the current user.
 *
 * Fetches workflows using Suspense-enabled tRPC query with parameters
 * from URL search params (page, pageSize, search). The component suspends
 * while data is loading, so it should be wrapped in a Suspense boundary.
 *
 * @remarks
 * Uses `useSuspenseWorkflows` which reads pagination and search params
 * from the URL via `useWorkflowsParams`. Data is prefetched on the server
 * and hydrated on the client for instant initial render.
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
