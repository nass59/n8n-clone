# Architecture Documentation

> Generated: 2026-01-18 | Project: nodebase | Type: Next.js 16+ Full-Stack Web Application

## Executive Summary

Nodebase is a **workflow automation platform** (n8n clone) built as a feature-modular full-stack Next.js application. It combines AI capabilities with business process automation, providing technical teams the flexibility of code with the speed of no-code.

**Key Characteristics:**
- Monolithic Next.js 16+ application with App Router
- Type-safe end-to-end with TypeScript strict mode + Prisma + tRPC
- Serverless-ready architecture (Neon PostgreSQL, Vercel deployment)
- Event-driven background processing with Inngest
- Multi-provider AI integration via Vercel AI SDK

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | Next.js | 16.1.3 | App Router, RSC, SSR |
| | React | 19.2.3 | UI library |
| | Tailwind CSS | 4.1.18 | Utility-first styling |
| | shadcn/ui | 3.7.0 | Component library |
| **Backend** | tRPC | 11.8.1 | Type-safe API layer |
| | Better Auth | 1.4.13 | Authentication |
| | Inngest | 3.49.3 | Background jobs |
| **Database** | PostgreSQL | - | Primary database |
| | Prisma | 7.2.0 | ORM |
| | Neon | - | Serverless adapter |
| **Payments** | Polar | 0.42.2 | Subscriptions |
| **AI** | Vercel AI SDK | 6.0.39 | Multi-provider AI |
| **DevOps** | Biome | 2.3.11 | Linting/formatting |
| | Bun | 1.2.15 | Package manager |
| | Sentry | 10.34.0 | Error tracking |

