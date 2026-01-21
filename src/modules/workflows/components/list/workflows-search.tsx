"use client";

import { ListSearch } from "@/modules/shared/components/list-view/list-search";
import { useListSearch } from "@/modules/shared/hooks/use-list-search";
import { useWorkflowsParams } from "../../hooks/use-workflows-params";

/**
 * PURPOSE: Debounced search input to filter workflows by name
 * RENDERS: ListSearch input with placeholder
 * USED BY: WorkflowsContainer as search section
 * ACTIONS: Update search URL param, reset page to 1
 * DEPENDS: useWorkflowsParams, useListSearch (debounce + pagination reset)
 */
export const WorkflowSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useListSearch({
    params,
    setParams,
  });

  return (
    <ListSearch
      label="Search workflows"
      onChange={onSearchChange}
      placeholder="Search workflows"
      value={searchValue}
    />
  );
};
