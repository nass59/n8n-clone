import type { Metadata } from "next";
import { requireUnauth } from "@/lib/auth-utils";
import { LoginForm } from "@/modules/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Nodebase account to manage your workflows.",
};

/**
 * PURPOSE: Login page with unauthenticated-only access
 * RENDERS: LoginForm component
 * GUARD: requireUnauth - redirects authenticated users to /
 */
export default async function Page() {
  await requireUnauth();

  return <LoginForm />;
}
