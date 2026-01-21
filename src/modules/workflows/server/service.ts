import { TRPCError } from "@trpc/server";
import prisma from "@/lib/db";
import type {
  DeleteWorkflowInput,
  GetWorkflowInput,
  UpdateWorkflowNameInput,
  WorkflowsPaginationInput,
} from "./schemas";

/**
 * PURPOSE: Business logic for workflow CRUD and pagination
 * PURE: No (DB read/write)
 * EXPORTS: createWorkflow, getWorkflow, getWorkflows, updateWorkflowName, deleteWorkflow
 * USED BY: routers.ts (tRPC procedures)
 * PATTERN: All mutations verify userId ownership before modifying
 */

const workflowSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
} as const;

/**
 * PURPOSE: Create workflow for user
 * PURE: No (DB)
 * USED BY: routers.ts create procedure
 */
export const createWorkflow = (userId: string, name: string) => {
  return prisma.workflow.create({
    data: { name, userId },
    select: workflowSelect,
  });
};

/**
 * PURPOSE: Fetch single workflow with ownership check
 * PURE: No (DB)
 * THROWS: NOT_FOUND if id doesn't exist or userId mismatch
 * USED BY: getWorkflows, updateWorkflowName, deleteWorkflow (ownership gate)
 */
export const getWorkflow = async (input: GetWorkflowInput, userId: string) => {
  const workflow = await prisma.workflow.findFirst({
    where: { id: input.id, userId },
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
 * PURPOSE: Fetch paginated workflows with optional search filter
 * PURE: No (DB)
 * INPUT: page, pageSize (validated in schemas), search (case-insensitive name match)
 * OUTPUT: items array, pagination metadata (page, totalCount, totalPages, hasNextPage, hasPreviousPage)
 * USED BY: routers.ts getMany procedure
 */
export const getWorkflows = async (
  input: WorkflowsPaginationInput,
  userId: string
) => {
  const { page, pageSize, search } = input;

  const where = {
    userId,
    ...(search && {
      name: { contains: search, mode: "insensitive" as const },
    }),
  };

  const [items, totalCount] = await Promise.all([
    prisma.workflow.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      select: workflowSelect,
      orderBy: { updatedAt: "desc" },
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
 * PURPOSE: Update workflow name with ownership verification
 * PURE: No (DB)
 * THROWS: NOT_FOUND if workflow doesn't exist or user doesn't own it
 * USED BY: routers.ts updateName procedure
 */
export const updateWorkflowName = async (
  input: UpdateWorkflowNameInput,
  userId: string
) => {
  await getWorkflow({ id: input.id }, userId);

  return prisma.workflow.update({
    where: { id: input.id },
    data: { name: input.name },
    select: workflowSelect,
  });
};

/**
 * PURPOSE: Delete workflow with ownership verification
 * PURE: No (DB)
 * THROWS: NOT_FOUND if workflow doesn't exist or user doesn't own it
 * USED BY: routers.ts remove procedure
 */
export const deleteWorkflow = async (
  input: DeleteWorkflowInput,
  userId: string
) => {
  await getWorkflow({ id: input.id }, userId);

  return prisma.workflow.delete({
    where: { id: input.id },
    select: workflowSelect,
  });
};
