/**
 * PURPOSE: Reusable list item card component with delete action
 * RENDERS: Clickable card with image, title, subtitle, and dropdown menu
 * PATTERN: Accepts href for navigation, optional delete handler
 * STATES: isRemoving prevents interaction while deletion in flight
 * USED BY: WorkflowItem, other domain-specific list items
 */

import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { type MouseEvent, type ReactNode, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ListItemProps = {
  href: string;
  title: string;
  subtitle?: ReactNode;
  image?: ReactNode;
  actions?: ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
};

export const ListItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: ListItemProps) => {
  // Memoize handlers to prevent unnecessary re-renders (Rule 5.5)
  const handleClickOnDropdown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleRemove = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isRemoving) {
        return;
      }

      if (onRemove) {
        await onRemove();
      }
    },
    [isRemoving, onRemove]
  );

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "cursor-pointer p-4 shadow-none hover:shadow",
          isRemoving && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}
            <div>
              <CardTitle className="font-medium text-base">{title}</CardTitle>
              {subtitle !== null && (
                <CardDescription className="text-xs">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    onClick={handleClickOnDropdown}
                    size="icon"
                    variant="ghost"
                  />
                }
              >
                <IconDotsVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={handleClickOnDropdown}>
                <DropdownMenuItem onClick={handleRemove}>
                  <IconTrash className="size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
