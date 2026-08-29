# SOPs Index

> **Purpose**: Standard Operating Procedures — step-by-step guides for recurring tasks
> **Scope**: 100% agnostic (reusable across all projects and disciplines)
> **Updated**: 2026-04-09

---

## What are SOPs?

**SOPs (Standard Operating Procedures)** are step-by-step procedural guides for tasks that:
- Are performed repeatedly across projects
- Require consistent execution
- Benefit from a documented checklist

### SOPs vs Other Documentation

| Layer | Purpose | Format |
|-------|---------|--------|
| **Rules** | WHEN/WHERE — routing | Quick DO/DON'T |
| **Patterns** | HOW — implementation | Code examples |
| **SOPs** | STEP-BY-STEP — procedures | Numbered steps, checklists |

---

## SOP Inventory

### The Sovereign Delivery Lifecycle — consolidated in `methodology/` (F5, 2026-07-06)

End-to-end governance from business need to production release. Every SOP is a reference file (always loaded) with on-demand detail sub-SOPs.

| # | SOP | Phase | Owner | Location |
|---|-----|-------|-------|----------|

> **Nota local**: en este repo la cadena está recortada a **SBD → SCI → SCD → SCG**
> (`../../methodology/`). Los eslabones SDP · SQP · SRO no se trajeron.

Handoffs are explicit — each SOP declares exit criteria that become the next SOP's input.

```
Business need → SCI → SCD → SCG → (entrega, QA y release fuera de este repo)
    (commercial)  (dev)  (dev) (dev)  (qa)  (sre)
```

Deep-dive sub-SOPs under each SOP's subfolder (loaded on demand).

#### Legacy deep references (long-form companions to the trilogy)

These are the exhaustive originals. The trilogy orchestrators above are the day-to-day entry points; reach for these when you need the full checklist.

| SOP | Purpose |
|-----|---------|
| [`methodology/development/SCD.md`](../../methodology/development/SCD.md) | SCD — diseño de contexto antes de escribir código |
| [`methodology/development/SCG.md`](../../methodology/development/SCG.md) | SCG — ejecución gobernada del código |

### Development Workflow

| SOP | Purpose |
|-----|---------|
| [api-testing.md](api-testing.md) | Test APIs with curl |
| [pr-documentation.md](pr-documentation.md) | PR creation workflow (title, description, reviewers) |
| [feature-delivery-workflow.md](feature-delivery-workflow.md) | End-to-end: ticket → code → PR → review |
| [branch-merge-strategy.md](branch-merge-strategy.md) | Branch hierarchy, sacrifice-branch pattern, conflict resolution for shared branches |
| [typescript-verification-protocol.md](typescript-verification-protocol.md) | TypeScript --project flag, JS/TS error triage, build system verification |

### Sovereignty System

| SOP | Purpose |
|-----|---------|

### Tooling & Integrations (MCP)

| SOP | Purpose |
|-----|---------|
| [mcp-setup.md](mcp-setup.md) | MCP server setup, auth, troubleshooting |
| [mcp-context7.md](mcp-context7.md) | Library documentation lookup via MCP |

### Infrastructure & Services

| SOP | Purpose |
|-----|---------|
| [supabase-project-setup.md](supabase-project-setup.md) | Configure new Supabase project: database, storage, credentials, Prisma connection |
| [vercel-project-setup.md](vercel-project-setup.md) | Configure Vercel project: deployment, env vars, domains, cron jobs |

### Security & Governance

| SOP | Purpose |
|-----|---------|

---

## Integration with Projects

### From sovereignty → project

SOPs live in the sovereignty repo and are synced to `.claude/patterns/core/sops/`. Projects reference them from there:

```markdown
- API Testing: `.claude/patterns/core/sops/api-testing.md`
- PR Documentation: `.claude/patterns/core/sops/pr-documentation.md`
```

### When to create project-specific SOPs

Create in `.claude/rules/sop/` when the procedure:
- Uses project-specific URLs, credentials, or configurations
- Follows project-specific workflows
- References project-specific files or structures

---

## SOP Template

```markdown
# SOP: [Task Name]

> **PURPOSE**: What this procedure accomplishes
> **SCOPE**: When/where to use this SOP
> **PREREQUISITES**: What must be true before starting
> **UPDATED**: YYYY-MM-DD

---

## 1. Prerequisites

- [ ] Prerequisite 1

## 2. Procedure

### Step 1: [Action Name]

Description + command.

**Validation**: How to verify this step succeeded.

## 3. Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|

## 4. Checklist

- [ ] Step 1 completed
- [ ] Final validation passed
```
