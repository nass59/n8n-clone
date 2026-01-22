/**
 * PURPOSE: Debounced search with automatic pagination reset
 * INPUT: params object with search/page, setParams callback, optional debounceMs
 * OUTPUT: { searchValue, onSearchChange } for controlled search input
 * BEHAVIOR: Debounces input 500ms, resets page to 1 when search changes
 * GENERIC: T extends ListParams - works with any list pagination params
 * USED BY: List pages (workflows, integrations) as bridge to tRPC queries
 * PURE: No (reads/writes params, useState)
 */

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

export const useListSearch = <T extends ListParams>({
  params,
  setParams,
  debounceMs = 500,
}: UseListSearchOptions<T>) => {
  const [localSearch, setLocalSearch] = useState(params.search);

  useEffect(() => {
    const setSearchParams = (search: string) => {
      setParams({
        ...params,
        search,
        page: PAGINATION.DEFAULT_PAGE,
      });
    };

    if (localSearch === "" && params.search !== "") {
      setSearchParams("");
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setSearchParams(localSearch);
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
