# Nodebase Documentation

> **Generated:** 2026-01-18 | **Type:** Next.js 16+ Full-Stack Web Application | **Scan:** Deep

## Project Overview

**Nodebase** is a workflow automation platform (n8n clone) built with Next.js 16+, combining AI capabilities with business process automation.

| Aspect | Value |
|--------|-------|
| **Type** | Monolith (single codebase) |
| **Framework** | Next.js 16+ (App Router, RSC) |
| **Language** | TypeScript 5.9+ (strict mode) |
| **Database** | PostgreSQL (Prisma + Neon) |
| **Auth** | Better Auth |
| **Payments** | Polar |

---

## Quick Reference

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React 19, Tailwind CSS 4, shadcn/ui |
| Backend | tRPC, Better Auth, Inngest |
| Database | PostgreSQL, Prisma 7.2, Neon adapter |
| AI | Vercel AI SDK (OpenAI, Anthropic, Google) |
| DevOps | Bun, Biome, Sentry |

### Key Entry Points

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout |
| `src/lib/auth.ts` | Auth configuration |
| `src/lib/db.ts` | Database client |
| `src/trpc/init.ts` | API procedures |
| `prisma/schema.prisma` | Database schema |

### Commands

```bash
bun run dev          # Start dev server
bun run dev:all      # Start all services
bun run lint         # Check code
bunx prisma studio   # Database GUI
```

---

## Generated Documentation

### Core Documents

| Document | Description |
|----------|-------------|
| [Project Overview](./project-overview.md) | Executive summary & highlights |
| [Architecture](./architecture.md) | System design, patterns, data flow |
| [Source Tree Analysis](./source-tree-analysis.md) | Directory structure & organization |

### Technical Reference

| Document | Description |
|----------|-------------|
| [API Contracts](./api-contracts.md) | tRPC procedures & HTTP endpoints |
| [Data Models](./data-models.md) | Database schema & relationships |
| [Component Inventory](./component-inventory.md) | UI components (51 shadcn + custom) |

### Development

| Document | Description |
|----------|-------------|
| [Development Guide](./development-guide.md) | Setup, workflows, debugging |

---

## Existing Documentation

| Document | Location | Description |
|----------|----------|-------------|
| [README](../README.md) | `/README.md` | Project overview, features, quick start |
| [Claude Instructions](../CLAUDE.md) | `/CLAUDE.md` | Claude Code guidance |
| [Copilot Instructions](../.github/copilot-instructions.md) | `/.github/` | AI assistant conventions |

---

## Getting Started

### For New Developers

1. Read [Project Overview](./project-overview.md)
2. Follow [Development Guide](./development-guide.md) setup
3. Explore [Architecture](./architecture.md)

### For AI Assistants

1. Start with [Architecture](./architecture.md) for system understanding
2. Reference [API Contracts](./api-contracts.md) for data operations
3. Check [Component Inventory](./component-inventory.md) for UI work
4. Follow conventions in [CLAUDE.md](../CLAUDE.md)

### Adding Features

1. Define schema in `prisma/schema.prisma`
2. Create tRPC router in `src/modules/<feature>/server/`
3. Build UI in `src/app/` or `src/modules/<feature>/components/`
4. See [Development Guide](./development-guide.md) for details

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   (auth)    │  │ (dashboard) │  │    /api     │     │
│  │ login/signup│  │  workflows  │  │ auth/trpc/  │     │
│  └─────────────┘  └─────────────┘  │  inngest    │     │
└─────────────────────────────────────┴─────────────┴─────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
   ┌────────────┐  ┌────────────┐  ┌────────────┐
   │Better Auth │  │   tRPC     │  │  Inngest   │
   │  Sessions  │  │ Procedures │  │   Jobs     │
   └────────────┘  └────────────┘  └────────────┘
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                   ┌────────────┐
                   │   Prisma   │
                   │ (Neon DB)  │
                   └────────────┘
```

---

## Data Models

| Model | Purpose | Key Relations |
|-------|---------|---------------|
| User | User accounts | → Sessions, Workflows |
| Session | Auth sessions | → User |
| Account | OAuth accounts | → User |
| Verification | Email tokens | - |
| Workflow | Core entity | → User |

---

## API Overview

| Router | Procedures | Auth Level |
|--------|------------|------------|
| `workflows` | create, remove, updateName, getOne, getMany | Protected/Premium |

---

## Feature Modules

| Module | Location | Purpose |
|--------|----------|---------|
| auth | `src/modules/auth/` | Authentication UI & logic |
| workflows | `src/modules/workflows/` | Workflow management |
| subscriptions | `src/modules/subscriptions/` | Polar integration |

---

## AI-Assisted Development Notes

When using AI assistants with this codebase:

1. **Type Safety**: All types flow from Prisma → tRPC → React. Trust the types.
2. **Server vs Client**: Default to Server Components. Add `'use client'` only for interactivity.
3. **Code Style**: Use `type` (not `interface`), `export const` for components, kebab-case files.
4. **Auth Pattern**: Use `protectedProcedure` for user-only, `premiumProcedure` for subscribers.
5. **Data Fetching**: Use tRPC with React Query. Prefetch in Server Components when possible.

---

*Documentation generated by BMad Method document-project workflow.*
