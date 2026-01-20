"use client";

import type { PropsWithChildren } from "react";
import { EntityContainer } from "@/components/entity-components";
import { WorkflowsHeader } from "./workflows-header";
import { WorkflowsPagination } from "./workflows-pagination";
import { WorkflowSearch } from "./workflows-search";

/**
 * Container component for the workflows list page.
 *
 * Composes the workflows list layout by combining the header, search,
 * pagination, and content areas into a unified page structure using
 * the generic `EntityContainer` component.
 */
export const WorkflowsContainer = ({ children }: PropsWithChildren) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      pagination={<WorkflowsPagination />}
      search={<WorkflowSearch />}
    >
      {children}
    </EntityContainer>
  );
};
