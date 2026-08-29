# App Router

> **Module**: frontend/nextjs
> **ESLint**: `custom/require-use-client-directive`
> **Framework**: Next.js 15+ with App Router

---

## TL;DR

**DO**:
- 'use client' directive FIRST (before imports)
- Delegate to Screen components (pages = routing only)
- use() hook for async params (React 19)
- Export default (Next.js requirement)
- Route groups for auth context

**DON'T**:
- Business logic in pages (belongs in Screens)
- Data fetching in pages (belongs in Screens)
- Styled components in pages (only in layouts)
- await params in page (use use() hook)

---

## Why Delegation Pattern

- **Clean Architecture**: Pages = routing, Screens = presentation
- **Testability**: Test Screens independently
- **Reusability**: Screens can be used from multiple routes
- **Separation**: Routing concerns separate from UI logic

---

## Simple Page (Delegation)

```typescript
'use client';

import { AdminDashboardScreen } from '@apps/admin/presentation/screens/AdminDashboardScreen';

const AdminDashboardPage = () => <AdminDashboardScreen />;

export default AdminDashboardPage;
```

**NO**: business logic, data fetching, styled components.

---

## Dynamic Route (use() Hook)

```typescript
'use client';

import { use } from 'react';
import { EventDetailScreen } from '@apps/public/presentation/screens/EventDetailScreen';
import type { EventDetailPageProps } from './page.interfaces';

const EventDetailPage = ({ params }: EventDetailPageProps) => {
  const { slug } = use(params);  // React 19 use()
  return <EventDetailScreen slug={slug} />;
};

export default EventDetailPage;
```

```typescript
// page.interfaces.ts
export interface EventDetailPageProps {
  params: Promise<{ slug: string }>;  // Promise<T> in Next.js 15
}
```

---

## Layout (Can Have UI Logic)

```typescript
'use client';

import { useCallback, useState } from 'react';
import { AdminSidebar } from '@apps/admin/presentation/components';
import { AdminLayoutContainer, MainContent } from './layout.styled';

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapsedChange = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
  }, []);

  return (
    <AdminLayoutContainer>
      <AdminSidebar isCollapsed={isCollapsed} onCollapsedChange={handleCollapsedChange} />
      <MainContent $sidebarCollapsed={isCollapsed}>
        {children}
      </MainContent>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
```

**Layouts CAN have**: useState, useCallback, styled components.
**Layouts CANNOT have**: business logic, data fetching.

---

## Route Groups

```
src/app/
├── (public)/        # No auth (/, /events)
├── (authenticated)/ # User auth (/dashboard)
└── (admin)/         # Admin auth (/admin/*)
```

**Benefits**: Shared layouts, clean URLs, separate auth.

---

## File Structure

### Page
```
src/app/(context)/route/
├── page.tsx              # Delegation only
└── page.interfaces.ts    # Props types
```

### Layout
```
src/app/(context)/
├── layout.tsx            # UI logic allowed
├── layout.interfaces.ts
└── layout.styled.ts
```

---

## Next.js 15 Params

| Context | Pattern |
|---------|---------|
| Page component | `use(params)` |
| generateMetadata | `await params` |

---

## Related

- `frontend/presentation/components.md` - Screen patterns
- `frontend/nextjs/api-routes.md` - API routes

