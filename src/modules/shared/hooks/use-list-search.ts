/**
 * PURPOSE: Debounced search with automatic pagination reset
 * INPUT: params object with search/page, setParams callback, optional debounceMs
 * OUTPUT: { searchValue, onSearchChange } for controlled search input
 * BEHAVIOR: Debounces input 500ms, resets page to 1 when search changes
 * GENERIC: T extends ListParams - works with any list pagination params
 * USED BY: List pages (workflows, integrations) as bridge to tRPC queries
 * PURE: No (reads/writes params, useState)
 */

import { useEffect, useRef, useState } from "react";
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

  // Extract primitive value to narrow effect dependencies (Rule 5.3)
  // This prevents effect re-runs when other params fields change
  const paramsSearch = params.search;

  // Store latest params/setParams in refs to avoid stale closures (Rule 8.2)
  // This allows the effect to access current values without re-subscribing
  const paramsRef = useRef(params);
  const setParamsRef = useRef(setParams);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  useEffect(() => {
    setParamsRef.current = setParams;
  }, [setParams]);

  useEffect(() => {
    if (localSearch === "" && paramsSearch !== "") {
      setParamsRef.current({
        ...paramsRef.current,
        search: "",
        page: PAGINATION.DEFAULT_PAGE,
      });
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== paramsSearch) {
        setParamsRef.current({
          ...paramsRef.current,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [localSearch, paramsSearch, debounceMs]);

  useEffect(() => {
    setLocalSearch(paramsSearch);
  }, [paramsSearch]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
};
