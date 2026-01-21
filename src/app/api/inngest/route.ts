/**
 * PURPOSE: Serve Inngest event queue and background job functions
 * PURE: No (processes async jobs with side effects)
 */
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { execute } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [execute],
});
