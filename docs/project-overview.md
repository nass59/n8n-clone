# Project Overview

> Generated: 2026-01-18 | Project: nodebase

## What is Nodebase?

**Nodebase** is a **workflow automation platform** (n8n clone) that combines AI capabilities with business process automation. It provides technical teams the flexibility of code with the speed of no-code.

## Core Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🔐 Authentication | ✅ Implemented | Email/password with Better Auth |
| 💳 Subscriptions | ✅ Implemented | Polar integration for payments |
| 📋 Workflows | 🚧 Basic | CRUD operations for workflows |
| 🤖 AI Integration | 🚧 Basic | Multi-provider AI SDK ready |
| ⚡ Background Jobs | ✅ Implemented | Inngest for durable execution |
| 🎨 UI System | ✅ Implemented | shadcn/ui component library |

## Technical Summary

| Aspect | Technology |
|--------|------------|
| **Type** | Full-stack monolith |
| **Framework** | Next.js 16+ (App Router) |
| **Language** | TypeScript (strict mode) |
| **Database** | PostgreSQL (Neon serverless) |
| **API Layer** | tRPC (type-safe) |
| **Auth** | Better Auth |
| **Payments** | Polar |
| **Background Jobs** | Inngest |
| **AI** | Vercel AI SDK |
| **UI** | shadcn/ui + Tailwind CSS 4 |

## Repository Structure

```
nodebase/
├── src/
│   ├── app/           # Next.js App Router (pages, layouts, API)
│   ├── components/    # UI components (shadcn/ui)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Core utilities (auth, db, etc.)
│   ├── modules/       # Feature modules (auth, workflows, subscriptions)
│   ├── trpc/          # tRPC API layer
│   └── inngest/       # Background job functions
├── prisma/            # Database schema & migrations
├── public/            # Static assets
└── docs/              # This documentation
```

## Architecture Highlights

### Type Safety End-to-End

```
TypeScript Strict → Prisma Types → tRPC Inference → React Components
```

Every layer shares types, eliminating runtime type errors.

### Authentication Hierarchy

```
baseProcedure        → Public access
protectedProcedure   → Authenticated users
premiumProcedure     → Paying subscribers
```

### Serverless Ready

- **Neon adapter** for PostgreSQL (HTTP-based, edge-compatible)
- **Inngest** for durable background jobs
- **Vercel** optimized deployment

## Quick Start

```bash
# Install
bun install

# Setup database
bunx prisma migrate dev

# Start development
bun run dev
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/auth.ts` | Authentication configuration |
| `src/lib/db.ts` | Database client |
| `src/trpc/init.ts` | API procedure definitions |
| `prisma/schema.prisma` | Database schema |

## Documentation Index

- [Architecture](./architecture.md) - System design & patterns
- [Source Tree](./source-tree-analysis.md) - Codebase structure
- [API Contracts](./api-contracts.md) - tRPC procedures
- [Data Models](./data-models.md) - Database schema
- [Components](./component-inventory.md) - UI library
- [Development Guide](./development-guide.md) - Setup & workflows

## AI-Assisted Development

This documentation is optimized for AI assistants. Key entry points:

1. **Understanding the codebase**: Start with [Architecture](./architecture.md)
2. **Adding features**: See [Development Guide](./development-guide.md)
3. **API work**: Reference [API Contracts](./api-contracts.md)
4. **Database changes**: Check [Data Models](./data-models.md)

## Existing Documentation

The project also includes:

- `/README.md` - Project overview & quick start
- `/CLAUDE.md` - Claude Code instructions
- `/.github/copilot-instructions.md` - AI assistant guide
