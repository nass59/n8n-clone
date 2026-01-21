import type { Metadata } from "next";
import { requireUnauth } from "@/lib/auth-utils";
import { RegisterForm } from "@/modules/auth/components/register-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Nodebase account and start automating your workflows.",
};

/**
 * PURPOSE: Signup page with unauthenticated-only access
 * RENDERS: RegisterForm component
 * GUARD: requireUnauth - redirects authenticated users to /
 */
export default async function Page() {
  await requireUnauth();

  return <RegisterForm />;
}
