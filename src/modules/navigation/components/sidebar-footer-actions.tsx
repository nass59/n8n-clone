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
 * Renders action buttons in the sidebar footer for account management.
 *
 * Displays conditional content based on subscription status:
 * - Upgrade to Pro button (only shown to free users)
 * - Billing Portal link (opens Polar customer portal)
 * - Sign Out button (clears session and redirects to login)
 *
 * Uses Better Auth client for authentication and Polar integration
 * for subscription management via authClient.checkout and authClient.customer.portal.
 */
export const SidebarFooterActions = () => {
  const router = useRouter();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  /**
   * Signs out the current user and redirects to login page.
   */
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
