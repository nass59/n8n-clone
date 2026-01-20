import { IconLoader2 } from "@tabler/icons-react";
import type { StateViewProps } from "@/modules/shared/types/list-view.types";

export const ListLoading = ({ message }: StateViewProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-4">
      <IconLoader2 className="size-6 animate-spin text-primary" />
      {!!message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
};
