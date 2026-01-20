"use client";

import type { PropsWithChildren } from "react";
import { ListContainer } from "@/modules/shared/components/list-view/list-container";
import { WorkflowsHeader } from "./workflows-header";
import { WorkflowsPagination } from "./workflows-pagination";
import { WorkflowSearch } from "./workflows-search";

/**
 * Container component for the workflows list page.
 *
 * Composes the workflows list layout by combining the header, search,
 * pagination, and content areas into a unified page structure using
 * the generic `ListContainer` component.
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
