/**
 * Single source of truth for all application routes.
 * Use instead of hardcoding paths to enable safe refactoring.
 * Covers core, auth, and workflow automation routes.
 */

/**
 * PURPOSE: Constant map of all valid application route paths
 * PURE: Yes
 * USED BY: Navigation, redirects, link generation throughout the app
 * PATTERN: as const for type inference
 */
export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  WORKFLOWS: "/workflows",
  CREDENTIALS: "/credentials",
  EXECUTIONS: "/executions",
} as const;

/**
 * PURPOSE: Type representing all valid route paths
 * PURE: Yes
 * USED BY: Functions that accept route parameters for type-safe routing
 */
export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
