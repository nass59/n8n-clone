import type { Metadata } from "next";
import { requireUnauth } from "@/lib/auth-utils";
import { LoginForm } from "@/modules/auth/components/login-form";

/**
 * Page metadata for SEO and browser tab display.
 */
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Nodebase account to manage your workflows.",
};

/**
 * Login page for unauthenticated users.
 *
 * @remarks
 * **Auth Guard Pattern**: The `requireUnauth()` call at the top of the
 * component acts as a route guard. This pattern ensures:
 * - Authenticated users cannot access login/signup pages
 * - The redirect happens server-side before any UI renders
 * - No flash of login form for authenticated users
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
