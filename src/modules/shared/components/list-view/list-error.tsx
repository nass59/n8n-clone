import { IconAlertTriangle } from "@tabler/icons-react";
import type { StateViewProps } from "@/modules/shared/types/list-view.types";

/**
 * PURPOSE: Error state placeholder for list views
 * DISPLAY: Warning icon + error message
 * USED BY: List pages when data fetch fails (paired with tRPC error)
 */
export const ListError = ({ message }: StateViewProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
      <IconAlertTriangle className="size-6 text-primary" />
      {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
};
