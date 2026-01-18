# Nodebase Agents

Nodebase is a workflow automation platform (n8n clone) built with Next.js, tRPC, and Inngest.

## Quick Reference
- **Package manager**: Bun (not npm)
- **Linter**: Biome (not ESLint)
- **Types**: Use `type` not `interface`

## Shared Context
- [Domain Glossary](docs/domain-glossary.md) — Workflow, Node, Trigger, Execution, etc.

## Specialized Agents

| Agent | When to Use |
|-------|-------------|
| [frontend-engineer](agents/frontend-engineer.md) | UI components, styling, interactive features |
| [software-architect](agents/software-architect.md) | System design, architectural decisions, ADRs |
| [code-documenter](agents/code-documenter.md) | TSDoc comments, API documentation |

## Cross-Cutting Rules
1. **Server Components by default** — only add `'use client'` when you need interactivity
2. **tRPC for all API calls** — never use raw fetch for internal APIs
3. **Inngest for background work** — never do heavy processing in request handlers
