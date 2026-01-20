import { generateSlug } from "random-word-slugs";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import {
  deleteWorkflowSchema,
  getWorkflowSchema,
  updateWorkflowNameSchema,
  workflowsPaginationSchema,
} from "./schemas";
import {
  createWorkflow,
  deleteWorkflow,
  getWorkflow,
  getWorkflows,
  updateWorkflowName,
} from "./service";

export const workflowsRouter = createTRPCRouter({
  /**
   * Creates a new workflow with a randomly generated name.
   * Requires active premium subscription.
   */
  create: premiumProcedure.mutation(({ ctx }) => {
    return createWorkflow(ctx.auth.user.id, generateSlug(3));
  }),

  /**
   * Deletes a workflow by ID.
   * Verifies ownership before deletion.
   */
  remove: protectedProcedure
    .input(deleteWorkflowSchema)
    .mutation(({ ctx, input }) => {
      return deleteWorkflow(input, ctx.auth.user.id);
    }),

  /**
   * Updates a workflow's name.
   * Verifies ownership before update.
   */
  updateName: protectedProcedure
    .input(updateWorkflowNameSchema)
    .mutation(({ ctx, input }) => {
      return updateWorkflowName(input, ctx.auth.user.id);
    }),

  /**
   * Fetches a single workflow by ID.
   * Throws NOT_FOUND if workflow doesn't exist or user doesn't own it.
   */
  getOne: protectedProcedure
    .input(getWorkflowSchema)
    .query(({ ctx, input }) => {
      return getWorkflow(input, ctx.auth.user.id);
    }),

  /**
   * Fetches paginated workflows with optional search.
   * Returns only workflows owned by the requesting user.
   */
  getMany: protectedProcedure
    .input(workflowsPaginationSchema)
    .query(({ ctx, input }) => {
      return getWorkflows(input, ctx.auth.user.id);
    }),
});
