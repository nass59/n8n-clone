import { useQueryStates } from "nuqs";
import { workflowsParams } from "../params";

/**
 * PURPOSE: Client-side hook to read/write workflows list URL params
 * PURE: No (URL manipulation)
 * RETURNS: [params, setParams] tuple (nuqs useQueryStates)
 * USED BY: WorkflowSearch, WorkflowsPagination, useSuspenseWorkflows
 * DEPENDS: nuqs, ../params
 */
export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams);
};
