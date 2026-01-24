import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ListItemsProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: ReactNode;
  className?: string;
};

/**
 * PURPOSE: Generic list container with render prop pattern
 * RENDER PROPS: renderItem - called for each item; getKey - optional custom key fn
 * FALLBACK: Shows emptyView when items.length === 0
 * USED BY: Workflows, integrations, and other entity list pages
 */
export const ListItems = <T,>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: ListItemsProps<T>) => {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-sm">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};
