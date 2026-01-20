/**
 * Base parameters for paginated list views.
 * Extend this type for entity-specific params.
 */
export type ListParams = {
  search: string;
  page: number;
  pageSize: number;
};

/**
 * Standard response shape for paginated data.
 */
export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};
