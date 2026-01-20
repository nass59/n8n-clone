import type { PropsWithChildren, ReactNode } from "react";

export type ListContainerProps = PropsWithChildren<{
  header: ReactNode;
  search?: ReactNode;
  pagination?: ReactNode;
}>;

/**
 * A reusable layout container for list pages in Nodebase.
 *
 * Provides a consistent, responsive structure for displaying paginated lists
 * of resources (workflows, integrations, etc.) with a header, search, and
 * pagination. The container handles responsive padding and max-width constraints.
 *
 * This component uses a slot-based composition pattern, allowing each section
 * to be customized or omitted as needed.
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
