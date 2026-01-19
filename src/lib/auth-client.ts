import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/react";

/**
 * The Better Auth client instance configured with Polar subscription support.
 *
 * Use the destructured exports (`signIn`, `signUp`, etc.) for most use cases.
 * Access the full client for advanced operations like social OAuth providers.
 */
export const authClient = createAuthClient({
  plugins: [polarClient()],
});
