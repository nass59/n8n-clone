import { ListError } from "@/modules/shared/components/list-view/list-error";

/**
 * PURPOSE: Error state fallback for workflows list
 * RENDERS: ListError message
 * USED BY: Suspense error boundary fallback in page layout
 */
export const WorkflowsError = () => {
  return <ListError message="Error loading workflows..." />;
};
