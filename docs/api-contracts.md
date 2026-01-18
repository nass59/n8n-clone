# API Contracts

> Generated: 2026-01-18 | Project: nodebase

## Overview

Nodebase uses **tRPC** for type-safe API communication. All procedures are accessible via `/api/trpc/[trpc]`.

## Authentication Levels

| Level | Procedure | Description |
|-------|-----------|-------------|
| Public | `baseProcedure` | No authentication required |
| Protected | `protectedProcedure` | Valid session required (`ctx.auth`) |
| Premium | `premiumProcedure` | Active Polar subscription required (`ctx.customer`) |

## Routers

### Workflows Router (`workflows.*`)

Base path: `workflows`

#### `workflows.create`

Create a new workflow with a random slug name.

| Property | Value |
|----------|-------|
| Type | Mutation |
| Auth | Premium |
| Input | None |

**Response:**
```typescript
type Workflow = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Usage (Server Component):**
```typescript
import { caller } from "@/trpc/server";
const workflow = await caller.workflows.create();
```

**Usage (Client Component):**
```typescript
const utils = trpc.useUtils();
const create = trpc.workflows.create.useMutation({
  onSuccess: () => utils.workflows.getMany.invalidate(),
});
await create.mutateAsync();
```

---

#### `workflows.remove`

Delete a workflow by ID (user-scoped).

| Property | Value |
|----------|-------|
| Type | Mutation |
| Auth | Protected |
| Input | `{ id: string }` |

**Input Schema:**
```typescript
z.object({ id: z.string() })
```

**Response:**
```typescript
type Workflow = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Usage:**
```typescript
const remove = trpc.workflows.remove.useMutation();
await remove.mutateAsync({ id: "workflow-id" });
```

---

#### `workflows.updateName`

Update a workflow's name.

| Property | Value |
|----------|-------|
| Type | Mutation |
| Auth | Protected |
| Input | `{ id: string, name: string }` |

**Input Schema:**
```typescript
z.object({
  id: z.string(),
  name: z.string().min(1)
})
```

**Response:**
```typescript
type Workflow = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Usage:**
```typescript
const update = trpc.workflows.updateName.useMutation();
await update.mutateAsync({ id: "workflow-id", name: "New Name" });
```

---

#### `workflows.getOne`

Get a single workflow by ID (user-scoped).

| Property | Value |
|----------|-------|
| Type | Query |
| Auth | Protected |
| Input | `{ id: string }` |

**Input Schema:**
```typescript
z.object({ id: z.string() })
```

**Response:**
```typescript
type Workflow | null = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} | null
```

**Usage (Server Component):**
```typescript
const workflow = await caller.workflows.getOne({ id: params.workflowId });
```

**Usage (Client Component):**
```typescript
const { data: workflow } = trpc.workflows.getOne.useQuery({ id: workflowId });
```

---

#### `workflows.getMany`

Get paginated list of workflows with search.

| Property | Value |
|----------|-------|
| Type | Query |
| Auth | Protected |
| Input | `{ page, pageSize, search }` |

**Input Schema:**
```typescript
z.object({
  page: z.number().default(1),
  pageSize: z.number().min(1).max(100).default(10),
  search: z.string().default("")
})
```

**Response:**
```typescript
type PaginatedWorkflows = {
  items: Workflow[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

**Usage (Server Component):**
```typescript
const { items, totalPages } = await caller.workflows.getMany({
  page: 1,
  pageSize: 10,
  search: ""
});
```

**Usage (Client Component):**
```typescript
const { data } = trpc.workflows.getMany.useQuery({
  page: 1,
  pageSize: 10,
  search: searchTerm
});
```

**Usage with Prefetch:**
```typescript
// In Server Component
import { prefetch, HydrateClient, trpc } from "@/trpc/server";

prefetch(trpc.workflows.getMany.queryOptions({
  page: 1,
  pageSize: 10,
  search: ""
}));

return (
  <HydrateClient>
    <WorkflowsList />
  </HydrateClient>
);
```

---

## HTTP Endpoints

### `/api/auth/[...all]`

Better Auth catch-all handler for authentication operations.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-in/email` | POST | Email/password login |
| `/api/auth/sign-up/email` | POST | Email/password registration |
| `/api/auth/sign-out` | POST | Sign out |
| `/api/auth/session` | GET | Get current session |
| `/api/auth/callback/*` | GET | OAuth callbacks |

### `/api/inngest`

Inngest webhook handler for background job execution.

| Method | Description |
|--------|-------------|
| POST | Receive Inngest events |
| PUT | Serve function definitions |

### `/api/trpc/[trpc]`

tRPC HTTP handler.

| Method | Description |
|--------|-------------|
| GET | Query procedures |
| POST | Mutation procedures |

---

## Error Handling

### tRPC Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | No valid session |
| `FORBIDDEN` | 403 | No active subscription |
| `NOT_FOUND` | 404 | Resource not found |
| `BAD_REQUEST` | 400 | Invalid input |
| `INTERNAL_SERVER_ERROR` | 500 | Server error |

### Example Error Response

```typescript
{
  error: {
    code: "UNAUTHORIZED",
    message: "Unauthorized"
  }
}
```

---

## Client Configuration

### Server Components

```typescript
import { caller } from "@/trpc/server";

// Direct procedure calls
const data = await caller.workflows.getMany({ ... });
```

### Client Components

```typescript
"use client";
import { useTRPC } from "@/trpc/client";

const trpc = useTRPC();

// Queries
const { data, isLoading } = trpc.workflows.getMany.useQuery({ ... });

// Mutations
const mutation = trpc.workflows.create.useMutation({
  onSuccess: () => {
    // Invalidate queries, show toast, etc.
  }
});
```

### Prefetching (SSR)

```typescript
import { prefetch, HydrateClient, trpc } from "@/trpc/server";

// Prefetch data on server
prefetch(trpc.workflows.getMany.queryOptions({ ... }));

// Hydrate on client
return <HydrateClient>{children}</HydrateClient>;
```
