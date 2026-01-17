import type { Metadata } from "next";
import { requireUnauth } from "@/lib/auth-utils";
import { RegisterForm } from "@/modules/auth/components/register-form";

/**
 * Page metadata for SEO and browser tab display.
 *
 * @remarks
 * The description is optimized for search engines and social sharing,
 * highlighting the core value proposition of workflow automation.
 */
export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Nodebase account and start automating your workflows.",
};

/**
 * Signup page for new user registration.
 *
 * This is an async Server Component that performs an authentication check
 * before rendering. If the user is already authenticated, they are
 * redirected to the home page to prevent accessing the registration form.
 *
 * @remarks
 * **Auth Guard Pattern**: Mirrors the login page's protection mechanism
 * using `requireUnauth()`. This prevents authenticated users from:
 * - Accidentally creating duplicate accounts
 * - Seeing registration UI when already logged in
 *
 * **Server Component Benefits**:
 * - Session check happens server-side before hydration
 * - Redirect is instant with no client-side flash
 * - Metadata is statically extractable for SEO
 *
 * **Route Group Organization**: This page lives under `(auth)/signup/`
 * but renders at `/signup` due to Next.js route group conventions.
 * The parentheses create a logical grouping for shared layouts without
 * affecting the URL structure.
 *
 * @throws Redirects to "/" if user has an active session
 *
 * @see {@link requireUnauth} for the authentication guard implementation
 * @see {@link RegisterForm} for the form component handling registration
 *
 * @example
 * ```
 * // New user flow:
 * // 1. User visits /signup
 * // 2. requireUnauth() passes (no session found)
 * // 3. RegisterForm renders for account creation
 * // 4. After successful registration, user is redirected to dashboard
 * //
 * // Authenticated user flow:
 * // 1. Logged-in user visits /signup
 * // 2. requireUnauth() detects session, redirects to /
 * // 3. RegisterForm never renders
 * ```
 */
export default async function Page() {
  await requireUnauth();

  return <RegisterForm />;
}
