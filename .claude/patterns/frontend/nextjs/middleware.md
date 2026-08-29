# Auth Middleware

> **Module**: frontend/nextjs
> **Patterns**: withAuthMiddleware (HOF) + validateAndGetUser (helper)

---

## TL;DR

**DO**:
- withAuthMiddleware for protected routes (HOF)
- validateAndGetUser for Use Case auth
- ROLE_HIERARCHY for permission checks
- Discriminated unions for responses
- Check isActive before granting access

**DON'T**:
- Manual token parsing (use helpers)
- Business logic in middleware
- Skip isActive check
- Expose JWT_SECRET in client

---

## Two Patterns

| Pattern | When | Where |
|---------|------|-------|
| **withAuthMiddleware** | Protect entire route | API routes |
| **validateAndGetUser** | Manual validation | Use Cases |

---

## Pattern 1: withAuthMiddleware

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withAuthMiddleware } from '@middleware';
import { executeGetUsers } from '@app-admin/domain/use-cases';
import { handleApiError } from '@helpers';
import { HTTP_STATUS } from '@constants';

export const GET = withAuthMiddleware(
  async (request: NextRequest) => {
    try {
      const result = await executeGetUsers({ request });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
      });
    } catch (error) {
      return handleApiError(error, 'GET /api/admin/users');
    }
  },
  ['admin']  // Allows admin + owner (hierarchy)
);
```

**Features**:
- Validates JWT automatically
- Checks role permissions
- Adds user headers (x-user-id, x-user-email, x-user-role)
- Returns 401/403 if fails

---

## Pattern 2: validateAndGetUser

```typescript
import { validateAndGetUser } from '@helpers';
import { USER_ROLES } from '@constants';

export const executeCreateUser = async (params) => {
  // Auth validation in Use Case
  const authResult = await validateAndGetUser(params.request, [USER_ROLES.ADMIN]);

  if (!authResult.success) {
    return authResult.error;  // 401/403 response
  }

  const currentUser = authResult.user;  // Typed user entity

  // Continue with business logic...
};
```

**Use when**:
- Mixed-access routes (optional auth)
- Need user context for RBAC checks
- Conditional authentication

---

## Role Hierarchy

```typescript
const ROLE_HIERARCHY = {
  owner: 3,       // Full access
  admin: 2,       // Content management
  participant: 1, // Basic access
};
```

| Required Role | Who Can Access |
|---------------|----------------|
| `['admin']` | admin + owner |
| `['owner']` | owner only |
| `['participant']` | all authenticated |
| `[]` | any authenticated |

---

## User Headers

After withAuthMiddleware validates:

```typescript
request.headers.get('x-user-id');     // 'user-123'
request.headers.get('x-user-email');  // 'admin@example.com'
request.headers.get('x-user-role');   // 'admin'
```

---

## Error Responses

| Status | Meaning |
|--------|---------|
| 401 | Missing/invalid token |
| 403 | Inactive user or insufficient role |
| 500 | Server misconfiguration |

---

## Decision Tree

```
Need to protect API route?
├─ Yes → withAuthMiddleware
│   └─ Admin only? ['admin']
│   └─ Owner only? ['owner']
│   └─ Any auth? []
└─ No → validateAndGetUser in Use Case
```

---

## Related

- `frontend/nextjs/api-routes.md` - Route patterns
- `frontend/domain/use-cases.md` - Use Case patterns

