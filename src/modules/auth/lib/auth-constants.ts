/**
 * PURPOSE: Auth module constants (routes, OAuth config, password rules)
 * PURE: Yes (const definitions)
 * USED BY: login-form.tsx, register-form.tsx, oauth-buttons.tsx, auth-schemas.ts
 */

import { APP_ROUTES } from "@/lib/routes";

/**
 * Auth route mappings.
 * DASHBOARD: post-auth redirect destination
 */
export const AUTH_ROUTES = {
  LOGIN: APP_ROUTES.LOGIN,
  SIGNUP: APP_ROUTES.SIGNUP,
  FORGOT_PASSWORD: APP_ROUTES.FORGOT_PASSWORD,
  DASHBOARD: APP_ROUTES.HOME,
} as const;

/**
 * OAuth provider metadata (names, logo paths).
 * Currently: GitHub, Google
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
 * Password strength requirements for registration.
 * Min 8 chars, uppercase, lowercase, number.
 * Used by registerSchema in auth-schemas.ts
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
