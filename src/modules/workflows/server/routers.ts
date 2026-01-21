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

/**
 * PURPOSE: tRPC router for workflow operations
 * PURE: No (DB and auth context)
 * AUTH: protectedProcedure (except create uses premiumProcedure)
 * PROCEDURES: create, getMany, getOne, updateName, remove
 * DEPENDS: @/trpc/init, ./schemas, ./service
 */
export const workflowsRouter = createTRPCRouter({
  /**
   * PURPOSE: Create workflow with random name for premium users
   * PURE: No (DB write)
   * AUTH: premiumProcedure (requires active subscription)
   */
  create: premiumProcedure.mutation(({ ctx }) => {
    return createWorkflow(ctx.auth.user.id, generateSlug(3));
  }),

  /**
   * PURPOSE: Delete workflow with ownership check
   * PURE: No (DB write)
   * AUTH: protectedProcedure
   */
  remove: protectedProcedure
    .input(deleteWorkflowSchema)
    .mutation(({ ctx, input }) => {
      return deleteWorkflow(input, ctx.auth.user.id);
    }),

  /**
   * PURPOSE: Update workflow name with ownership check
   * PURE: No (DB write)
   * AUTH: protectedProcedure
   */
  updateName: protectedProcedure
    .input(updateWorkflowNameSchema)
    .mutation(({ ctx, input }) => {
      return updateWorkflowName(input, ctx.auth.user.id);
    }),

  /**
   * PURPOSE: Fetch single workflow
   * PURE: No (DB read)
   * AUTH: protectedProcedure
   * THROWS: NOT_FOUND if not found or unauthorized
   */
  getOne: protectedProcedure
    .input(getWorkflowSchema)
    .query(({ ctx, input }) => {
      return getWorkflow(input, ctx.auth.user.id);
    }),

  /**
   * PURPOSE: Fetch paginated workflows with search
   * PURE: No (DB read)
   * AUTH: protectedProcedure
   */
  getMany: protectedProcedure
    .input(workflowsPaginationSchema)
    .query(({ ctx, input }) => {
      return getWorkflows(input, ctx.auth.user.id);
    }),
});
