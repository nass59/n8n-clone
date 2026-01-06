# Copilot Instructions for n8n Clone

## Project Overview

This is a **workflow automation platform** (n8n clone) that combines AI capabilities with business process automation. It provides technical teams the flexibility of code with the speed of no-code.

**Core Features:**
- Visual workflow builder
- AI-powered automation
- Background job processing (Inngest)
- Type-safe API layer (tRPC)
- User authentication (Better Auth)
- PostgreSQL database (Prisma ORM)

---

## Tech Stack

| Category           | Technology                                         |
| ------------------ | -------------------------------------------------- |
| Framework          | **Next.js 16+** (App Router, RSC)                  |
| Language           | **TypeScript 5.9+** (strict mode)                  |
| Database           | **PostgreSQL** with Prisma ORM + Neon adapter      |
| Authentication     | **Better Auth**                                    |
| API Layer          | **tRPC** (type-safe, end-to-end)                   |
| Background Jobs    | **Inngest** (event-driven, AI-wrapped steps)       |
| AI Integration     | **Vercel AI SDK** (OpenAI, Anthropic, Google)      |
| Styling            | **Tailwind CSS 4**                                 |
| UI Components      | **shadcn/ui** with Base UI (base-vega)             |
| Icons              | **Tabler Icons** (`@tabler/icons-react`)           |
| Linting/Formatting | **Biome** with **Ultracite** preset                |
| Package Manager    | **Bun**                                            |

---

## Code Conventions (Critical for Agents)

### TypeScript - Strict Rules

✅ **ALWAYS:**
- Use `type` over `interface` for all type definitions
- Enable strict mode - no `any` types (use `unknown` instead)
- Export types explicitly: `export type { MyType }`
- Use `satisfies` operator for type-safe object literals

```typescript
// ✅ Correct
type WorkflowNode = {
  id: string;
  type: "trigger" | "action" | "condition";
  config: Record<string, unknown>;
};

// ❌ Wrong
interface WorkflowNode {
  type: string;
  config: any;
}
```

### Component & Export Patterns - Non-Negotiable

✅ **Pages (app/**/page.tsx):**
- Use `export default function` (function declarations)

✅ **Everything Else:**
- Use `export const` with arrow functions
- Components, utilities, hooks, constants

```typescript
// ✅ Page Component (app/workflows/page.tsx)
export default function WorkflowsPage() {
  return <main>...</main>;
}

// ✅ Regular Component
export const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  return <Card>{workflow.name}</Card>;
};

// ✅ Utility/Hook
export const useWorkflow = (id: string) => {
  // ...
};

// ❌ NEVER use for pages
const WorkflowsPage = () => { ... };
export default WorkflowsPage;

// ❌ NEVER use React.FC
const WorkflowCard: React.FC<Props> = (props) => { ... };
```

### React & Next.js Patterns

✅ **Server Components by default** (no `'use client'` unless needed)
✅ Add `'use client'` only for: interactivity, hooks, browser APIs
✅ Use async Server Components for data fetching
✅ Colocate related files when it makes sense

```typescript
// ✅ Server Component - async data fetching
export default async function WorkflowPage({ params }: PageProps) {
  const { id } = await params;
  const workflow = await db.workflow.findUnique({ where: { id } });
  return <WorkflowEditor workflow={workflow} />;
}

// ✅ Client Component - interactivity
"use client";

import { useState } from "react";

export const WorkflowBuilder = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  return <Canvas nodes={nodes} onNodesChange={setNodes} />;
};
```

### File & Folder Naming

- **kebab-case** for all files/folders: `workflow-builder.tsx`, `use-nodes.ts`
- Component files match component name: `WorkflowCard` → `workflow-card.tsx`
- Avoid index files - prefer explicit imports

### Import Organization

```typescript
// 1. React
import { useState, useEffect } from "react";

// 2. External packages
import { IconPlus } from "@tabler/icons-react";

// 3. Internal (use path aliases)
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { db } from "@/lib/db";

// 4. Types
import type { Workflow, WorkflowNode } from "@/types/workflow";
```

---

## Architecture Patterns (n8n Clone Specific)

### tRPC API Layer

✅ Define routers in `@/trpc/routers/`
✅ Use in Server Components: `import { trpc } from "@/trpc/server"`
✅ Use in Client Components: `import { trpc } from "@/trpc/client"`

```typescript
// Server Component
export default async function WorkflowsPage() {
  const workflows = await trpc.workflow.list();
  return <WorkflowList workflows={workflows} />;
}

// Client Component
"use client";

export const CreateWorkflowButton = () => {
  const utils = trpc.useUtils();
  const create = trpc.workflow.create.useMutation({
    onSuccess: () => utils.workflow.list.invalidate(),
  });

  return <Button onClick={() => create.mutate({ name: "New" })}>Create</Button>;
};
```

### Inngest Background Jobs

✅ Define functions in `@/inngest/functions.ts`
✅ Use `inngest.send()` to trigger events
✅ Wrap AI steps for automatic retries

```typescript
import { inngest } from "@/inngest/client";

export const processWorkflow = inngest.createFunction(
  { id: "process-workflow" },
  { event: "workflow.execute" },
  async ({ event, step }) => {
    const result = await step.ai.wrap("analyze-workflow", async () => {
      // AI logic here - auto-retries on failure
    });
    return result;
  }
);
```

