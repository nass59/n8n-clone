import type { Metadata } from "next";
import { requireUnauth } from "@/lib/auth-utils";
import { RegisterForm } from "@/modules/auth/components/register-form";

/**
 * Page metadata for SEO and browser tab display.
 */
export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Nodebase account and start automating your workflows.",
};

/**
 * Signup page for new user registration.
 *
 * **Server Component Benefits**:
 * - Session check happens server-side before hydration
 * - Redirect is instant with no client-side flash
 * - Metadata is statically extractable for SEO
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
