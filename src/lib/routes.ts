/**
 * Centralized application route paths.
 *
 * This is the single source of truth for all URL paths used across the application.
 * Always import from here instead of hardcoding paths to ensure consistency
 * and enable easy refactoring.
 */
export const APP_ROUTES = {
  // Core application routes
  HOME: "/",

  // Authentication routes
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",

  // Workflow automation routes
  WORKFLOWS: "/workflows",
  CREDENTIALS: "/credentials",
  EXECUTIONS: "/executions",
} as const;

/**
 * Union type of all valid application route paths.
 *
 * Use this type for type-safe route handling in functions that accept
 * route parameters.
 */
export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
