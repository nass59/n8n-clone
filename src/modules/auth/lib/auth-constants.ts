import { APP_ROUTES } from "@/lib/routes";

/**
 * Auth-specific route aliases.
 * Maps generic route names to auth domain terminology.
 */
export const AUTH_ROUTES = {
  LOGIN: APP_ROUTES.LOGIN,
  SIGNUP: APP_ROUTES.SIGNUP,
  FORGOT_PASSWORD: APP_ROUTES.FORGOT_PASSWORD,
  /** Where to redirect after successful authentication */
  DASHBOARD: APP_ROUTES.HOME,
} as const;

/**
 * OAuth provider configuration.
 * Defines display names and logo paths for supported OAuth providers.
 */
export const OAUTH_PROVIDERS = {
  GITHUB: {
    name: "GitHub",
    logo: "/logos/github.svg",
  },
  GOOGLE: {
    name: "Google",
    logo: "/logos/google.svg",
  },
} as const;

/**
 * Password strength requirements and validation messages.
 * Used by the registration schema to enforce strong passwords.
 */
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MESSAGES: {
    MIN_LENGTH: "Password must be at least 8 characters",
    UPPERCASE: "Must contain at least one uppercase letter",
    LOWERCASE: "Must contain at least one lowercase letter",
    NUMBER: "Must contain at least one number",
  },
} as const;
