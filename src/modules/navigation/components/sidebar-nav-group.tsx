"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarNavItemComponent } from "@/modules/navigation/components/sidebar-nav-item";
import type { SidebarNavGroup } from "@/modules/navigation/types/navigation.types";

type SidebarNavGroupProps = {
  group: SidebarNavGroup;
};

/**
 * PURPOSE: Render grouped navigation items with layout containers
 * RENDERS: SidebarGroup wrapping SidebarMenu with SidebarNavItemComponent children
 * USES: SidebarNavGroup type for structure, SidebarNavItemComponent for items
 */
export const SidebarNavGroupComponent = ({ group }: SidebarNavGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarNavItemComponent item={item} key={item.url} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
