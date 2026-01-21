/**
 * PURPOSE: Password input with show/hide toggle
 * RENDERS: Input field (password/text type) + eye icon button
 * USED BY: login-form.tsx, register-form.tsx
 * ACCESSIBILITY: aria-label for toggle button
 */

"use client";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PasswordInputProps = ComponentProps<"input">;

export const PasswordInput = ({ ref, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input {...props} ref={ref} type={showPassword ? "text" : "password"} />
      <Button
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        size="sm"
        type="button"
        variant="ghost"
      >
        {showPassword ? (
          <IconEyeOff className="h-4 w-4" />
        ) : (
          <IconEye className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
};
