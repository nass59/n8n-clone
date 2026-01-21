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
 * PURPOSE: Determine active state using exact match for home, prefix match for other routes
 * INPUT: url (nav item path), pathname (current route)
 * OUTPUT: boolean active state
 */
const isItemActive = (url: string, pathname: string): boolean => {
  if (url === APP_ROUTES.HOME) {
    return pathname === APP_ROUTES.HOME;
  }

  return pathname.startsWith(url);
};

/**
 * PURPOSE: Render single sidebar nav item with active state and icon
 * RENDERS: Link with active highlight, icon, and title from SidebarNavItem
 * USES: usePathname for active state detection, isItemActive helper
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
