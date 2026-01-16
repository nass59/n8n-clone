"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * Root providers component that wraps the application with all necessary context providers.
 *
 * @remarks
 * This component establishes the client boundary (`"use client"`) for all providers.
 * The root layout remains a Server Component, keeping the provider logic encapsulated here.
 *
 * **Included providers:**
 * - `TRPCReactProvider`: Enables tRPC hooks with React Query for data fetching
 * - `NuqsAdapter`: Syncs URL search params with React state (used by nuqs)
 * - `Toaster`: Renders toast notifications (Sonner) at the viewport edge
 */
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        {children}
        <Toaster />
      </NuqsAdapter>
    </TRPCReactProvider>
  );
};
