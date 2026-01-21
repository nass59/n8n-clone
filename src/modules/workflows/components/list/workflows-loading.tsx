import { ListLoading } from "@/modules/shared/components/list-view/list-loading";

/**
 * PURPOSE: Loading state fallback for workflows list
 * RENDERS: ListLoading skeleton with message
 * USED BY: Suspense boundary fallback in page layout
 */
export const WorkflowsLoading = () => {
  return <ListLoading message="Loading workflows..." />;
};
