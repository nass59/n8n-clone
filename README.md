# Nodebase

A modern, production-ready Next.js starter with authentication, database, API layer, background jobs, and AI integrations. Built for developers who want to ship fast without compromising on architecture.

## ✨ Features

- 🔐 **Authentication** - Email/password auth with [Better Auth](https://better-auth.com)
- 🗄️ **Database** - PostgreSQL with [Prisma](https://prisma.io) ORM and Neon adapter
- 🔌 **Type-Safe API** - End-to-end type safety with [tRPC](https://trpc.io)
- ⚡ **Background Jobs** - Reliable job processing with [Inngest](https://inngest.com)
- 🤖 **AI Ready** - Multi-provider AI SDK (OpenAI, Anthropic, Google)
- 🎨 **Modern UI** - [shadcn/ui](https://ui.shadcn.com) with Tailwind CSS 4
- 📝 **Type Safety** - Strict TypeScript with comprehensive type checking
- 🧹 **Code Quality** - Biome linter with Ultracite preset

## 🛠️ Tech Stack

| Category           | Technology                                         |
| ------------------ | -------------------------------------------------- |
| Framework          | **Next.js 16+** (App Router, React Server Components) |
| Language           | **TypeScript 5.9+** (strict mode)                  |
| Database           | **PostgreSQL** with Prisma ORM                     |
| Authentication     | **Better Auth**                                    |
| API Layer          | **tRPC**                                           |
| Background Jobs    | **Inngest**                                        |
| AI Integration     | **Vercel AI SDK** (OpenAI, Anthropic, Google)      |
| Styling            | **Tailwind CSS 4**                                 |
| UI Components      | **shadcn/ui** (Base UI + base-vega style)          |
| Icons              | **Tabler Icons**                                   |
| Linting/Formatting | **Biome** with Ultracite preset                    |
| Package Manager    | **Bun**                                            |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── api/               # API routes (auth, tRPC, Inngest)
│   ├── globals.css        # Global styles & Tailwind
│   └── layout.tsx         # Root layout
├── components/
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── inngest/              # Inngest functions & client
├── lib/                  # Utilities & shared logic
├── modules/              # Feature modules
├── trpc/                 # tRPC setup & routers
└── generated/            # Generated code (Prisma client)

prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migrations
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.2.15+)
- PostgreSQL database (local or hosted like [Neon](https://neon.tech))

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd nodebase
```

2. **Install dependencies**

```bash
bun install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nodebase"

# Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# AI Providers (optional)
ANTHROPIC_API_KEY="your-anthropic-key"
OPENAI_API_KEY="your-openai-key"
GOOGLE_GENERATIVE_AI_API_KEY="your-google-key"

# Inngest (optional for local dev)
INNGEST_EVENT_KEY="your-inngest-key"
INNGEST_SIGNING_KEY="your-signing-key"
```

4. **Set up the database**

```bash
# Generate Prisma client
bunx prisma generate

# Run migrations
bunx prisma migrate dev
```

5. **Start the development server**

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### Development with All Services

To run all services (Next.js, Inngest) concurrently:

```bash
bun run dev:all
```

This uses `mprocs` to manage multiple processes.

## 📝 Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `bun run dev`       | Start Next.js development server         |
| `bun run dev:all`   | Start all services (Next.js + Inngest)   |
| `bun run build`     | Build for production                     |
| `bun run start`     | Start production server                  |
| `bun run lint`      | Check code with Biome                    |
| `bun run format`    | Format code with Biome                   |
| `bun run inngest:dev` | Start Inngest dev server               |

## 🔑 Key Features Explained

### Authentication

Built with **Better Auth**, providing:
- Email/password authentication
- Session management
- Auto sign-in after registration
- Prisma adapter for database integration

Routes:
- `/login` - User login
- `/signup` - User registration
- `/logout` - User logout

### Database & ORM

**Prisma** setup with:
- PostgreSQL database
- Neon serverless adapter
- Type-safe database client
- Migration system

Models:
- `User` - User accounts
- `Session` - User sessions
- `Account` - OAuth accounts
- `Verification` - Email verification
- `Workflow` - Workflow definitions

### API Layer (tRPC)

Type-safe API with:
- Full type inference from server to client
- React Query integration
- Server and client wrappers
- Modular router structure

### Background Jobs (Inngest)

Reliable job processing with:
- Event-driven architecture
- Step functions with AI wrapping
- Retry logic and error handling
- Local development UI

### AI Integration

Multi-provider AI support:
- OpenAI (GPT models)
- Anthropic (Claude models)
- Google (Gemini models)
- Unified Vercel AI SDK interface

### UI Components

**shadcn/ui** with:
- 40+ accessible components
- Customizable with Tailwind
- Base UI primitives
- Dark mode support

## 🎨 Code Conventions

### TypeScript

- **Always use `type` over `interface`**
- Strict mode enabled
- No `any` types (use `unknown`)
- Named exports for components and utilities

### React & Next.js

- **Server Components by default**
- Add `'use client'` only when necessary
- Function declarations for pages
- Arrow functions for components

```typescript
// Page (function declaration)
export default function HomePage() {
  return <main>...</main>
}

// Component (arrow function with export const)
export const Card = ({ title }: CardProps) => {
  return <div>{title}</div>
}
```

### File Naming

- Use **kebab-case**: `user-profile.tsx`, `use-auth.ts`
- Component files match component name
- Avoid index files

### Imports

- Use path aliases: `@/components`, `@/lib`, `@/hooks`
- Group imports: React → External → Internal → Types

## 🧪 Development Tips

### Adding UI Components

```bash
bunx shadcn@latest add [component-name]
```

### Database Changes

```bash
# Create migration
bunx prisma migrate dev --name your-migration-name

# Generate client
bunx prisma generate

# Open Prisma Studio
bunx prisma studio
```

### Testing Inngest Functions

1. Start Inngest dev server: `bun run inngest:dev`
2. Visit [http://localhost:8288](http://localhost:8288)
3. Trigger events from the UI

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Docs](https://better-auth.com/docs)
- [Prisma Docs](https://prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Inngest Documentation](https://inngest.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Fly.io
- AWS Amplify

Make sure to:
1. Set all environment variables
2. Configure the database connection
3. Run migrations in production

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
