# Source Tree Analysis

> Generated: 2026-01-18 | Project: nodebase | Type: Next.js 16+ Full-Stack Web Application

## Directory Structure

```
nodebase/
├── .claude/                    # Claude Code configuration
│   ├── agents/                 # Agent definitions
│   └── AGENTS.md              # Agent documentation
├── .github/                    # GitHub configuration
│   ├── agents/                 # GitHub Copilot agents
│   └── copilot-instructions.md # AI assistant instructions
├── prisma/                     # 📊 Database Layer
│   ├── schema.prisma          # ★ Database schema (5 models)
│   └── migrations/            # Migration history
├── public/                     # Static assets
├── src/                        # 🎯 Application Source
│   ├── app/                   # Next.js App Router (see below)
│   ├── components/            # Shared UI components
│   │   ├── ui/               # shadcn/ui primitives (51 components)
│   │   └── providers/        # React context providers
│   ├── config/               # Application constants
│   ├── generated/            # Auto-generated code
│   │   └── prisma/          # Prisma client output
│   ├── hooks/                # Custom React hooks
│   ├── inngest/              # Background job functions
│   ├── lib/                  # Core utilities
│   └── modules/              # Feature modules
│       ├── auth/            # Authentication module
│       ├── workflows/       # Workflows module
│       └── subscriptions/   # Subscriptions module
│   └── trpc/                 # tRPC API layer
│       └── routers/         # API route definitions
├── CLAUDE.md                  # Claude Code instructions
├── README.md                  # Project documentation
├── biome.json                 # Linter configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies & scripts
├── prisma.config.ts           # Prisma configuration
├── tsconfig.json              # TypeScript configuration
└── tailwind.config.ts         # Tailwind CSS (v4 - CSS-based)
```

## App Router Structure

```
src/app/
├── layout.tsx                 # ★ Root layout (Providers, fonts, metadata)
├── globals.css                # Global styles & Tailwind
├── (auth)/                    # 🔓 Guest-only routes
│   ├── layout.tsx            # Auth layout (centered card)
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── signup/
│       └── page.tsx          # Registration page
├── (dashboard)/               # 🔐 Protected routes
│   ├── layout.tsx            # Dashboard layout (sidebar, auth check)
│   ├── (rest)/               # Standard dashboard pages
│   │   ├── layout.tsx       # Rest layout (with sidebar)
│   │   ├── workflows/
│   │   │   └── page.tsx     # Workflows list
│   │   ├── executions/
│   │   │   ├── page.tsx     # Executions list
│   │   │   └── [executionId]/
│   │   │       └── page.tsx # Execution detail
│   │   └── credentials/
│   │       ├── page.tsx     # Credentials list
│   │       └── [credentialId]/
│   │           └── page.tsx # Credential detail
│   └── (editor)/             # Editor/builder pages
│       └── workflows/
│           └── [workflowId]/
│               └── page.tsx  # ★ Workflow editor
└── api/                       # API Routes
    ├── auth/
    │   └── [...all]/
    │       └── route.ts      # ★ Better Auth handler
    ├── trpc/
    │   └── [trpc]/
    │       └── route.ts      # ★ tRPC handler
    └── inngest/
        └── route.ts          # ★ Inngest webhook
```

## Feature Modules Structure

```
src/modules/
├── auth/                      # 🔐 Authentication Module
│   ├── components/           # Auth UI components
│   │   ├── auth-layout.tsx  # Layout wrapper
│   │   ├── auth-card.tsx    # Card container
│   │   ├── login-form.tsx   # Login form
│   │   ├── register-form.tsx # Registration form
│   │   ├── oauth-buttons.tsx # Social login buttons
│   │   └── password-input.tsx # Password field
│   ├── lib/                  # Auth utilities
│   │   ├── auth-constants.ts # Route constants
│   │   └── auth-schemas.ts  # Zod validation schemas
│   └── types/
│       └── auth.types.ts    # TypeScript types
├── workflows/                 # 📋 Workflows Module
│   ├── components/           # Workflow UI
│   │   └── workflows.tsx    # Workflows list component
│   ├── hooks/                # React hooks
│   │   ├── use-workflows.ts # Workflow data hook
│   │   └── use-workflows-params.ts # URL params hook
│   ├── server/               # Server-side code
│   │   ├── routers.ts       # ★ tRPC router (5 procedures)
│   │   ├── prefetch.ts      # Server prefetching
│   │   └── params-loader.ts # Param loading
│   └── params.ts            # Param definitions
└── subscriptions/             # 💳 Subscriptions Module
    └── hooks/
        └── use-subscription.ts # Polar state hooks
```

## Core Utilities Structure

```
src/lib/
├── auth.ts                    # ★ Better Auth server config
├── auth-client.ts            # Better Auth client
├── auth-utils.ts             # Auth guards (requireAuth, requireUnauth)
├── db.ts                     # ★ Prisma client singleton
├── polar.ts                  # Polar SDK client
└── utils.ts                  # Shared utilities (cn function)
```

## tRPC Layer Structure

```
src/trpc/
├── init.ts                    # ★ tRPC initialization
│                              # - baseProcedure (public)
│                              # - protectedProcedure (auth required)
│                              # - premiumProcedure (subscription required)
├── client.tsx                # Client-side tRPC provider
├── server.tsx                # Server-side tRPC caller
└── routers/
    └── _app.ts               # ★ Root router (merges all routers)
```

## Critical Entry Points

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, providers, fonts |
| `src/lib/auth.ts` | Authentication configuration |
| `src/lib/db.ts` | Database client singleton |
| `src/trpc/init.ts` | API procedure definitions |
| `src/trpc/routers/_app.ts` | API router composition |
| `src/inngest/client.ts` | Background job client |
| `prisma/schema.prisma` | Database schema |

## Key Patterns

### Route Groups
- `(auth)` - Guest-only pages (login, signup)
- `(dashboard)` - Protected pages requiring authentication
- `(rest)` - Standard dashboard with sidebar
- `(editor)` - Full-screen editor views

### Module Organization
Each feature module follows the pattern:
```
module/
├── components/    # UI components
├── hooks/         # React hooks
├── server/        # Server-side code (routers, prefetch)
├── lib/           # Utilities & constants
└── types/         # TypeScript definitions
```

### Data Flow
```
UI Component
    ↓ (tRPC hook)
React Query Cache
    ↓ (tRPC client)
tRPC Procedure (protectedProcedure)
    ↓ (auth middleware)
Better Auth Session
    ↓ (prisma)
PostgreSQL (via Neon)
```
