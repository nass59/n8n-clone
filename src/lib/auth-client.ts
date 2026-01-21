/**
 * Client-side authentication module for Better Auth + Polar.
 * Provides user-facing auth methods (signIn, signUp, signOut, etc.)
 * and access to full client for advanced operations (OAuth, session refresh).
 */

import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/react";

/**
 * PURPOSE: Configured Better Auth client for browser-side authentication
 * PURE: No (external API calls)
 * USED BY: React components and pages for signIn, signUp, signOut, getSession
 */
export const authClient = createAuthClient({
  plugins: [polarClient()],
});
