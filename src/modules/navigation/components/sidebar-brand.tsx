"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_ROUTES } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

const LOGO_SIZE = 30;

/**
 * Displays the application brand in the sidebar header.
 *
 * Renders the logo and application name from `siteConfig`, linking to
 * the home page. Adapts to collapsed sidebar state via SidebarMenuButton.
 */
export const SidebarBrand = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="h-10 gap-x-4 px-4"
          render={<Link href={APP_ROUTES.HOME} prefetch />}
        >
          <Image
            alt={siteConfig.name}
            height={LOGO_SIZE}
            src="/logos/logo.svg"
            width={LOGO_SIZE}
          />
          <span className="font-semibold text-sm">{siteConfig.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
