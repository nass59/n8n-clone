import { TRPCError } from "@trpc/server";
import prisma from "@/lib/db";
import type {
  DeleteWorkflowInput,
  GetWorkflowInput,
  UpdateWorkflowNameInput,
  WorkflowsPaginationInput,
} from "./schemas";

/**
 * Optimized field selection for workflow queries.
 * Explicitly select fields to reduce payload size and prevent over-fetching.
 */
const workflowSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
} as const;

/**
 * Creates a workflow for a user.
 *
 * @param userId - The ID of the user creating the workflow
 * @param name - The generated workflow name
 * @returns The created workflow
 */
export const createWorkflow = (userId: string, name: string) => {
  return prisma.workflow.create({
    data: {
      name,
      userId,
    },
    select: workflowSelect,
  });
};

/**
 * Fetches a single workflow by ID with ownership verification.
 *
 * @param input - Workflow ID to fetch
 * @param userId - ID of the requesting user
 * @returns The workflow if found and owned by user
 * @throws {TRPCError} NOT_FOUND if workflow doesn't exist or user doesn't own it
 */
export const getWorkflow = async (input: GetWorkflowInput, userId: string) => {
  const workflow = await prisma.workflow.findFirst({
    where: {
      id: input.id,
      userId,
    },
    select: workflowSelect,
  });

  if (!workflow) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Workflow not found",
    });
  }

  return workflow;
};

/**
 * Fetches paginated workflows for a user with optional search.
 *
 * @param input - Pagination and search parameters
 * @param userId - ID of the requesting user
 * @returns Paginated workflow results with metadata
 */
export const getWorkflows = async (
  input: WorkflowsPaginationInput,
  userId: string
) => {
  const { page, pageSize, search } = input;

  const where = {
    userId,
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),
  };

  const [items, totalCount] = await Promise.all([
    prisma.workflow.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      select: workflowSelect,
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.workflow.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    items,
    page,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

/**
 * Updates a workflow's name with ownership verification.
 *
 * @param input - Workflow ID and new name
 * @param userId - ID of the requesting user
 * @returns The updated workflow
 * @throws {TRPCError} NOT_FOUND if workflow doesn't exist or user doesn't own it
 */
export const updateWorkflowName = async (
  input: UpdateWorkflowNameInput,
  userId: string
) => {
  // Verify ownership first - throws NOT_FOUND if unauthorized
  await getWorkflow({ id: input.id }, userId);

  return prisma.workflow.update({
    where: { id: input.id },
    data: { name: input.name },
    select: workflowSelect,
  });
};

/**
 * Deletes a workflow with ownership verification.
 *
 * @param input - Workflow ID to delete
 * @param userId - ID of the requesting user
 * @returns The deleted workflow
 * @throws {TRPCError} NOT_FOUND if workflow doesn't exist or user doesn't own it
 */
export const deleteWorkflow = async (
  input: DeleteWorkflowInput,
  userId: string
) => {
  // Verify ownership first - throws NOT_FOUND if unauthorized
  await getWorkflow({ id: input.id }, userId);

  return prisma.workflow.delete({
    where: { id: input.id },
    select: workflowSelect,
  });
};
