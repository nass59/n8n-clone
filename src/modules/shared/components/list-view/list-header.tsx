import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Uses a discriminated union to ensure type-safe action handling:
 * - Provide `onAction` for click handler actions (e.g., opening a modal)
 * - Provide `actionHref` for navigation actions (renders as a link)
 * - Omit both for a header without an action button
 */
type ListHeaderProps = {
  title: string;
  description?: string;
  actionLabel: string;
  actionDisabled?: boolean;
  actionLoading?: boolean;
} & (
  | { onAction: () => void; actionHref?: never }
  | { onAction?: never; actionHref: string }
  | { onAction?: never; actionHref?: never }
);

/**
 * PURPOSE: Page header with title, description, and action button
 * ACTION MODES: navigationHref (Link) | onAction (click handler) | none
 * TYPE SAFETY: Discriminated union prevents invalid prop combinations
 * USED BY: All list pages - renders above search/items
 */
export const ListHeader = (props: ListHeaderProps) => {
  const { title, description } = props;
  const hasAction = props.actionLabel;

  return (
    <header className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-xs md:text-sm">
            {description}
          </p>
        )}
      </div>
      {hasAction && (
        <ListHeaderAction
          disabled={props.actionDisabled}
          href={props.actionHref}
          label={props.actionLabel}
          loading={props.actionLoading}
          onClick={props.onAction}
        />
      )}
    </header>
  );
};

type ListHeaderActionProps = {
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
};

/**
 * PURPOSE: Internal action button - renders as Link or Button
 * BEHAVIOR: Link renders with prefetch for optimal navigation
 * INTERNAL: Private component, only used by ListHeader
 */
const ListHeaderAction = ({
  label,
  onClick,
  href,
  disabled,
  loading,
}: ListHeaderActionProps) => {
  if (href) {
    return (
      <Button render={<Link href={href} prefetch />} size="sm">
        <IconPlus className="size-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button disabled={loading || disabled} onClick={onClick} size="sm">
      <IconPlus className="size-4" />
      {label}
    </Button>
  );
};
