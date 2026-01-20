"use client";

import { EntityPagination } from "@/components/entity-components";
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
    <EntityPagination
      disabled={workflows.isFetching}
      onPageChange={(page) => setParams({ ...params, page })}
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
    />
  );
};
