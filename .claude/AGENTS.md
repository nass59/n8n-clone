# Agent Routing

> Rules and conventions are in `/CLAUDE.md`. This file is for Claude-specific agent orchestration.

## Shared Context
- [Domain Glossary](../docs/domain-glossary.md) — Workflow, Node, Trigger, Execution definitions

## Agent Selection

| Task Type | Agent | Notes |
|-----------|-------|-------|
| UI components, styling, layout | `frontend-engineer` | Uses shadcn/ui patterns |
| System design, ADRs | `software-architect` | Consults existing architecture |
| TSDoc, API docs | `code-documenter` | Follows JSDoc conventions |
| Single-file quality audit | `file-efficiency-guardian` | Quick convention checks |
| tRPC routers, services | Default | Follow `modules/{name}/server/` pattern |
| Background jobs | Default | Use Inngest, see `src/inngest/` |

## Agent-Specific Docs
- [frontend-engineer.md](agents/frontend-engineer.md)
- [software-architect.md](agents/software-architect.md)
- [code-documenter.md](agents/code-documenter.md)
- [file-efficiency-guardian.md](agents/file-efficiency-guardian.md)

## Cross-Cutting Constraints
These extend CLAUDE.md rules for multi-step agent work:

1. **tRPC for all internal APIs** — never raw fetch
2. **Inngest for background work** — never heavy processing in request handlers
3. **Prisma only in API layer** — UI → tRPC → Prisma → DB
