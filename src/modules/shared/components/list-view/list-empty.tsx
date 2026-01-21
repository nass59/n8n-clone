import { IconPackage } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { StateViewProps } from "../../types/list-view.types";

type ListEmpty = StateViewProps & {
  onNew?: () => void;
};

/**
 * PURPOSE: Empty state placeholder for list views
 * DISPLAY: Package icon + "No items" title + optional message + action button
 * ACTION: onNew callback for creating first item (e.g., new workflow)
 * USED BY: List pages when data array is empty (paired with ListItems)
 */
export const ListEmpty = ({ message, onNew }: ListEmpty) => {
  return (
    <Empty className="border border-dashed bg-stone-800">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconPackage />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No items</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Add item</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};
