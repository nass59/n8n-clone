import { IconAlertTriangle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import type { ErrorViewProps } from "@/modules/shared/types/list-view.types";

/**
 * PURPOSE: Error state placeholder for list views
 * DISPLAY: Warning icon + error message + optional retry button
 * USED BY: List pages when data fetch fails (paired with tRPC error)
 */
export const ListError = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
      <IconAlertTriangle className="size-6 text-primary" />
      {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
      {!!onRetry && (
        <Button onClick={onRetry} size="sm" variant="outline">
          Try again
        </Button>
      )}
    </div>
  );
};
