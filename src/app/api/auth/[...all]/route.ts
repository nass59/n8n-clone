/**
 * @fileoverview Better Auth catch-all API route handler for Nodebase.
 *
 * This Next.js App Router catch-all route (`/api/auth/[...all]`) handles all
 * authentication endpoints provided by Better Auth. The `toNextJsHandler` adapter
 * converts the Better Auth instance into Next.js-compatible GET and POST handlers.
 *
 * @remarks
 * Better Auth uses a path-based routing convention where all auth endpoints
 * are prefixed with `/api/auth/`. This catch-all route captures all sub-paths
 * and delegates them to the appropriate Better Auth handler.
 *
 * ## Core Authentication Endpoints
 *
 * | Method | Endpoint                      | Description                              |
 * |--------|-------------------------------|------------------------------------------|
 * | POST   | `/api/auth/sign-up/email`     | Register with email and password         |
 * | POST   | `/api/auth/sign-in/email`     | Authenticate with email and password     |
 * | POST   | `/api/auth/sign-out`          | End the current session                  |
 * | GET    | `/api/auth/session`           | Retrieve the current session             |
 *
 * ## Polar Integration Endpoints (Subscription Management)
 *
 * | Method | Endpoint                      | Description                              |
 * |--------|-------------------------------|------------------------------------------|
 * | GET    | `/api/auth/checkout/pro`      | Redirect to Polar checkout for Pro plan  |
 * | GET    | `/api/auth/portal`            | Redirect to Polar customer portal        |
 */

import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

/**
 * HTTP GET and POST handlers for all Better Auth endpoints.
 *
 * GET handles session retrieval, OAuth callbacks, and checkout/portal redirects.
 * POST handles sign-in, sign-up, sign-out, and other mutation operations.
 */
export const { GET, POST } = toNextJsHandler(auth);
