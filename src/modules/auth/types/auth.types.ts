/**
 * Supported OAuth providers for authentication.
 */
export type OAuthProvider = "github" | "google";

/**
 * Authentication form type discriminator.
 * Used for conditional rendering or analytics tracking.
 */
export type AuthFormType = "login" | "register";

/**
 * Login form data structure.
 * Validated by {@link loginSchema}.
 */
export type LoginFormValues = {
  email: string;
  password: string;
};

/**
 * Registration form data structure.
 * Validated by {@link registerSchema}.
 *
 * @remarks
 * Password must meet strength requirements defined in {@link PASSWORD_REQUIREMENTS}.
 */
export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};
