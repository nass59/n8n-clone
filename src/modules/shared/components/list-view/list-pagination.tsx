import { Button } from "@/components/ui/button";

export type ListPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

/**
 * A pagination control component for navigating through paginated lists.
 *
 * Displays the current page position ("Page X of Y") and Previous/Next buttons.
 * Automatically handles boundary conditions (disabling buttons on first/last page)
 * and ensures page numbers stay within valid bounds.
 */
export const ListPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: ListPaginationProps) => {
  const effectiveTotalPages = Math.max(1, totalPages);
  const isFirstPage = page === 1;
  const isLastPage = page >= effectiveTotalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex w-full items-center justify-between gap-x-2"
    >
      <p className="flex-1 text-muted-foreground text-sm">
        Page {page} of {effectiveTotalPages}
      </p>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          aria-label="Go to previous page"
          disabled={isFirstPage || disabled}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          size="sm"
          variant="outline"
        >
          Previous
        </Button>
        <Button
          aria-label="Go to next page"
          disabled={isLastPage || disabled}
          onClick={() => onPageChange(Math.min(effectiveTotalPages, page + 1))}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </nav>
  );
};