## Architecture Pattern

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js App Router                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ (auth) pages │  │(dashboard)   │  │  API routes  │          │
│  │ login/signup │  │ pages        │  │ /api/*       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│  Better Auth  │      │    tRPC       │      │   Inngest     │
│  /api/auth/*  │      │  /api/trpc/*  │      │ /api/inngest  │
└───────────────┘      └───────────────┘      └───────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                ▼
                    ┌───────────────────────┐
                    │   Prisma ORM          │
                    │   (Neon Adapter)      │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   PostgreSQL (Neon)   │
                    └───────────────────────┘
```

### Request Flow

1. **Client Request** → Next.js App Router
2. **Route Matching** → Page component or API route
3. **Authentication** → Better Auth session check
4. **Data Fetching** → tRPC procedure call
5. **Database Query** → Prisma with Neon adapter
6. **Response** → JSON or rendered HTML

### Authentication Flow

```
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────┐
│ Client  │────▶│ Better Auth │────▶│ Prisma       │────▶│   DB    │
│         │     │ Handler     │     │ Adapter      │     │         │
└─────────┘     └─────────────┘     └──────────────┘     └─────────┘
     │                │                                        │
     │                ▼                                        │
     │         Session Cookie                                  │
     │                │                                        │
     │                ▼                                        │
     │         tRPC Protected                                  │
     │         Procedure                                       │
     │                │                                        │
     │                ▼                                        │
     │         Polar Customer                                  │
     │         (Premium check)                                 │
     └─────────────────────────────────────────────────────────┘
```

## Data Architecture

### Database Schema (ERD)

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ id: String PK   │
│ name: String    │
│ email: String   │──────┐
│ emailVerified   │      │
│ image: String?  │      │
│ createdAt       │      │
│ updatedAt       │      │
└─────────────────┘      │
         │               │
         │ 1:N           │ 1:N
         ▼               ▼
┌─────────────────┐  ┌─────────────────┐
│     Session     │  │    Account      │
├─────────────────┤  ├─────────────────┤
│ id: String PK   │  │ id: String PK   │
│ token: String   │  │ accountId       │
│ expiresAt       │  │ providerId      │
│ userId: FK      │  │ userId: FK      │
│ ipAddress?      │  │ accessToken?    │
│ userAgent?      │  │ refreshToken?   │
└─────────────────┘  └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│    Workflow     │
├─────────────────┤
│ id: String PK   │
│ name: String    │
│ userId: FK      │
│ createdAt       │
│ updatedAt       │
└─────────────────┘
```

### Data Access Patterns

| Pattern | Implementation | Usage |
|---------|---------------|-------|
| Read-through cache | React Query via tRPC | Client-side data fetching |
| Optimistic updates | tRPC mutations | Instant UI feedback |
| Server prefetch | `prefetch()` helper | SSR data loading |
| Pagination | Cursor-based via tRPC | Large data sets |

## API Design

### tRPC Procedure Hierarchy

```typescript
baseProcedure          // No auth required
    ↓
protectedProcedure     // Requires session (ctx.auth)
    ↓
premiumProcedure       // Requires subscription (ctx.customer)
```

### API Contracts

#### Workflows Router (`workflows.*`)

| Procedure | Type | Input | Output | Auth |
|-----------|------|-------|--------|------|
| `create` | Mutation | - | `Workflow` | Premium |
| `remove` | Mutation | `{ id: string }` | `Workflow` | Protected |
| `updateName` | Mutation | `{ id, name }` | `Workflow` | Protected |
| `getOne` | Query | `{ id: string }` | `Workflow \| null` | Protected |
| `getMany` | Query | `{ page, pageSize, search }` | `PaginatedWorkflows` | Protected |

### HTTP Endpoints

| Endpoint | Handler | Purpose |
|----------|---------|---------|
| `/api/auth/[...all]` | Better Auth | Auth operations |
| `/api/trpc/[trpc]` | tRPC | API procedures |
| `/api/inngest` | Inngest | Background job webhook |

## Component Architecture

### Component Hierarchy

```
Providers (TRPCReactProvider, NuqsAdapter, Toaster)
└── RootLayout
    ├── (auth)/layout
    │   ├── LoginPage
    │   └── SignupPage
    └── (dashboard)/layout
        ├── (rest)/layout [Sidebar]
        │   ├── WorkflowsPage
        │   ├── ExecutionsPage
        │   └── CredentialsPage
        └── (editor)/layout
            └── WorkflowEditorPage
```

### State Management Strategy

| State Type | Solution | Location |
|------------|----------|----------|
| Server state | React Query (tRPC) | `TRPCReactProvider` |
| URL state | nuqs | `NuqsAdapter` |
| UI state | React useState/useReducer | Component-local |
| Auth state | Better Auth session | Cookie + context |
| Toast notifications | Sonner | `Toaster` provider |

## Background Processing

### Inngest Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Application │────▶│   Inngest   │────▶│   Worker    │
│ inngest.send│     │   Cloud     │     │  Function   │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │  AI Steps   │
                    │ (auto-retry)│
                    └─────────────┘
```

### Defined Functions

| Function ID | Event | Purpose |
|-------------|-------|---------|
| `execute-ai` | `execute/ai` | AI-powered workflow execution |

## Security Architecture

### Authentication Layers

1. **Session Management** - Better Auth with 7-day expiry
2. **Cookie Security** - HTTP-only, secure, same-site
3. **Rate Limiting** - 100 requests per 60 seconds
4. **Account Linking** - Trusted providers only (Google, GitHub)

### Authorization Model

```
Public (baseProcedure)
    ↓
Authenticated (protectedProcedure) ─── Session required
    ↓
Premium (premiumProcedure) ─── Active Polar subscription
```

## Deployment Architecture

### Recommended Stack

| Component | Service | Notes |
|-----------|---------|-------|
| Application | Vercel | Native Next.js support |
| Database | Neon | Serverless PostgreSQL |
| Background Jobs | Inngest Cloud | Managed job processing |
| Payments | Polar | Subscription management |
| Monitoring | Sentry | Error tracking |

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="https://..."

# Payments
POLAR_ACCESS_TOKEN="..."
POLAR_PRODUCT_ID="..."
POLAR_SUCCESS_URL="..."
POLAR_SERVER="sandbox|production"

# AI (optional)
ANTHROPIC_API_KEY="..."
OPENAI_API_KEY="..."
GOOGLE_GENERATIVE_AI_API_KEY="..."

# Inngest
INNGEST_EVENT_KEY="..."
INNGEST_SIGNING_KEY="..."

# Sentry
SENTRY_DSN="..."
```

## Code Conventions

### TypeScript Rules

- **Strict mode** enabled
- **`type` over `interface`** (enforced by Biome)
- **No `any`** - use `unknown` instead
- **Path aliases** - `@/` for `src/`

### Component Patterns

```typescript
// Pages: function declaration with default export
export default function WorkflowsPage() { ... }

// Components: arrow function with named export
export const WorkflowCard = ({ workflow }: Props) => { ... }
```

### File Naming

- **kebab-case** for all files
- **Component files** match component name
- **No index files** - explicit imports

## Testing Strategy

| Type | Tool | Location |
|------|------|----------|
| Unit | (TBD) | `*.test.ts` |
| Integration | (TBD) | `__tests__/` |
| E2E | (TBD) | `e2e/` |

*Note: Testing infrastructure not yet implemented.*

## Performance Considerations

1. **Server Components** - Default for data fetching, minimal client JS
2. **React Query caching** - Stale-while-revalidate for API calls
3. **Prisma query optimization** - Select only needed fields
4. **Image optimization** - Next.js Image component
5. **Bundle splitting** - Route-based code splitting

## Future Considerations

- [ ] Implement workflow builder canvas
- [ ] Add workflow execution engine
- [ ] Integrate more AI providers
- [ ] Add team/organization support
- [ ] Implement workflow versioning
- [ ] Add webhook integrations
