/**
 * PURPOSE: Global pagination constants for list views
 * DEFAULT_PAGE: Starting page for paginated queries
 * DEFAULT_PAGE_SIZE: Items per page for list views (grid layout, 8 items)
 * MAX_PAGE_SIZE: Server-side limit to prevent abuse
 * USED BY: Workflows, integrations, and other paginated list endpoints
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 8,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
};
