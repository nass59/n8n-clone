"use client";

import type { PropsWithChildren } from "react";
import { ListContainer } from "@/modules/shared/components/list-view/list-container";
import { WorkflowsHeader } from "./workflows-header";
import { WorkflowsPagination } from "./workflows-pagination";
import { WorkflowSearch } from "./workflows-search";

/**
 * PURPOSE: Layout wrapper for workflows list page
 * RENDERS: ListContainer with header, search, pagination sections
 * USED BY: app/workflows/page.tsx
 * CHILDREN: WorkflowsList component
 */
export const WorkflowsContainer = ({ children }: PropsWithChildren) => {
  return (
    <ListContainer
      header={<WorkflowsHeader />}
      pagination={<WorkflowsPagination />}
      search={<WorkflowSearch />}
    >
      {children}
    </ListContainer>
  );
};
