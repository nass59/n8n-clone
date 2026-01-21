"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "@/modules/navigation/components/sidebar-brand";
import { SidebarFooterActions } from "@/modules/navigation/components/sidebar-footer-actions";
import { SidebarNavGroupComponent } from "@/modules/navigation/components/sidebar-nav-group";
import { SIDEBAR_NAVIGATION } from "@/modules/navigation/config/sidebar-navigation";

/**
 * PURPOSE: Main application sidebar with brand, navigation, and account actions
 * RENDERS: Three-section sidebar (header, content, footer) with collapsible icon mode
 * DEPENDENCIES: SIDEBAR_NAVIGATION config, SidebarBrand, SidebarNavGroupComponent, SidebarFooterActions
 */
export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        {SIDEBAR_NAVIGATION.map((group) => (
          <SidebarNavGroupComponent group={group} key={group.title} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterActions />
      </SidebarFooter>
    </Sidebar>
  );
};
