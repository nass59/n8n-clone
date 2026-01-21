/**
 * PURPOSE: Type definitions for auth module
 * PURE: Yes (type-only)
 */

/**
 * OAuth provider identifier.
 * Supported providers: GitHub, Google
 */
export type OAuthProvider = "github" | "google";

/**
 * Auth form type discriminator.
 * Used by UI components to differentiate login vs registration
 */
export type AuthFormType = "login" | "register";

/**
 * Login form data structure.
 * Validated by loginSchema
 */
export type LoginFormValues = {
  email: string;
  password: string;
};

/**
 * Registration form data structure.
 * Validated by registerSchema
 * Password must pass strength requirements (8+ chars, uppercase, lowercase, number)
 */
export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};