### Database (Prisma)

✅ Import: `import { db } from "@/lib/db"`
✅ Type-safe queries with Prisma client
✅ Use transactions for multi-step operations

```typescript
// Create workflow with nodes atomically
const workflow = await db.$transaction(async (tx) => {
  const wf = await tx.workflow.create({
    data: { name: "New Workflow", userId },
  });
  await tx.workflowNode.createMany({
    data: nodes.map((n) => ({ ...n, workflowId: wf.id })),
  });
  return wf;
});
```

### Authentication (Better Auth)

✅ Server: `import { auth } from "@/lib/auth"`
✅ Client: `import { authClient } from "@/lib/auth-client"`
✅ Utilities: `import { getUser, requireAuth } from "@/lib/auth-utils"`

```typescript
// Protect Server Component
export default async function DashboardPage() {
  const user = await requireAuth(); // Throws if not authenticated
  return <Dashboard user={user} />;
}

// Client-side auth
"use client";

export const LoginButton = () => {
  const login = async () => {
    await authClient.signIn.email({ email, password });
  };
  return <Button onClick={login}>Login</Button>;
};
```

---

## Project Structure (Optimized for Agents)

```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Auth routes (login, signup)
│   ├── api/                # API endpoints
│   │   ├── auth/[...all]/  # Better Auth handler
│   │   ├── trpc/[trpc]/    # tRPC handler
│   │   └── inngest/        # Inngest webhook
│   └── workflows/          # Workflow pages
├── components/
│   └── ui/                 # shadcn/ui primitives
├── hooks/                  # Custom React hooks
├── inngest/               # Background job functions
│   ├── client.ts          # Inngest client instance
│   └── functions.ts       # Job definitions
├── lib/                   # Core utilities
│   ├── auth.ts            # Better Auth server
│   ├── auth-client.ts     # Better Auth client
│   ├── auth-utils.ts      # Auth helpers (getUser, requireAuth)
│   ├── db.ts              # Prisma client instance
│   └── utils.ts           # Shared utilities (cn, etc.)
├── modules/               # Feature modules (auth, workflows)
├── trpc/                  # tRPC setup
│   ├── init.ts            # tRPC instance
│   ├── client.tsx         # Client-side tRPC
│   ├── server.tsx         # Server-side tRPC
│   └── routers/           # API routers
│       └── _app.ts        # Root router
└── types/                 # Shared types

prisma/
├── schema.prisma          # Database schema
└── migrations/            # Migration history
```

**Key Locations:**
- Add tRPC routers: `src/trpc/routers/`
- Add Inngest jobs: `src/inngest/functions.ts`
- Add UI components: `src/components/ui/` (via shadcn CLI)
- Add feature modules: `src/modules/[feature]/`

---

## Styling with Tailwind

```typescript
import { cn } from "@/lib/utils";

// ✅ Use cn() for conditional classes
export const Card = ({ variant, className }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6",
        variant === "primary" && "border-primary",
        className
      )}
    />
  );
};
```

✅ Use Tailwind utilities directly
✅ Use `cn()` from `@/lib/utils` for conditional styling
✅ Customize via CSS variables in `globals.css`
✅ shadcn components: `bunx shadcn@latest add [component]`

---

## Development Commands

| Command              | Purpose                           |
| -------------------- | --------------------------------- |
| `bun run dev`        | Start Next.js dev server          |
| `bun run dev:all`    | Start all services (Next + Inngest) |
| `bun run lint`       | Check with Biome                  |
| `bun run format`     | Format with Biome                 |
| `bunx prisma studio` | Open database GUI                 |
| `bunx prisma migrate dev` | Create/apply migration       |
| `bunx shadcn@latest add [name]` | Add UI component         |

---

## Critical Do's and Don'ts

### ✅ ALWAYS

- Use Server Components by default
- Use `type` over `interface`
- Use path aliases (`@/`)
- Use `export const` for components/utils
- Use `export default function` for pages
- Keep components focused and small
- Handle loading/error states
- Use `cn()` for conditional classes

### ❌ NEVER

- Use `any` type (use `unknown`)
- Use `React.FC` type
- Create deeply nested components
- Ignore TypeScript errors
- Use inline styles (use Tailwind)
- Mix Server/Client component concerns
- Forget to add `'use client'` when using hooks/interactivity
- Skip accessibility (semantic HTML, ARIA when needed)

---

## Agent Quick Reference

**When adding a workflow feature:**
1. Define Prisma schema in `prisma/schema.prisma`
2. Run `bunx prisma migrate dev --name [name]`
3. Create tRPC router in `src/trpc/routers/`
4. Add Server Component page in `src/app/workflows/`
5. Build Client Component for interactivity
6. Add Inngest function if background processing needed

**When adding UI:**
1. Check if shadcn component exists: `bunx shadcn@latest add [name]`
2. Create custom component in `src/components/`
3. Use `cn()` for styling, Tailwind utilities
4. Export with `export const ComponentName = () => { ... }`

**When debugging:**
- Check type errors: `bun run lint`
- Inspect database: `bunx prisma studio`
- View Inngest jobs: `bun run inngest:dev` (http://localhost:8288)
- Check Next.js errors in terminal and browser console
