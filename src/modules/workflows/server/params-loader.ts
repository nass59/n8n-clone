import { createLoader } from "nuqs/server";
import { workflowsParams } from "../params";

/**
 * PURPOSE: Server-side search params parser for workflows list
 * USED BY: Server components (app/workflows/page.tsx)
 * EXPORTS: workflowsParamsLoader - async function to parse searchParams promise
 * DEPENDS: nuqs/server, ../params
 */
export const workflowsParamsLoader = createLoader(workflowsParams);
