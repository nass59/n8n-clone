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

/**
 * A reusable card wrapper for authentication forms.
 *
 * Provides consistent styling and layout for login, signup,
 * and other auth-related forms.
 */
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
