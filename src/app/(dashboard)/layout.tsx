import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireAuth } from "@/lib/auth-utils";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Root layout for the dashboard section of the application.
 *
 * This layout wraps all routes under `(dashboard)/` and provides:
 * - **Authentication protection**: Redirects unauthenticated users to the login page
 *   via `requireAuth()`. All nested routes are guaranteed to have an active session.
 * - **Sidebar navigation**: Renders the collapsible `AppSidebar` with workflow
 *   navigation (Workflows, Credentials, Executions) and account actions (billing, sign out).
 * - **Content area**: Uses `SidebarInset` for proper spacing alongside the sidebar.
 *
 * @see {@link AppSidebar} for navigation menu structure
 * @see {@link requireAuth} for authentication guard implementation
 */
export default async function Layout({ children }: LayoutProps) {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-accent/20">{children}</SidebarInset>
    </SidebarProvider>
  );
}
