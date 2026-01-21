/**
 * Server-side authentication utilities for auth guards and session retrieval.
 * Use in Server Components, Server Actions, and loaders.
 * Always use requireAuth() or requireUnauth() for route protection.
 */

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type Session } from "@/lib/auth";
import { AUTH_ROUTES } from "@/modules/auth/lib/auth-constants";

type AuthRedirectOptions = {
  redirectTo?: string;
};

/**
 * PURPOSE: Get current session without enforcing authentication
 * PURE: No (reads headers)
 * USED BY: Conditional rendering, optional auth scenarios
 * RETURNS: Session | null
 */
export const getSession = async (): Promise<Session | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

/**
 * PURPOSE: Guard that requires authenticated session, redirects if missing
 * PURE: No (redirect on fail)
 * USED BY: Protected Server Components and loaders
 * RETURNS: Session (never null; redirects on auth failure)
 */
export const requireAuth = async (
  options: AuthRedirectOptions = {}
): Promise<Session> => {
  const session = await getSession();
  const { redirectTo = AUTH_ROUTES.LOGIN } = options;

  if (!session) {
    redirect(redirectTo);
  }

  return session;
};

/**
 * PURPOSE: Guard that requires unauthenticated session, redirects if authenticated
 * PURE: No (redirect on fail)
 * USED BY: Public pages (login, signup) that reject authenticated users
 * RETURNS: void (redirects to dashboard if session exists)
 */
export const requireUnauth = async (
  options: AuthRedirectOptions = {}
): Promise<void> => {
  const { redirectTo = AUTH_ROUTES.DASHBOARD } = options;

  const session = await getSession();

  if (session) {
    redirect(redirectTo);
  }
};
