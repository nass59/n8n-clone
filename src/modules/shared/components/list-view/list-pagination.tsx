import { Button } from "@/components/ui/button";

export type ListPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

/**
 * PURPOSE: Page navigation for list views
 * DISPLAY: Current page indicator + Previous/Next buttons
 * BOUNDARY HANDLING: Disables buttons on first/last page, clamps page numbers
 * ACCESSIBILITY: aria-labels on buttons + nav landmark
 * USED BY: All paginated list pages
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
