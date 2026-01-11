"use client";

import { useSuspenseWorkflows } from "@/modules/workflows/hooks/use-workflows";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return <div>{JSON.stringify(workflows.data, null, 2)}</div>;
};
