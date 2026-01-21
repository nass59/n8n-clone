import z from "zod";
import { PAGINATION } from "@/config/constants";

/**
 * PURPOSE: Zod validation schemas for workflow operations
 * EXPORTS: workflowIdSchema, workflowNameSchema, workflowsPaginationSchema, getWorkflowSchema, updateWorkflowNameSchema, deleteWorkflowSchema, type exports
 * USED BY: routers.ts (input validation), service.ts (type inference)
 */

export const workflowIdSchema = z.string().min(1, "Workflow ID is required");

export const workflowNameSchema = z
  .string()
  .min(1, "Workflow name is required")
  .max(255, "Workflow name must be less than 255 characters");

export const workflowsPaginationSchema = z.object({
  page: z.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),
  pageSize: z
    .number()
    .int()
    .min(PAGINATION.MIN_PAGE_SIZE)
    .max(PAGINATION.MAX_PAGE_SIZE)
    .default(PAGINATION.DEFAULT_PAGE_SIZE),
  search: z.string().default(""),
});

export const getWorkflowSchema = z.object({
  id: workflowIdSchema,
});

export const updateWorkflowNameSchema = z.object({
  id: workflowIdSchema,
  name: workflowNameSchema,
});

export const deleteWorkflowSchema = z.object({
  id: workflowIdSchema,
});

export type GetWorkflowInput = z.infer<typeof getWorkflowSchema>;
export type UpdateWorkflowNameInput = z.infer<typeof updateWorkflowNameSchema>;
export type DeleteWorkflowInput = z.infer<typeof deleteWorkflowSchema>;
export type WorkflowsPaginationInput = z.infer<
  typeof workflowsPaginationSchema
>;
