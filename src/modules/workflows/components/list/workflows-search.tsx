"use client";

import { ListSearch } from "@/modules/shared/components/list-view/list-search";
import { useListSearch } from "@/modules/shared/hooks/use-list-search";
import { useWorkflowsParams } from "../../hooks/use-workflows-params";

/**
 * Search input for filtering workflows by name.
 *
 * Provides a debounced search input that updates the `search` URL parameter.
 * Changes trigger a re-fetch of the workflows list filtered by the search term.
 * Also resets pagination to page 1 when search value changes.
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
