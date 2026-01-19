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
 * Main application sidebar providing primary navigation.
 *
 * Composes the sidebar from three sections:
 * - **Header**: Application brand/logo (SidebarBrand)
 * - **Content**: Navigation groups defined in SIDEBAR_NAVIGATION
 * - **Footer**: Account actions (upgrade, billing, sign out)
 *
 * Supports collapsible mode via the `collapsible="icon"` prop, which
 * collapses the sidebar to show only icons with tooltips on hover.
 *
 * **Structure:**
 * ```
 * +------------------+
 * | [Logo] Nodebase  |  <- SidebarHeader / SidebarBrand
 * +------------------+
 * | Workflows        |
 * | Credentials      |  <- SidebarContent / SidebarNavGroupComponent
 * | Executions       |
 * +------------------+
 * | Upgrade to Pro   |
 * | Billing Portal   |  <- SidebarFooter / SidebarFooterActions
 * | Sign out         |
 * +------------------+
 * ```
 *
 * @see {@link SIDEBAR_NAVIGATION} for configuring navigation items
 * @see {@link SidebarBrand} for brand section
 * @see {@link SidebarFooterActions} for footer actions
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
