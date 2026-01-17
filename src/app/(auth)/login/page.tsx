import type { Metadata } from "next";
import { requireUnauth } from "@/lib/auth-utils";
import { LoginForm } from "@/modules/auth/components/login-form";

/**
 * Page metadata for SEO and browser tab display.
 *
 * @remarks
 * Next.js automatically merges this with the root layout metadata,
 * creating a title like "Login | Nodebase" if a template is defined.
 */
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Nodebase account to manage your workflows.",
};

/**
 * Login page for unauthenticated users.
 *
 * This is an async Server Component that performs an authentication check
 * before rendering. If the user is already authenticated, they are
 * redirected to the home page to prevent accessing the login form.
 *
 * @remarks
 * **Auth Guard Pattern**: The `requireUnauth()` call at the top of the
 * component acts as a route guard. This pattern ensures:
 * - Authenticated users cannot access login/signup pages
 * - The redirect happens server-side before any UI renders
 * - No flash of login form for authenticated users
 *
 * **Server Component Benefits**:
 * - Auth check runs on the server with full access to cookies/headers
 * - No client-side JavaScript needed for the redirect logic
 * - Better security as session validation happens server-side
 *
 * @throws Redirects to "/" if user has an active session
 *
 * @see {@link requireUnauth} for the authentication guard implementation
 * @see {@link LoginForm} for the form component handling user input
 *
 * @example
 * ```
 * // User flow:
 * // 1. Unauthenticated user visits /login
 * // 2. requireUnauth() passes (no redirect)
 * // 3. LoginForm renders for credential entry
 * //
 * // Authenticated user flow:
 * // 1. Authenticated user visits /login
 * // 2. requireUnauth() detects session, redirects to /
 * // 3. LoginForm never renders
 * ```
 */
export default async function Page() {
  await requireUnauth();

  return <LoginForm />;
}
