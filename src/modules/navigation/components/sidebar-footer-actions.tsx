"use client";

/**
 * PURPOSE: Account and billing menu in sidebar footer
 * RENDERS: Upgrade button (conditional), Billing Portal, Sign Out
 * PATTERN: Subscription-gated upgrade button (hidden if subscribed or loading)
 * DEPENDS: authClient (Better Auth), useHasActiveSubscription, Polar integration
 * USED BY: Sidebar layout as footer content
 */

import { IconCreditCard, IconLogout, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { APP_ROUTES } from "@/lib/routes";
import { useHasActiveSubscription } from "@/modules/subscriptions/hooks/use-subscription";

export const SidebarFooterActions = () => {
  const router = useRouter();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(APP_ROUTES.LOGIN);
        },
      },
    });
  };

  const showUpgradeButton = !(hasActiveSubscription || isLoading);

  return (
    <SidebarMenu>
      {showUpgradeButton && (
        <SidebarMenuItem>
          <SidebarMenuButton
            className="h-10 gap-x-4 px-4"
            onClick={() => authClient.checkout({ slug: "pro" })}
            tooltip="Upgrade to Pro"
          >
            <IconStar className="size-4" />
            <span>Upgrade to Pro</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      <SidebarMenuItem>
        <SidebarMenuButton
          className="h-10 gap-x-4 px-4"
          onClick={() => authClient.customer.portal()}
          tooltip="Billing portal"
        >
          <IconCreditCard className="size-4" />
          <span>Billing Portal</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="h-10 gap-x-4 px-4"
          onClick={handleSignOut}
          tooltip="Sign out"
        >
          <IconLogout className="size-4" />
          <span>Sign out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
