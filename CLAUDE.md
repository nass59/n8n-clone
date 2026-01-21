# CLAUDE.md

Nodebase: Workflow automation platform (n8n clone). Next.js 16 + tRPC + Prisma + Better Auth.

> **Read `.claude/INDEX.json` first** — structured index of all modules, exports, and file patterns. Avoid scanning the repo.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `bun run dev` | Dev server |
| `bun run dev:all` | All services (mprocs) |
| `bun run lint` / `format` | Biome check/fix |
| `bunx prisma migrate dev --name <n>` | New migration |
| `bunx shadcn@latest add <c>` | Add UI component |
| `bun run index:generate` | Regenerate `.claude/INDEX.json` |

## Structure

```
src/
├── app/                   # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected dashboard routes
│   └── api/               # API routes (trpc, auth, inngest)
├── modules/{feature}/     # Feature modules
│   ├── components/        # UI components
│   ├── hooks/             # React hooks (use-*.ts)
│   ├── server/            # Server: routers.ts, service.ts, schemas.ts
│   └── types/             # Types (*.types.ts)
├── trpc/                  # tRPC: client.ts, server.ts, routers/_app.ts
├── lib/                   # Core: auth.ts, db.ts, utils.ts
└── components/ui/         # shadcn/ui primitives
```

## Patterns

### Imports
```typescript
// tRPC Server
import { caller } from "@/trpc/server";
await caller.workflows.getMany({ page: 1, pageSize: 10, search: "" });

// tRPC Client
import { useTRPC } from "@/trpc/client";
trpc.workflows.getMany.useQuery({ ... });

// Auth
import { auth } from "@/lib/auth";              // Server
import { authClient } from "@/lib/auth-client"; // Client
import { requireAuth } from "@/lib/auth-utils"; // Guards

// Database
import prisma from "@/lib/db";
```

### tRPC Procedures
- `baseProcedure` — Public
- `protectedProcedure` — Requires `ctx.auth`
- `premiumProcedure` — Requires `ctx.customer` (Polar subscription)

## Rules

**TypeScript**: Use `type` not `interface`. No `any` — use `unknown`.

**Components**:
- Pages (`app/**/page.tsx`): `export default function PageName()`
- All others: `export const Component = () => { }`
- Never `React.FC`
- UI NEVER accesses DB

**Files**:
- kebab-case always (`workflow-builder.tsx`, `use-auth.ts`)
- Never use barrel files (`index.ts`)

**React**: Server Components default. Add `'use client'` only when needed.

**Styling**: Tailwind utilities + `cn()` from `@/lib/utils`

**architectural Principles**:
- UI → API → DB
- Prisma ONLY used in API layer
- Workflow logic is framework-agnostic

**Coding Style**:
- Explicit naming > clever abstractions
- Copy existing patterns
- One responsibility per file
- Files < 200 LOC

**Forbidden**:
- New global abstractions
- Implicit side-effects
- Architectural changes without instruction

## File Discovery

| To find | Pattern |
|---------|---------|
| Feature module | `src/modules/{name}/` |
| tRPC router | `src/modules/{name}/server/routers.ts` |
| Service logic | `src/modules/{name}/server/service.ts` |
| Schemas | `src/modules/{name}/server/schemas.ts` |
| Feature hooks | `src/modules/{name}/hooks/use-*.ts` |
| UI components | `src/modules/{name}/components/**/*.tsx` |
| Shared components | `src/modules/shared/components/` |
| shadcn primitives | `src/components/ui/*.tsx` |
| App pages | `src/app/**/page.tsx` |
| API routes | `src/app/api/**/route.ts` |
