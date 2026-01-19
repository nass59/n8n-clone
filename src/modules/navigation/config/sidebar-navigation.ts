import { IconFolderOpen, IconHistory, IconLock } from "@tabler/icons-react";
import { APP_ROUTES } from "@/lib/routes";
import type { SidebarNavGroup } from "@/modules/navigation/types/navigation.types";

/**
 * Main navigation configuration for the application sidebar.
 *
 * This is the single source of truth for sidebar navigation structure.
 * Items are rendered in the order they appear in this array.
 */
export const SIDEBAR_NAVIGATION: SidebarNavGroup[] = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        icon: IconFolderOpen,
        url: APP_ROUTES.WORKFLOWS,
      },
      {
        title: "Credentials",
        icon: IconLock,
        url: APP_ROUTES.CREDENTIALS,
      },
      {
        title: "Executions",
        icon: IconHistory,
        url: APP_ROUTES.EXECUTIONS,
      },
    ],
  },
];
