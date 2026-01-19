import type { ReactNode } from "react";
import { AuthLayout } from "@/modules/auth/components/auth-layout";

type AuthLayoutProps = {
  children: ReactNode;
};

/**
 * Layout wrapper for the (auth) route group.
 *
 * This layout applies to all authentication-related pages (login, signup)
 * using Next.js App Router's route group convention. The parentheses in
 * `(auth)` create a logical grouping without affecting the URL structure.
 */
export default function Layout({ children }: AuthLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
