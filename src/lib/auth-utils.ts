/**
 * @fileoverview Server-side authentication utilities for Next.js App Router.
 *
 * Provides helper functions for authentication guards in Server Components
 * and Server Actions. These utilities handle session retrieval and redirect
 * logic for protected and public-only routes.
 */

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type Session } from "@/lib/auth";

type AuthRedirectOptions = {
  /** The URL to redirect to. Defaults vary by function. */
  redirectTo?: string;
};

/**
 * Retrieves the current session without redirecting.
 *
 * Use this when you need to check authentication status without enforcing it,
 * such as conditionally rendering UI based on auth state or for optional
 * authentication scenarios.
 */
export const getSession = async (): Promise<Session | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

/**
 * Requires an authenticated session, redirecting to login if not found.
 *
 * Use this in Server Components or Server Actions that require authentication.
 * The function will redirect to the login page if no valid session exists,
 * so the return value is guaranteed to be a valid session.
 *
 * @returns The authenticated session (never `null` due to redirect).
 */
export const requireAuth = async (
  options: AuthRedirectOptions = {}
): Promise<Session> => {
  const { redirectTo = "/login" } = options;

  const session = await getSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
};

/**
 * Requires no authenticated session, redirecting away if one exists.
 *
 * Use this for pages that should only be accessible to unauthenticated users,
 * such as login, registration, or password reset pages.
 */
export const requireUnauth = async (
  options: AuthRedirectOptions = {}
): Promise<void> => {
  const { redirectTo = "/" } = options;

  const session = await getSession();

  if (session) {
    redirect(redirectTo);
  }
};
