# Data Models

> Generated: 2026-01-18 | Project: nodebase

## Overview

Nodebase uses **PostgreSQL** with **Prisma ORM** and the **Neon serverless adapter**. The schema is defined in `prisma/schema.prisma`.

## Database Configuration

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

**Key Points:**
- Prisma client is generated to `src/generated/prisma`
- Uses Neon adapter for serverless PostgreSQL connections
- Singleton pattern prevents connection exhaustion during hot reload

---

## Models

### User

Core user account model.

```prisma
model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  sessions      Session[]
  accounts      Account[]
  workflows     Workflow[]
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | String | PK | Unique identifier |
| `name` | String | Required | User's display name |
| `email` | String | Unique | Email address |
| `emailVerified` | Boolean | Default: false | Email verification status |
| `image` | String | Optional | Profile image URL |
| `createdAt` | DateTime | Auto | Creation timestamp |
| `updatedAt` | DateTime | Auto | Last update timestamp |

**Relations:**
- One-to-many with `Session`
- One-to-many with `Account`
- One-to-many with `Workflow`

---

### Session

User authentication sessions (Better Auth managed).

```prisma
model Session {
  id        String   @id
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | String | PK | Session identifier |
| `expiresAt` | DateTime | Required | Session expiration time |
| `token` | String | Unique | Session token |
| `ipAddress` | String | Optional | Client IP address |
| `userAgent` | String | Optional | Client user agent |
| `userId` | String | FK | Reference to User |

**Indexes:**
- `userId` for efficient user session lookups

**Cascade Behavior:**
- Deleting a user cascades to delete all sessions

---

### Account

OAuth provider accounts linked to users.

```prisma
model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@index([userId])
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | String | PK | Account identifier |
| `accountId` | String | Required | Provider-specific account ID |
| `providerId` | String | Required | OAuth provider (google, github) |
| `userId` | String | FK | Reference to User |
| `accessToken` | String | Optional | OAuth access token |
| `refreshToken` | String | Optional | OAuth refresh token |
| `password` | String | Optional | Hashed password (email auth) |

**Supported Providers:**
- `credentials` (email/password)
- `google`
- `github`

---

### Verification

Email verification and password reset tokens.

```prisma
model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier])
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | String | PK | Verification identifier |
| `identifier` | String | Indexed | Email or other identifier |
| `value` | String | Required | Verification token |
| `expiresAt` | DateTime | Required | Token expiration |

---

### Workflow

Core business entity for workflow definitions.

```prisma
model Workflow {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | String | PK, cuid() | Workflow identifier |
| `name` | String | Required | Workflow name |
| `userId` | String | FK | Owner reference |
| `createdAt` | DateTime | Auto | Creation timestamp |
| `updatedAt` | DateTime | Auto | Last update timestamp |

**Cascade Behavior:**
- Deleting a user cascades to delete all workflows

---

## Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
├─────────────────┤
│ id: String PK   │
│ name: String    │
│ email: String   │──────┬──────────┐
│ emailVerified   │      │          │
│ image: String?  │      │          │
│ createdAt       │      │          │
│ updatedAt       │      │          │
└─────────────────┘      │          │
         │               │          │
         │ 1:N           │ 1:N      │ 1:N
         ▼               ▼          ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│    Session    │ │    Account    │ │   Workflow    │
├───────────────┤ ├───────────────┤ ├───────────────┤
│ id: String PK │ │ id: String PK │ │ id: String PK │
│ token: String │ │ accountId     │ │ name: String  │
│ expiresAt     │ │ providerId    │ │ userId: FK    │
│ userId: FK    │ │ userId: FK    │ │ createdAt     │
│ ipAddress?    │ │ accessToken?  │ │ updatedAt     │
│ userAgent?    │ │ refreshToken? │ └───────────────┘
└───────────────┘ │ password?     │
                  └───────────────┘

┌───────────────┐
│ Verification  │
├───────────────┤
│ id: String PK │
│ identifier    │
│ value         │
│ expiresAt     │
└───────────────┘
```

---

## Common Queries

### User with Sessions

```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { sessions: true }
});
```

### User's Workflows (Paginated)

```typescript
const workflows = await prisma.workflow.findMany({
  where: { userId },
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { updatedAt: "desc" }
});
```

### Workflow Count

```typescript
const count = await prisma.workflow.count({
  where: { userId }
});
```

### Search Workflows

```typescript
const workflows = await prisma.workflow.findMany({
  where: {
    userId,
    name: { contains: search, mode: "insensitive" }
  }
});
```

---

## Migration Commands

```bash
# Create new migration
bunx prisma migrate dev --name <migration-name>

# Apply migrations (development)
bunx prisma migrate dev

# Apply migrations (production)
bunx prisma migrate deploy

# Reset database (WARNING: destroys data)
bunx prisma migrate reset

# Generate Prisma client
bunx prisma generate

# Open Prisma Studio
bunx prisma studio
```

---

## Future Schema Extensions

The workflow automation platform will likely need:

```prisma
// Workflow nodes/steps
model WorkflowNode {
  id         String   @id @default(cuid())
  workflowId String
  workflow   Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)
  type       String   // trigger, action, condition
  config     Json
  position   Json     // x, y coordinates
  // ... connections to other nodes
}

// Workflow executions
model Execution {
  id         String   @id @default(cuid())
  workflowId String
  workflow   Workflow @relation(...)
  status     String   // pending, running, completed, failed
  startedAt  DateTime
  endedAt    DateTime?
  logs       Json
}

// Credentials for integrations
model Credential {
  id        String @id @default(cuid())
  userId    String
  user      User   @relation(...)
  name      String
  type      String // api_key, oauth, etc.
  data      Json   // encrypted
}
```
