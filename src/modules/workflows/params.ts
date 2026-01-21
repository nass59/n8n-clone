import { parseAsInteger, parseAsString } from "nuqs/server";
import { PAGINATION } from "@/config/constants";

/**
 * PURPOSE: Type-safe URL search parameter definitions for workflows list
 * EXPORTS: workflowsParams (nuqs parser config for page, pageSize, search)
 * USED BY: workflowsParamsLoader (server), useWorkflowsParams (client)
 * DEPENDS: nuqs/server, @/config/constants
 */
export const workflowsParams = {
  /** Current page number for pagination */
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),

  /** Number of workflows per page */
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),

  /** Search query to filter workflows by name */
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};
