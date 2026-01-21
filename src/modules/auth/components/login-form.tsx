/**
 * PURPOSE: Email/password login form with OAuth options
 * PURE: No (authClient.signIn.email side effect, redirect)
 * USED BY: src/app/(auth)/login/page.tsx
 * DEPENDS: authClient, loginSchema, AuthCard, PasswordInput, OAuthButtons
 * FLOW:
 *   1. User enters email + password
 *   2. Validates with loginSchema (no strength check)
 *   3. Calls authClient.signIn.email()
 *   4. Success: Router redirects to "/"
 *   5. Error: Shows toast with error message
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { AUTH_ROUTES } from "../lib/auth-constants";
import { loginSchema } from "../lib/auth-schemas";
import type { LoginFormValues } from "../types/auth.types";
import { AuthCard } from "./auth-card";
import { OAuthButtons } from "./oauth-buttons";
import { PasswordInput } from "./password-input";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <AuthCard description="Login to continue" title="Welcome Back">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <OAuthButtons disabled={isPending} />
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="email"
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        className="text-sm underline underline-offset-4"
                        href={AUTH_ROUTES.FORGOT_PASSWORD}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        autoComplete="current-password"
                        placeholder="*******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={isPending} type="submit">
                Login
              </Button>
            </div>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                className="underline underline-offset-4"
                href={AUTH_ROUTES.SIGNUP}
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
};
