/**
 * PURPOSE: Card wrapper for auth forms (login, signup, etc.)
 * RENDERS: Card with header (title + description) and content slot
 * USED BY: login-form.tsx, register-form.tsx
 */

import type { PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthCardProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
