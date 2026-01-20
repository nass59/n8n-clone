import { parseAsInteger, parseAsString } from "nuqs/server";
import { PAGINATION } from "@/config/constants";

/**
 * Type-safe URL search parameter definitions for the workflows module.
 *
 * This object defines how URL search params are parsed, serialized, and validated
 * using nuqs parsers. It serves as the single source of truth for workflow
 * list parameters, shared between:
 * - Server components via `createLoader` (see `server/params-loader.ts`)
 * - Client components via `useQueryStates` hook
 *
 * Each parser uses `withOptions({ clearOnDefault: true })` to keep URLs clean
 * by removing params when they match their default values.
 *
 * @example Server-side usage with createLoader
 * ```ts
 * const loader = createLoader(workflowsParams);
 * const params = await loader(searchParams);
 * // params.page, params.pageSize, params.search are typed
 * ```
 *
 * @example Client-side usage with useQueryStates
 * ```ts
 * const [params, setParams] = useQueryStates(workflowsParams);
 * setParams({ page: 2 }); // Updates URL to ?page=2
 * setParams({ page: 1 }); // Clears ?page from URL (clearOnDefault)
 * ```
 */
export const workflowsParams = {
  /** Current page number for pagination. Defaults to first page, cleared from URL when default. */
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),

  /** Number of workflows per page. Defaults to standard page size, cleared from URL when default. */
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),

  /** Search query to filter workflows by name. Defaults to empty string, cleared from URL when empty. */
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};
