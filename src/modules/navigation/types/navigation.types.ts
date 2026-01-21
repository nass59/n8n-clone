import type { TablerIcon } from "@tabler/icons-react";

/**
 * PURPOSE: Single sidebar navigation item definition
 * USED BY: SIDEBAR_NAVIGATION config, SidebarNavItemComponent
 */
export type SidebarNavItem = {
  title: string;
  url: string;
  icon: TablerIcon;
  tooltip?: string;
  requiresPremium?: boolean;
};

/**
 * PURPOSE: Logical grouping of navigation items for sidebar organization
 * USED BY: SIDEBAR_NAVIGATION config, SidebarNavGroupComponent
 */
export type SidebarNavGroup = {
  title: string;
  items: SidebarNavItem[];
};
