/**
 * PURPOSE: OAuth sign-in buttons (GitHub, Google)
 * PURE: No (authClient.signIn.social side effect, redirect)
 * RENDERS: Two buttons (GitHub + Google)
 * USED BY: login-form.tsx, register-form.tsx
 * DEPENDS: authClient, OAUTH_PROVIDERS constant
 */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { OAUTH_PROVIDERS } from "../lib/auth-constants";
import type { OAuthProvider } from "../types/auth.types";

type OAuthButtonsProps = {
  disabled?: boolean;
};

export const OAuthButtons = ({ disabled }: OAuthButtonsProps) => {
  const router = useRouter();

  const handleOAuthSignIn = async (provider: OAuthProvider) => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: () => {
          toast.error(`Failed to sign in with ${provider}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="w-full"
        disabled={disabled}
        onClick={() => handleOAuthSignIn("github")}
        type="button"
        variant="outline"
      >
        <Image
          alt={OAUTH_PROVIDERS.GITHUB.name}
          height={20}
          src={OAUTH_PROVIDERS.GITHUB.logo}
          width={20}
        />
        Continue with {OAUTH_PROVIDERS.GITHUB.name}
      </Button>
      <Button
        className="w-full"
        disabled={disabled}
        onClick={() => handleOAuthSignIn("google")}
        type="button"
        variant="outline"
      >
        <Image
          alt={OAUTH_PROVIDERS.GOOGLE.name}
          height={20}
          src={OAUTH_PROVIDERS.GOOGLE.logo}
          width={20}
        />
        Continue with {OAUTH_PROVIDERS.GOOGLE.name}
      </Button>
    </div>
  );
};
