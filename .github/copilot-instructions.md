# Copilot Instructions for Dev Playground

## Project Overview

This is an **experimental developer playground** that combines:

- A blog for sharing thoughts and learnings
- Interactive demos (CSS experiments, TypeScript utilities, UI components)
- A modular, scalable architecture for experimentation

---

## Tech Stack

| Category           | Technology                                   |
| ------------------ | -------------------------------------------- |
| Framework          | **Next.js 16+** (App Router, RSC)            |
| Language           | **TypeScript 5.9+** (strict mode)            |
| Styling            | **Tailwind CSS 4**                           |
| UI Components      | **shadcn/ui** with Base UI (base-vega style) |
| Icons              | **Tabler Icons** (`@tabler/icons-react`)     |
| Linting/Formatting | **Biome** with **Ultracite** preset          |
| Package Manager    | **Bun**                                      |

---

## Code Style & Conventions

### TypeScript

- **Always prefer `type` over `interface`** for type definitions
- Use strict TypeScript — no `any` types unless absolutely necessary
- Prefer `unknown` over `any` when type is truly unknown
- Use `satisfies` operator for type-safe object literals
- Export types explicitly: `export type { MyType }`

```typescript
// ✅ Preferred
type ButtonProps = {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

// ❌ Avoid
interface ButtonProps {
  variant: string;
  size?: string;
  children: React.ReactNode;
}
```

### React & Next.js

- Use **Server Components** by default (no `'use client'` unless necessary)
- Add `'use client'` directive only for components that need interactivity
- Prefer **async components** for data fetching in Server Components
- Use the **App Router** patterns (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)
- Colocate related files (component, types, utils) when it makes sense

```typescript
// ✅ Server Component - Page (function declaration)
export default async function BlogPostPage({ params }: BlogPostProps) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}

// ✅ Client Component (arrow function with export const)
("use client");

import { useState } from "react";

export const InteractiveDemo = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
};
```

### Component & Export Patterns

- **Pages**: Use `export function` (function declarations) for page components
- **Everything else**: Use `export const` with arrow functions for components, utilities, hooks
- Destructure props in function signature
- Keep components focused and single-responsibility
- Extract hooks into `@/hooks` when reusable

```typescript
// ✅ Page Component (app/blog/page.tsx)
export function BlogPage() {
  return <main>...</main>
}

// ✅ Regular Component
export const ProjectCard = ({ title, description, href }: ProjectCardProps) => {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  )
}

// ✅ Utility function
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString()
}

// ✅ Custom hook
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // ...
}

// ❌ Avoid for pages
const BlogPage = () => { ... }
export default BlogPage

// ❌ Avoid React.FC
const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  return <Card>...</Card>
}
```

### File & Folder Naming

- Use **kebab-case** for all files and folders: `project-card.tsx`, `use-local-storage.ts`
- Component files should match component name: `ProjectCard` → `project-card.tsx`
- Index files are discouraged — prefer explicit imports

### Imports

- Use **path aliases**: `@/components`, `@/lib`, `@/hooks`
- Group imports: React → External → Internal → Types → Styles
- Use named exports for components, types, and utilities

```typescript
import { useState, useEffect } from "react";

import { IconArrowRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectCardProps } from "./types";
```

---

## Styling Guidelines

### Tailwind CSS 4

- Use Tailwind utility classes directly in JSX
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Prefer CSS variables for theming (defined in `globals.css`)
- Use `tw-animate-css` for animations

```typescript
import { cn } from "@/lib/utils";

export function Card({ className, variant }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm",
        variant === "featured" && "border-primary",
        className
      )}
    />
  );
}
```

### shadcn/ui Components

- Import from `@/components/ui/*`
- Customize via CSS variables, not by modifying component internals
- Use `class-variance-authority` (cva) for component variants
- Follow the base-vega style system

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/           # Route groups
│   ├── api/                # API routes
│   ├── globals.css         # Global styles & Tailwind
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   └── [feature]/          # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & helpers
│   └── utils.ts            # cn() and shared utilities
├── types/                  # Shared type definitions
└── content/                # MDX/content files (if applicable)
```

---

## Biome & Ultracite

This project uses **Biome** with the **Ultracite** preset for linting and formatting.

### Commands

```bash
# Check for issues
bun run lint

# Auto-fix and format
bun run format
```

### Key Rules

- No namespace imports (use named imports)
- No magic numbers in complex logic
- Prefer `for...of` loops
- Console statements are allowed (development playground)
- React Server Components rules enabled

---

## Best Practices

### Performance

- Leverage React Server Components for static content
- Use `next/image` for optimized images
- Implement proper loading states with `loading.tsx`
- Use `Suspense` boundaries strategically

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes when needed
- Ensure keyboard navigation works
- Maintain sufficient color contrast

### Error Handling

- Use `error.tsx` for route-level error boundaries
- Implement proper error states in forms
- Log errors appropriately in development

### Testing (Future)

- Component tests with Vitest + Testing Library
- E2E tests with Playwright
- Type checking as a form of testing

---

## Common Patterns

### Async Data Fetching (Server Component)

```typescript
type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}
```

### Client-Side State

```typescript
"use client";

import { useState, useCallback } from "react";

export const DemoPlayground = () => {
  const [code, setCode] = useState("");

  const handleExecute = useCallback(() => {
    // Execute demo logic
  }, [code]);

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <Button onClick={handleExecute}>Run</Button>
    </div>
  );
};
```

### Form Components

```typescript
"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Process form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Email">
        <Input type="email" name="email" required />
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

---

## Playground-Specific Conventions

### Interactive Demos

- Wrap demos in a consistent container component
- Include source code display option
- Support live editing where possible
- Document demo purpose and API

### Blog Content

- Use MDX for rich content (if implemented)
- Include metadata (date, tags, reading time)
- Support syntax highlighting for code blocks

### Component Showcases

- Create isolated examples for each component
- Show multiple variants and states
- Include copy-to-clipboard for code

---

## Do's and Don'ts

### ✅ Do

- Use Server Components by default
- Prefer `type` over `interface`
- Use path aliases (`@/`)
- Write self-documenting code
- Keep components small and focused
- Use Tailwind utilities with `cn()`

### ❌ Don't

- Use `any` type without justification
- Create deeply nested component trees
- Mix concerns in a single component
- Use inline styles (prefer Tailwind)
- Ignore TypeScript errors
- Skip accessibility considerations

---

## Quick Reference

| Task             | Command/Pattern                      |
| ---------------- | ------------------------------------ |
| New component    | `src/components/my-component.tsx`    |
| New page         | `src/app/my-page/page.tsx`           |
| Add UI component | `bunx shadcn@latest add [component]` |
| Lint             | `bun run lint`                       |
| Format           | `bun run format`                     |
| Dev server       | `bun run dev`                        |
| Build            | `bun run build`                      |
| Start (prod)     | `bun run start`                      |
