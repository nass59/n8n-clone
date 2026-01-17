import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  /**
   * The authentication form content to render within the layout.
   * Typically a login or signup form component.
   */
  children: ReactNode;
};

/**
 * Shared layout wrapper for authentication pages (login, signup, etc.).
 *
 * Provides a centered, vertically-aligned container with the Nodebase logo
 * and consistent styling across all auth-related pages. Used by the `(auth)`
 * route group layout at `src/app/(auth)/layout.tsx`.
 *
 * @remarks
 * **Accessibility considerations:**
 * - The logo image uses `alt=""` because it's decorative; the adjacent text
 *   "Nodebase" provides the semantic meaning.
 *
 * **Layout behavior:**
 * - Uses `min-h-svh` (small viewport height) for proper mobile browser support,
 *   accounting for dynamic browser chrome (URL bar, etc.).
 */
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
