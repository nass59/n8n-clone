import type { TablerIcon } from "@tabler/icons-react";

/**
 * Represents a single navigation item in the sidebar.
 *
 * Used to define clickable menu items that navigate users to different
 * sections of the workflow automation platform.
 */
export type SidebarNavItem = {
  /** Display title shown next to the icon in the sidebar */
  title: string;
  /** URL path for navigation - should use APP_ROUTES constants */
  url: string;
  /** Tabler icon component rendered at 16x16 (size-4) */
  icon: TablerIcon;
  /** Tooltip text shown on hover when sidebar is collapsed (defaults to title) */
  tooltip?: string;
  /** When true, item may show premium badge or restrict access for free users */
  requiresPremium?: boolean;
};

/**
 * Represents a logical group of navigation items in the sidebar.
 *
 * Groups help organize related navigation items together, such as
 * workflow-related pages (Workflows, Credentials, Executions) or
 * settings pages.
 */
export type SidebarNavGroup = {
  /** Group identifier used for accessibility labels and as React key */
  title: string;
  /** Ordered list of navigation items rendered within this group */
  items: SidebarNavItem[];
};
