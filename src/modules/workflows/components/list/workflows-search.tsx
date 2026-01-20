"use client";

import { EntitySearch } from "@/components/entity-components";
import { useEntitySearch } from "@/hooks/use-entity-search";
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
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      onChange={onSearchChange}
      placeholder="Search workflows"
      value={searchValue}
    />
  );
};
