# Next.js Patterns

> **Module**: frontend/nextjs
> **Tech**: Next.js App Router
> **Principle**: Routing layer, delegates to Clean Architecture layers

---

## Patterns

| Pattern | Purpose |
|---------|---------|
| `app-router.md` | Layouts, pages, loading, error boundaries |
| `api-routes.md` | Route handlers, request/response |
| `middleware.md` | Auth protection, redirects |
| `metadata.md` | SEO, OpenGraph |

---

## TL;DR

**Next.js = Routing glue. Business logic lives in layers.**

```
app/
├── layout.tsx           # Root layout (providers)
├── page.tsx             # Home page
├── (public)/            # Route group (no auth)
│   └── events/
│       └── page.tsx
├── (authenticated)/     # Route group (requires auth)
│   └── dashboard/
│       └── page.tsx
└── api/
    └── users/
        └── route.ts     # API endpoint
```

**API Route pattern**:
```typescript
// app/api/users/route.ts
export async function GET(request: NextRequest) {
  const result = await executeGetUsers(request);  // Use case
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await executeCreateUser(body);   // Use case
  return NextResponse.json(result, { status: 201 });
}
```

---

## Rules

1. **No business logic in routes** - Delegate to use cases
2. **'use client' when needed** - Hooks, interactivity
3. **Route groups for organization** - `(public)`, `(admin)`
4. **Middleware for auth** - Protect routes server-side

---

## When to Consult

- Creating page/layout → `app-router.md`
- Creating API endpoint → `api-routes.md`
- Protecting routes → `middleware.md`
- SEO configuration → `metadata.md`

---

**Total**: 4 patterns
