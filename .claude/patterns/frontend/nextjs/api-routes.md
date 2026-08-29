# API Routes

> **Module**: frontend/nextjs
> **Framework**: Next.js 15+ App Router

---

## TL;DR

**DO**:
- withAuthMiddleware for protected routes
- Extract params, delegate 100% to Use Cases
- handleApiError for centralized error handling
- HTTP_STATUS constants (no magic numbers)
- `await context.params` (Next.js 15 async)

**DON'T**:
- Business logic in routes
- Validation in routes (Use Cases)
- Direct repository/database calls
- Magic numbers for status codes

---

## Route Responsibility

Routes = Thin HTTP controllers (extract, delegate, respond)

| CAN DO | CANNOT DO |
|--------|-----------|
| Extract params | Business logic |
| Delegate to Use Cases | Validation |
| Return NextResponse | Database calls |
| Error handling | Authorization logic |

---

## List Route (GET)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { executeGetUsers } from '@app-admin/domain/use-cases';
import { handleApiError } from '@helpers';
import { HTTP_STATUS } from '@constants';
import { withAuthMiddleware } from '@middleware';

export const GET = withAuthMiddleware(
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);

      const result = await executeGetUsers({
        ...(searchParams.get('role') && { role: searchParams.get('role') }),
        ...(searchParams.get('search') && { search: searchParams.get('search') }),
        request,
      });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.BAD_REQUEST,
      });
    } catch (error) {
      return handleApiError(error, 'GET /api/admin/users');
    }
  },
  ['admin']
);
```

---

## Dynamic Route ([id])

```typescript
import type { RouteContext } from './route.interfaces';

export const GET = withAuthMiddleware(
  async (request: NextRequest, context: RouteContext) => {
    try {
      const { id } = await context.params;  // Next.js 15: async params

      const result = await executeGetUserById({ id, request });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND,
      });
    } catch (error) {
      return handleApiError(error, 'GET /api/admin/users/[id]');
    }
  },
  ['admin']
);

// route.interfaces.ts
export interface RouteContext {
  params: Promise<{ id: string }>;
}
```

---

## Create Route (POST)

```typescript
export const POST = withAuthMiddleware(
  async (request: NextRequest) => {
    try {
      const body = await request.json();

      const result = await executeCreateUser({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        request,
      });

      return NextResponse.json(result, {
        status: result.success ? HTTP_STATUS.CREATED : HTTP_STATUS.BAD_REQUEST,
      });
    } catch (error) {
      return handleApiError(error, 'POST /api/admin/users');
    }
  },
  ['admin']
);
```

---

## Conditional Spreading

```typescript
// ✅ Clean optional params (no undefined values)
const result = await executeGetUsers({
  ...(role !== null && { role }),
  ...(search !== null && { search }),
  ...(page !== null && { page: parseInt(page, 10) }),
  request,
});
```

---

## withAuthMiddleware

```typescript
export const GET = withAuthMiddleware(
  async (request: NextRequest) => { /* handler */ },
  ['admin', 'owner']  // Required roles (OR logic)
);
```

**Provides**:
- JWT token validation
- Role-based access control
- Automatic 401/403 responses
- Typed request with user context

---

## HTTP Status Constants

```typescript
HTTP_STATUS.OK                    // 200
HTTP_STATUS.CREATED               // 201
HTTP_STATUS.BAD_REQUEST           // 400
HTTP_STATUS.UNAUTHORIZED          // 401
HTTP_STATUS.FORBIDDEN             // 403
HTTP_STATUS.NOT_FOUND             // 404
HTTP_STATUS.INTERNAL_SERVER_ERROR // 500
```

---

## File Structure

```
src/app/api/admin/users/
├── route.ts                # GET, POST
├── route.interfaces.ts
├── count/
│   └── route.ts            # GET /count
└── [id]/
    ├── route.ts            # GET, PUT, DELETE
    └── route.interfaces.ts
```

---

## Why Thin Controllers

- **Testability**: Use Cases tested independently
- **Reusability**: Same Use Case from multiple routes
- **Clean Architecture**: Routes = HTTP transport only
- **Single Responsibility**: No business logic in routes

---

## Related

- `frontend/domain/use-cases.md` - Use Case patterns
- `frontend/nextjs/middleware.md` - Auth middleware

