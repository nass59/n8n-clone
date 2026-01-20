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
 * A header component for list pages displaying a title, optional description,
 * and a primary action button.
 *
 * The action button supports two modes:
 * - **Navigation mode**: Pass `actionHref` to render as a prefetched Next.js link
 * - **Click handler mode**: Pass `onAction` to handle clicks (e.g., open a modal)
 *
 * The component uses a discriminated union type to ensure only one action mode
 * is specified at a time, providing type safety and preventing invalid prop combinations.
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
 * Internal action button component that renders either as a link or button.
 *
 * When `href` is provided, renders as a prefetched Next.js Link for optimal
 * navigation performance. Otherwise, renders as a standard button with
 * click handler support.
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
