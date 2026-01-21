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
 * PURPOSE: Render app logo and name in sidebar header, linking to home
 * RENDERS: Logo image + app name from siteConfig
 * DEPENDS: siteConfig for branding info
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
