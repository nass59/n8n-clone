import z from "zod";
import { PASSWORD_REQUIREMENTS } from "./auth-constants";

/**
 * Email validation schema.
 * Ensures the email is non-empty and in valid format.
 */
const emailSchema = z
  .email("Invalid email address")
  .min(1, "Email is required");

/**
 * Strong password validation schema.
 *
 * Enforces password complexity requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one number (0-9)
 */
const passwordSchema = z
  .string()
  .min(
    PASSWORD_REQUIREMENTS.MIN_LENGTH,
    PASSWORD_REQUIREMENTS.MESSAGES.MIN_LENGTH
  )
  .regex(/[A-Z]/, PASSWORD_REQUIREMENTS.MESSAGES.UPPERCASE)
  .regex(/[a-z]/, PASSWORD_REQUIREMENTS.MESSAGES.LOWERCASE)
  .regex(/[0-9]/, PASSWORD_REQUIREMENTS.MESSAGES.NUMBER);

/**
 * Login form validation schema.
 *
 * Validates user credentials for authentication.
 * Password strength is NOT enforced on login (only checks non-empty).
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Registration form validation schema.
 *
 * Validates new user signup with strong password requirements
 * and confirmation matching.
 *
 * @remarks
 * Uses `.refine()` to validate that password and confirmPassword match.
 * Error is attached to the confirmPassword field path.
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
