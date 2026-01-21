"use client";

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

/**
 * PURPOSE: Render account/billing actions in sidebar footer with subscription gating
 * RENDERS: Conditional upgrade button, billing portal link, sign out button
 * DEPENDS: authClient (Better Auth), useHasActiveSubscription hook, Polar integration
 */
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

  /** Hide upgrade button while loading or if user has active subscription */
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
