# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nodebase is a workflow automation platform (n8n clone) built with Next.js 16+. It combines AI capabilities with business process automation, providing technical teams the flexibility of code with the speed of no-code.

## Commands

```bash
# Development
bun run dev          # Start Next.js dev server
bun run dev:all      # Start all services (Next.js + Inngest) via mprocs
bun run inngest:dev  # Start Inngest dev server alone (UI at localhost:8288)

# Build & Production
bun run build        # Build for production
bun run start        # Start production server

# Code Quality
bun run lint         # Check code with Biome (uses Ultracite preset)
bun run format       # Format code with Biome

# Database
bunx prisma generate            # Generate Prisma client (outputs to src/generated/prisma)
bunx prisma migrate dev --name <name>  # Create and apply migration
bunx prisma studio              # Open database GUI

# UI Components
bunx shadcn@latest add <component>  # Add shadcn/ui component
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16+ (App Router, React Server Components)
- **Database**: PostgreSQL with Prisma ORM + Neon adapter
- **API**: tRPC (type-safe end-to-end)
- **Auth**: Better Auth with Polar integration for subscriptions
- **Background Jobs**: Inngest (event-driven, AI-wrapped steps)
- **AI**: Vercel AI SDK (OpenAI, Anthropic, Google)
- **UI**: shadcn/ui with Tailwind CSS 4, Tabler Icons
- **Linting**: Biome with Ultracite preset
- **Package Manager**: Bun

### Key Directories
- `src/app/` - Next.js App Router pages and API routes
- `src/modules/` - Feature modules (auth, workflows, subscriptions)
- `src/trpc/` - tRPC setup with routers in `routers/`
- `src/inngest/` - Background job functions
- `src/lib/` - Core utilities (auth, db, polar)
- `src/components/ui/` - shadcn/ui components
- `src/generated/prisma/` - Generated Prisma client

### tRPC Usage

Server Components (direct call):
```typescript
import { caller } from "@/trpc/server";
const data = await caller.workflows.getMany({ page: 1, pageSize: 10, search: "" });
```

Client Components (React Query):
```typescript
import { useTRPC } from "@/trpc/client";
const trpc = useTRPC();
const { data } = trpc.workflows.getMany.useQuery({ page: 1, pageSize: 10, search: "" });
```

Prefetching with hydration:
```typescript
import { prefetch, HydrateClient, trpc } from "@/trpc/server";
prefetch(trpc.workflows.getMany.queryOptions({ ... }));
return <HydrateClient>...</HydrateClient>;
```

### tRPC Procedures
- `baseProcedure` - No auth required
- `protectedProcedure` - Requires authenticated session (ctx.auth)
- `premiumProcedure` - Requires active Polar subscription (ctx.customer)

### Authentication
- Server: `import { auth } from "@/lib/auth"` - Better Auth instance
- Client: `import { authClient } from "@/lib/auth-client"` - React client
- Utilities: `import { requireAuth, requireUnauth } from "@/lib/auth-utils"` - Server guards

### Database
```typescript
import prisma from "@/lib/db";
const workflow = await prisma.workflow.findUnique({ where: { id } });
```

## Code Conventions

### TypeScript
- **Always use `type` over `interface`** (enforced by Biome)
- No `any` types - use `unknown` instead
- Strict mode enabled

### Components
- **Pages** (`app/**/page.tsx`): Use `export default function`
- **Everything else**: Use `export const` with arrow functions
- Never use `React.FC`

```typescript
// Page
export default function WorkflowsPage() {
  return <main>...</main>;
}

// Component
export const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  return <Card>{workflow.name}</Card>;
};
```

### File Naming
- **kebab-case** for all files: `workflow-builder.tsx`, `use-auth.ts`

### React Patterns
- Server Components by default - add `'use client'` only when needed
- Use async Server Components for data fetching
- Use path aliases: `@/components`, `@/lib`, `@/hooks`, `@/modules`

### Styling
- Use Tailwind utilities directly
- Use `cn()` from `@/lib/utils` for conditional classes
