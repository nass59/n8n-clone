import type { PropsWithChildren, ReactNode } from "react";

export type ListContainerProps = PropsWithChildren<{
  header: ReactNode;
  search?: ReactNode;
  pagination?: ReactNode;
}>;

/**
 * PURPOSE: Responsive layout container for list pages
 * COMPOSITION: Slot-based - header, search, items (children), pagination
 * RENDERS: Responsive grid with max-width-7xl, responsive padding
 * USED BY: All list pages (workflows, integrations, etc.)
 */
export const ListContainer = ({
  children,
  header,
  search,
  pagination,
}: ListContainerProps) => {
  return (
    <div className="h-full p-4 md:px-10 md:py-6">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-y-8">
        {header}
        <div className="flex h-full flex-col gap-y-4">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};
