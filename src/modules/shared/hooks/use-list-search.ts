import { useEffect, useState } from "react";
import { PAGINATION } from "@/config/constants";

type ListParams = {
  search: string;
  page: number;
};

type UseListSearchOptions<T extends ListParams> = {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
};

/**
 * PURPOSE: Debounced search input with pagination reset
 * BEHAVIOR: Debounces search input 500ms, resets to page 1 on search change
 * GENERIC: T extends ListParams - works with any params type
 * RETURNS: { searchValue, onSearchChange } for controlled ListSearch component
 * USED BY: All list pages - bridges ListSearch component to tRPC queries
 */
export const useListSearch = <T extends ListParams>({
  params,
  setParams,
  debounceMs = 500,
}: UseListSearchOptions<T>) => {
  const [localSearch, setLocalSearch] = useState(params.search);

  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({
        ...params,
        search: "",
        page: PAGINATION.DEFAULT_PAGE,
      });

      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [localSearch, params, setParams, debounceMs]);

  useEffect(() => {
    setLocalSearch(params.search);
  }, [params.search]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
};
