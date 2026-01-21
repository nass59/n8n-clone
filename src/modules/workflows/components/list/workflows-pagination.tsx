"use client";

import { ListPagination } from "@/modules/shared/components/list-view/list-pagination";
import { useSuspenseWorkflows } from "../../hooks/use-workflows";
import { useWorkflowsParams } from "../../hooks/use-workflows-params";

/**
 * PURPOSE: Pagination controls with previous/next buttons
 * RENDERS: Page info and navigation buttons
 * USED BY: WorkflowsContainer as pagination section
 * ACTIONS: Update page URL param, disable while fetching
 * DEPENDS: useSuspenseWorkflows (data), useWorkflowsParams (URL updates)
 */
export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <ListPagination
      disabled={workflows.isFetching}
      onPageChange={(page) => setParams({ ...params, page })}
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
    />
  );
};
