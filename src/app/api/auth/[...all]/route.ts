/**
 * PURPOSE: Catch-all handler for all Better Auth endpoints
 * HANDLES: GET (session, OAuth callbacks, redirects) + POST (sign-in, sign-up, sign-out)
 * PURE: No (DB writes, session management, external redirects)
 */
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

export const { GET, POST } = toNextJsHandler(auth);
