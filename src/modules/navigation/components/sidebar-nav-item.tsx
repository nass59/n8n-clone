"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { APP_ROUTES } from "@/lib/routes";
import type { SidebarNavItem } from "@/modules/navigation/types/navigation.types";

type SidebarNavItemProps = {
  item: SidebarNavItem;
};

/**
 * Determines if a navigation item should be marked as active based on URL matching.
 *
 * Uses exact matching for the home route to prevent it from being active on
 * all pages. All other routes use prefix matching so nested pages (e.g.,
 * `/workflows/123`) highlight their parent nav item.
 */
const isItemActive = (url: string, pathname: string): boolean => {
  if (url === APP_ROUTES.HOME) {
    return pathname === APP_ROUTES.HOME;
  }

  return pathname.startsWith(url);
};

/**
 * Renders a single clickable navigation item in the sidebar.
 *
 * Handles active state highlighting based on current route and renders
 * the item's icon and title. Supports tooltip display when sidebar is collapsed.
 */
export const SidebarNavItemComponent = ({ item }: SidebarNavItemProps) => {
  const pathname = usePathname();
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="h-10 gap-x-4 px-4"
        isActive={isItemActive(item.url, pathname)}
        render={<Link href={item.url} prefetch />}
        tooltip={item.tooltip}
      >
        <Icon className="size-4" />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
