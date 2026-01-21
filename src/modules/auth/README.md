# Auth Module

Authentication module for Nodebase. Handles user login, registration, and OAuth (GitHub, Google) via Better Auth.

## Architecture

```
auth/
├── components/          # UI components (client-side)
│   ├── auth-layout.tsx          # Page layout wrapper
│   ├── auth-card.tsx            # Form card container
│   ├── login-form.tsx           # Email/password login + OAuth
│   ├── register-form.tsx        # Email/password signup + OAuth
│   ├── oauth-buttons.tsx        # GitHub/Google sign-in buttons
│   └── password-input.tsx       # Password field with show/hide toggle
├── lib/                 # Constants & schemas
│   ├── auth-constants.ts        # Routes, OAuth config, password rules
│   └── auth-schemas.ts          # Zod validation schemas
└── types/               # Type definitions
    └── auth.types.ts            # LoginFormValues, RegisterFormValues, etc.
```

## Data Flow

### Login Flow
1. User enters email + password in `LoginForm`
2. Form validates with `loginSchema` (non-empty check only)
3. Calls `authClient.signIn.email()` (Better Auth client method)
4. Success: Router redirects to "/" (dashboard)
5. Error: Shows toast notification

### Registration Flow
1. User enters email, password, confirmPassword in `RegisterForm`
2. Form validates with `registerSchema` (strong password + match check)
3. Calls `authClient.signUp.email()` (Better Auth client method)
4. Success: Router redirects to "/" (dashboard)
5. Error: Shows toast notification

### OAuth Flow
1. User clicks GitHub or Google button in `OAuthButtons`
2. Calls `authClient.signIn.social(provider)` (Better Auth client method)
3. Redirects to provider consent screen
4. Success: Router redirects to "/" (dashboard)
5. Error: Shows error toast

## Key Files

### Components

**auth-layout.tsx**
- Shared page layout for all auth pages (login, signup, forgot-password)
- Renders centered container with Nodebase logo + children
- Used by: `src/app/(auth)/layout.tsx`

**auth-card.tsx**
- Card wrapper for auth forms
- Props: `title`, `description`, `children`
- Used by: LoginForm, RegisterForm

**login-form.tsx**
- Full login form with email/password + OAuth options
- Validates with `loginSchema` (no password strength check)
- Redirects to "/" on success
- Uses: `PasswordInput`, `OAuthButtons`, `AuthCard`

**register-form.tsx**
- Full registration form with email/password + OAuth options
- Validates with `registerSchema` (strong password + confirmation)
- Redirects to "/" on success
- Uses: `PasswordInput`, `OAuthButtons`, `AuthCard`

**oauth-buttons.tsx**
- Two buttons: GitHub and Google
- Props: `disabled?`
- Handles `authClient.signIn.social()` for each provider
- Redirects to "/" on success, shows error toast on failure

**password-input.tsx**
- Enhanced password input with visibility toggle
- Shows/hides password via eye icon button
- Accessible: includes sr-only toggle label
- Props: extends native `<input>` attributes

### Constants & Schemas

**auth-constants.ts**
- `AUTH_ROUTES`: Maps to app routes (LOGIN, SIGNUP, DASHBOARD, FORGOT_PASSWORD)
- `OAUTH_PROVIDERS`: GitHub and Google metadata (name, logo path)
- `PASSWORD_REQUIREMENTS`: Min 8 chars, uppercase, lowercase, number

**auth-schemas.ts**
- `loginSchema`: Email + non-empty password
- `registerSchema`: Email + strong password + confirmation
- Shared: `emailSchema`, `passwordSchema`

### Types

**auth.types.ts**
- `OAuthProvider`: "github" | "google"
- `AuthFormType`: "login" | "register"
- `LoginFormValues`: { email, password }
- `RegisterFormValues`: { email, password, confirmPassword }

## Authentication System

This module uses **Better Auth** (server-side auth framework):
- Client: `authClient` from `@/lib/auth-client`
- Server: `auth` from `@/lib/auth` (not used by this module directly)
- Auth checks: `requireAuth` middleware in tRPC procedures

## Password Requirements

Registration enforces:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

Login does **not** enforce strength (only checks non-empty).

## Usage Examples

### In a Page Component

```typescript
// src/app/(auth)/login/page.tsx
import { LoginForm } from "@/modules/auth/components/login-form";
import { AuthLayout } from "@/modules/auth/components/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
```

### Using Auth Client

```typescript
// In a client component
import { authClient } from "@/lib/auth-client";

// Email/password login
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
  callbackURL: "/dashboard",
});

// Email/password signup
await authClient.signUp.email({
  email: "user@example.com",
  name: "User Name",
  password: "password123",
  callbackURL: "/dashboard",
});

// OAuth
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
});
```

## Files by Responsibility

| File | Type | Responsibility |
|------|------|---|
| auth.types.ts | Types | Type definitions for forms |
| auth-constants.ts | Config | Routes, OAuth providers, password rules |
| auth-schemas.ts | Schema | Zod validation schemas |
| auth-layout.tsx | Component | Page layout wrapper |
| auth-card.tsx | Component | Form card container |
| password-input.tsx | Component | Password field with toggle |
| login-form.tsx | Component | Login UI + logic |
| register-form.tsx | Component | Registration UI + logic |
| oauth-buttons.tsx | Component | OAuth button UI + logic |

## Key Patterns

- **No barrel files**: Import directly from individual files
- **Client components**: All form components use `"use client"`
- **Validation**: Zod schemas for all form inputs
- **Error handling**: Toast notifications via Sonner
- **Accessibility**: sr-only labels, proper aria attributes
- **Better Auth**: All auth calls via `authClient` from `@/lib/auth-client`
