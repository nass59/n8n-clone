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
 *
 * @remarks
 * The layout delegates rendering to the {@link AuthLayout} component from
 * the auth module, which provides consistent styling and branding (logo,
 * centered card layout) across all authentication pages.
 *
 * @example
 * ```
 * // URL structure (parentheses don't appear in URLs):
 * // /login  -> renders login/page.tsx within this layout
 * // /signup -> renders signup/page.tsx within this layout
 * ```
 *
 * @see {@link AuthLayout} for the underlying layout component implementation
 */
export default function Layout({ children }: AuthLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
