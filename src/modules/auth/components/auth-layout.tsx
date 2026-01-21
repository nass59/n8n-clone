/**
 * PURPOSE: Shared layout wrapper for all auth pages (login, signup, forgot-password)
 * RENDERS: Centered container with logo + children, responsive
 * USED BY: src/app/(auth)/layout.tsx
 */

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          aria-label="Go to Nodebase homepage"
          className="flex items-center gap-2 self-center font-medium"
          href="/"
        >
          <Image alt="" height={30} priority src="/logos/logo.svg" width={30} />
          Nodebase
        </Link>
        {children}
      </div>
    </div>
  );
};
