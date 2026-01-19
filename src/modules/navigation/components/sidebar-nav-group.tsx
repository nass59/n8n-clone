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
 * Renders a logical group of navigation items in the sidebar.
 *
 * Wraps multiple SidebarNavItemComponents in a SidebarGroup container.
 * Each group represents a related set of navigation destinations
 * (e.g., Workflows, Credentials, Executions).
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
