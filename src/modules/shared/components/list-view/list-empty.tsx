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
