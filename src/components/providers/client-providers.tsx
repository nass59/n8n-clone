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
 */
export const ClientProviders = ({ children }: ProvidersProps) => {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        {children}
        <Toaster />
      </NuqsAdapter>
    </TRPCReactProvider>
  );
};
