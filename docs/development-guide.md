# Development Guide

> Generated: 2026-01-18 | Project: nodebase

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Bun** | 1.2.15+ | Package manager & runtime |
| **Node.js** | 18+ | For some tooling compatibility |
| **PostgreSQL** | 14+ | Local or Neon hosted |
| **Git** | 2.x | Version control |

## Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd nodebase
bun install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database (required)
DATABASE_URL="postgresql://user:password@localhost:5432/nodebase"

# Auth (required)
BETTER_AUTH_SECRET="generate-with: bunx @better-auth/cli secret"
BETTER_AUTH_URL="http://localhost:3000"

# Payments (required for premium features)
POLAR_ACCESS_TOKEN="your-polar-access-token"
POLAR_PRODUCT_ID="your-product-id"
POLAR_SUCCESS_URL="http://localhost:3000/workflows"
POLAR_SERVER="sandbox"

# AI Providers (optional)
ANTHROPIC_API_KEY="your-anthropic-key"
OPENAI_API_KEY="your-openai-key"
GOOGLE_GENERATIVE_AI_API_KEY="your-google-key"

# Inngest (optional for local dev)
INNGEST_EVENT_KEY="your-inngest-key"
INNGEST_SIGNING_KEY="your-signing-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
bunx prisma generate

# Create and apply migrations
bunx prisma migrate dev

# (Optional) Seed database
bunx prisma db seed
```

### 4. Start Development

```bash
# Start Next.js only
bun run dev

# Start all services (Next.js + Inngest)
bun run dev:all
```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Next.js dev server |
| `bun run dev:all` | Start all services via mprocs |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Check code with Biome |
| `bun run format` | Format code with Biome |
| `bun run inngest:dev` | Start Inngest dev server |
| `bun run typecheck` | Run TypeScript type checking |

### Database Scripts

| Command | Description |
|---------|-------------|
| `bunx prisma generate` | Generate Prisma client |
| `bunx prisma migrate dev --name <name>` | Create migration |
| `bunx prisma migrate deploy` | Apply migrations (production) |
| `bunx prisma db push` | Push schema without migration |
| `bunx prisma studio` | Open database GUI |
| `bunx prisma db seed` | Run seed script |
| `bunx prisma migrate reset` | Reset database |

### Auth Scripts

| Command | Description |
|---------|-------------|
| `bunx @better-auth/cli generate` | Generate auth types |
| `bunx @better-auth/cli migrate` | Run auth migrations |
| `bunx @better-auth/cli secret` | Generate auth secret |
| `bunx @better-auth/cli info` | Show auth configuration |

## Development Workflow

### Adding a New Feature

1. **Define database schema** (if needed)
   ```bash
   # Edit prisma/schema.prisma
   bunx prisma migrate dev --name add-feature
   ```

2. **Create tRPC router**
   ```typescript
   // src/modules/feature/server/routers.ts
   export const featureRouter = createTRPCRouter({
     getMany: protectedProcedure.query(({ ctx }) => {
       return prisma.feature.findMany({ where: { userId: ctx.auth.user.id } });
     }),
   });
   ```

3. **Register router**
   ```typescript
   // src/trpc/routers/_app.ts
   import { featureRouter } from "@/modules/feature/server/routers";

   export const appRouter = createTRPCRouter({
     workflows: workflowsRouter,
     feature: featureRouter, // Add here
   });
   ```

4. **Create page component**
   ```typescript
   // src/app/(dashboard)/(rest)/feature/page.tsx
   export default async function FeaturePage() {
     const features = await caller.feature.getMany();
     return <FeatureList features={features} />;
   }
   ```

### Adding a UI Component

```bash
# Check if shadcn component exists
bunx shadcn@latest add <component-name>

# Or create custom component
# src/components/feature-card.tsx
```

### Adding a Background Job

```typescript
// src/inngest/functions.ts
export const processFeature = inngest.createFunction(
  { id: "process-feature" },
  { event: "feature/process" },
  async ({ event, step }) => {
    const result = await step.ai.wrap("ai-step", async () => {
      // AI logic with automatic retries
    });
    return result;
  }
);
```

## Code Style

### TypeScript

```typescript
// ✅ Use type (not interface)
type WorkflowProps = {
  id: string;
  name: string;
};

// ✅ Use unknown (not any)
const parseData = (data: unknown) => { ... };

// ✅ Use satisfies for type-safe objects
const config = { ... } satisfies Config;
```

### Components

```typescript
// ✅ Pages: function declaration + default export
export default function WorkflowsPage() {
  return <main>...</main>;
}

// ✅ Components: arrow function + named export
export const WorkflowCard = ({ workflow }: WorkflowCardProps) => {
  return <Card>{workflow.name}</Card>;
};

// ❌ Never use React.FC
// ❌ Never use default export for non-pages
```

### Imports

```typescript
// 1. React
import { useState, useEffect } from "react";

// 2. External packages
import { IconPlus } from "@tabler/icons-react";

// 3. Internal (use path aliases)
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

// 4. Types (import type)
import type { Workflow } from "@/types";
```

## Testing

### Running Tests

```bash
# (Testing infrastructure TBD)
bun test
```

### Testing tRPC Procedures

```typescript
// Direct procedure testing
import { appRouter } from "@/trpc/routers/_app";
import { createTRPCContext } from "@/trpc/init";

const ctx = await createTRPCContext();
const caller = appRouter.createCaller(ctx);
const result = await caller.workflows.getMany({ page: 1, pageSize: 10, search: "" });
```

## Debugging

### Database Issues

```bash
# Open Prisma Studio to inspect data
bunx prisma studio

# Reset database if needed
bunx prisma migrate reset
```

### tRPC Issues

1. Check browser DevTools Network tab for `/api/trpc/*` requests
2. Check server console for procedure errors
3. Verify authentication state

### Inngest Issues

1. Start Inngest dev server: `bun run inngest:dev`
2. Open [http://localhost:8288](http://localhost:8288)
3. View function runs and logs

### Auth Issues

```bash
# Check auth configuration
bunx @better-auth/cli info

# Generate new secret if needed
bunx @better-auth/cli secret
```

## Common Tasks

### Update Dependencies

```bash
bun update
bunx prisma generate  # Regenerate client after Prisma update
```

### Reset Development State

```bash
# Reset database
bunx prisma migrate reset

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules bun.lock
bun install
```

### Generate Types

```bash
# Prisma types
bunx prisma generate

# Better Auth types
bunx @better-auth/cli generate
```

## IDE Setup

### VS Code Extensions

- Biome (linting)
- Prisma (schema highlighting)
- Tailwind CSS IntelliSense
- Pretty TypeScript Errors

### VS Code Settings

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

## Troubleshooting

### "Too many database connections"

This occurs during hot reload. The singleton pattern in `src/lib/db.ts` should prevent this. If it persists:
1. Restart the dev server
2. Check `globalForPrisma` is properly set

### "Module not found: @/..."

Path aliases aren't resolving. Check:
1. `tsconfig.json` has `"@/*": ["./src/*"]` in paths
2. Restart TypeScript server in IDE

### "tRPC procedure not found"

1. Ensure router is registered in `_app.ts`
2. Restart dev server after adding new routers
3. Check procedure export names match

### "Better Auth unauthorized"

1. Check `BETTER_AUTH_SECRET` is set
2. Verify `BETTER_AUTH_URL` matches your dev URL
3. Clear cookies and try again
