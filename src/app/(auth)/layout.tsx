import type { ReactNode } from "react";
import { AuthLayout } from "@/modules/auth/components/auth-layout";

type AuthLayoutProps = {
  children: ReactNode;
};

/**
 * PURPOSE: Layout for auth route group (login, signup)
 * RENDERS: AuthLayout wrapper around child pages
 */
export default function Layout({ children }: AuthLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
