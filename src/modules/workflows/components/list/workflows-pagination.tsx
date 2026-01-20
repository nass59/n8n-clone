"use client";

import { ListPagination } from "@/modules/shared/components/list-view/list-pagination";
import { useSuspenseWorkflows } from "../../hooks/use-workflows";
import { useWorkflowsParams } from "../../hooks/use-workflows-params";

/**
 * Pagination controls for the workflows list.
 *
 * Displays current page info and previous/next navigation buttons.
 * Updates URL search params when page changes via `nuqs`, which triggers
 * a re-fetch of the workflows list with the new page parameter.
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
