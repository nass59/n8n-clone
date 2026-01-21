import { IconFolderOpen, IconHistory, IconLock } from "@tabler/icons-react";
import { APP_ROUTES } from "@/lib/routes";
import type { SidebarNavGroup } from "@/modules/navigation/types/navigation.types";

/**
 * PURPOSE: Single source of truth for sidebar navigation structure
 * PURE: Yes
 * USED BY: SidebarNav component (renders navigation groups)
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
