import { createLoader } from "nuqs/server";
import { workflowsParams } from "../params";

/**
 * Server-side loader for parsing workflow URL search parameters.
 *
 * Created using nuqs `createLoader`, this function parses the raw `searchParams`
 * promise from Next.js App Router pages into typed, validated parameter objects.
 * It applies the same parsing rules and defaults defined in `workflowsParams`.
 *
 * This enables type-safe access to search params in async Server Components
 * without needing client-side hooks.
 */
export const workflowsParamsLoader = createLoader(workflowsParams);
