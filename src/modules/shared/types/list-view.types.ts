/**
 * PURPOSE: Base pagination params contract for all list views
 * USAGE: Extend this type when creating entity-specific list params (e.g., WorkflowListParams)
 * USED BY: All list views and tRPC list procedures
 */
export type ListParams = {
  search: string;
  page: number;
  pageSize: number;
};

/**
 * PURPOSE: Standard paginated response shape
 * GENERIC: T is the entity type (e.g., Workflow, Integration)
 * USED BY: tRPC list procedures to return consistent pagination
 */
export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

/**
 * PURPOSE: Props for state view components (loading, error, empty)
 * FIELDS: message - optional user-facing text describing the state
 */
export type StateViewProps = {
  message?: string;
};

/**
 * PURPOSE: Props for error state views with retry capability
 * EXTENDS: StateViewProps with optional retry callback
 * USED BY: ListError and domain-specific error components
 */
export type ErrorViewProps = StateViewProps & {
  onRetry?: () => void;
};
