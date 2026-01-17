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
import { registerSchema } from "../lib/auth-schemas";
import type { RegisterFormValues } from "../types/auth.types";
import { AuthCard } from "./auth-card";
import { OAuthButtons } from "./oauth-buttons";
import { PasswordInput } from "./password-input";

/**
 * User registration form with email/password and OAuth options.
 *
 * Handles new user signup through Better Auth, supporting both
 * traditional email/password registration and OAuth providers (GitHub, Google).
 *
 * @remarks
 * **Features:**
 * - Email/password registration
 * - OAuth (GitHub, Google)
 * - Password strength validation
 * - Password confirmation matching
 * - Password visibility toggle
 * - Form validation with Zod
 * - Auto-redirect on success
 * - Error toast notifications
 * - Proper autocomplete attributes
 *
 * **Flow:**
 * 1. User enters email, password, and confirmation
 * 2. Form validates with registerSchema
 * 3. Calls authClient.signUp.email()
 * 4. On success: Redirects to dashboard ("/")
 * 5. On error: Shows error toast
 */
export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email(
      {
        name: values.email,
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
    <AuthCard
      description="Create your account to get started"
      title="Get started"
    >
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        autoComplete="new-password"
                        placeholder="*******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        autoComplete="new-password"
                        placeholder="*******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={isPending} type="submit">
                Sign up
              </Button>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                className="underline underline-offset-4"
                href={AUTH_ROUTES.LOGIN}
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
};
