/**
 * PURPOSE: Zod validation schemas for auth forms
 * PURE: Yes (schema definitions only)
 * USED BY: login-form.tsx, register-form.tsx
 * DEPENDS: PASSWORD_REQUIREMENTS constant
 */

import z from "zod";
import { PASSWORD_REQUIREMENTS } from "./auth-constants";

const emailSchema = z
  .email("Invalid email address")
  .min(1, "Email is required");

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
 * Login validation schema.
 * Checks non-empty email and password (no strength enforcement).
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Registration validation schema.
 * Enforces strong passwords + confirmation matching.
 * Uses .refine() to validate password === confirmPassword.
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
