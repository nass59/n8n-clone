/**
 * PURPOSE: Domain-specific wrapper for workflow list item
 * RENDERS: ListItem with workflow icon, timestamps, and delete action
 * COMPOSITION: Wraps ListItem with useRemoveWorkflow hook
 * USED BY: WorkflowsList via renderItem prop
 */

import { IconTopologyRing } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import type { Workflow } from "@/generated/prisma/client";
import { ListItem } from "@/modules/shared/components/list-view/list-item";
import { useRemoveWorkflow } from "../../hooks/use-workflows";

type Props = {
  data: Workflow;
};

export const WorkflowItem = ({ data }: Props) => {
  const removeWorkflow = useRemoveWorkflow();

  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id });
  };

  return (
    <ListItem
      href={`/workflows/${data.id}`}
      image={
        <div className="flex size-8 items-center justify-center">
          <IconTopologyRing className="size-5 text-muted-foreground" />
        </div>
      }
      isRemoving={removeWorkflow.isPending}
      onRemove={handleRemove}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      title={data.name}
    />
  );
};
