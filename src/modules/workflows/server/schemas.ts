import z from "zod";
import { PAGINATION } from "@/config/constants";

/**
 * Workflow ID validation schema.
 * Ensures the ID is a non-empty string (CUID format from Prisma).
 */
export const workflowIdSchema = z.string().min(1, "Workflow ID is required");

/**
 * Workflow name validation schema.
 * Ensures names are non-empty and within reasonable length limits.
 */
export const workflowNameSchema = z
  .string()
  .min(1, "Workflow name is required")
  .max(255, "Workflow name must be less than 255 characters");

/**
 * Pagination schema for workflow queries.
 * Validates page number, page size, and optional search query.
 */
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

/**
 * Schema for fetching a single workflow by ID.
 */
export const getWorkflowSchema = z.object({
  id: workflowIdSchema,
});

/**
 * Schema for updating a workflow's name.
 */
export const updateWorkflowNameSchema = z.object({
  id: workflowIdSchema,
  name: workflowNameSchema,
});

/**
 * Schema for deleting a workflow.
 */
export const deleteWorkflowSchema = z.object({
  id: workflowIdSchema,
});

// Type exports for use in services and components
export type GetWorkflowInput = z.infer<typeof getWorkflowSchema>;
export type UpdateWorkflowNameInput = z.infer<typeof updateWorkflowNameSchema>;
export type DeleteWorkflowInput = z.infer<typeof deleteWorkflowSchema>;
export type WorkflowsPaginationInput = z.infer<
  typeof workflowsPaginationSchema
>;
