import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  // Fetch all workflows
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),

  // Trigger Inngest function to create a workflow
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: { email: "test@gmail.com" },
    });

    return { success: true, message: "Workflow creation triggered" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
