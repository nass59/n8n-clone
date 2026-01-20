"use client";

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
    <div className="flex flex-1 items-center justify-center">
      <code>{JSON.stringify(workflows.data, null, 2)}</code>
    </div>
  );
};
