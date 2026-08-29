# Project Structure Pattern

> **Layer**: Framework (Foundation)
> **Purpose**: Standardized folder organization for frontend projects
> **Architecture**: Clean Architecture + Next.js App Router
> **Version**: 1.0.0

---

## Overview

A well-organized project structure enables:
- **Discoverability** - Find files quickly
- **Scalability** - Add features without restructuring
- **Consistency** - Same patterns across contexts
- **Maintainability** - Clear ownership and boundaries

---

## Top-Level Structure

```
project/
├── src/
│   ├── app/                    # Next.js App Router (routing only)
│   ├── apps/                   # Business contexts (features)
│   └── libs/                   # Shared infrastructure
├── public/                     # Static assets (favicon, robots.txt)
├── docs/                       # Business documentation (non-code)
├── scripts/                    # Build/dev scripts, ESLint rules
├── tests/                      # E2E tests, test utilities
├── prisma/                     # Database schema, migrations
└── .claude/                    # AI documentation (patterns, rules, status)
```

---

## The `src/` Directory

### 1. `src/app/` - Routing Layer (Next.js)

**Purpose**: ONLY routing and page composition. NO business logic.

```
src/app/
├── (public)/                   # Route group: public pages
│   ├── page.tsx                # Landing page
│   ├── events/
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic route
│   └── layout.tsx              # Public layout
├── (authenticated)/            # Route group: requires auth
│   └── dashboard/
│       └── page.tsx
├── (admin)/                    # Route group: admin only
│   └── admin/
│       └── page.tsx
├── api/                        # API routes
│   ├── public/                 # Public endpoints
│   ├── admin/                  # Admin endpoints
│   ├── auth/                   # Auth endpoints
│   └── webhooks/               # External webhooks
├── layout.tsx                  # Root layout
└── globals.css                 # Global styles (minimal)
```

**Rules**:
- Pages import screens from `apps/`
- Pages are thin wrappers (< 30 lines)
- API routes delegate to use cases
- Use route groups for layout organization

### 2. `src/apps/` - Business Contexts

**Purpose**: Feature-specific code organized by bounded context.

```
src/apps/
├── admin/                      # Admin context
│   ├── domain/
│   │   └── use-cases/          # Admin business logic
│   ├── presentation/
│   │   ├── components/         # Admin-specific components
│   │   ├── hooks/              # Admin-specific hooks
│   │   └── screens/            # Admin screens (Screen suffix)
│   └── constants/              # Admin constants
├── public/                     # Public context
│   ├── domain/
│   │   └── use-cases/
│   ├── presentation/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── screens/            # Public screens (Page suffix)
│   └── constants/
├── auth/                       # Auth context
│   └── domain/
│       └── use-cases/          # Login, signup, etc.
└── shared/                     # Cross-context UI (errors, loading)
    └── presentation/
        └── screens/            # ErrorScreen, NotFoundScreen
```

**Rules**:
- NO cross-context imports (admin cannot import from public)
- Each context owns its domain logic
- Shared UI goes in `shared/` or `libs/presentation/`

### 3. `src/libs/` - Shared Infrastructure

**Purpose**: Reusable code shared across all contexts.

```
src/libs/
├── domain/                     # Domain layer (pure)
│   ├── entities/               # Business entities
│   │   ├── business/           # Core entities (User, Event, etc.)
│   │   └── index.ts
│   ├── interfaces/             # Repository interfaces
│   │   ├── admin/
│   │   ├── public/
│   │   └── index.ts
│   └── types/                  # Simple types, enums
│       ├── auth/
│       ├── common/
│       └── index.ts
├── infrastructure/             # Infrastructure layer
│   ├── config/                 # External configs (Stripe, etc.)
│   ├── database/               # Prisma client
│   ├── repositories/           # Repository implementations
│   │   ├── admin/
│   │   ├── public/
│   │   └── base/               # Base repository utilities
│   ├── services/               # HTTP services
│   │   ├── admin/
│   │   ├── public/
│   │   ├── auth/
│   │   └── storage/            # File storage
│   └── state/                  # Redux store
│       ├── slices/
│       ├── selectors/
│       └── store.ts
├── presentation/               # Shared UI
│   ├── assets/                 # Images, icons, fonts
│   ├── components/             # Reusable components
│   │   ├── common/             # Button, Input, Modal, etc.
│   │   ├── forms/              # Form components
│   │   └── layout/             # Header, Footer, Sidebar
│   ├── hooks/                  # Shared hooks
│   ├── layouts/                # Layout components
│   ├── providers/              # Context providers
│   └── styles/                 # Theme, tokens, global styles
└── shared/                     # Cross-cutting utilities
    ├── constants/              # App-wide constants
    ├── helpers/                # Utility functions
    ├── testing/                # Test utilities
    └── utils/                  # Pure utility functions
```

---

## Assets Organization

### Location: `src/libs/presentation/assets/`

```
assets/
├── images/
│   ├── branding/               # Logo, favicon variants
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   └── favicon.ico
│   ├── illustrations/          # UI illustrations
│   │   ├── empty-state.svg
│   │   └── error.svg
│   └── photos/                 # Static photos (rare)
│       └── hero-default.jpg
├── icons/
│   ├── ui/                     # UI icons (prefer lucide-react)
│   └── custom/                 # Custom brand icons
└── fonts/                      # Custom fonts (if not using CDN)
    └── custom-font.woff2
```

**Rules**:
1. **Prefer icon libraries** (lucide-react) over custom icons
2. **Use SVG** for icons and illustrations
3. **Optimize images** before committing (use next/image)
4. **Don't create empty folders** - create when needed
5. **Use descriptive names** - `empty-state.svg` not `img1.svg`

### Importing Assets

```typescript
// Via alias (recommended)
import Logo from '@assets/images/branding/logo.svg';

// Direct import
import EmptyState from '@libs/presentation/assets/images/illustrations/empty-state.svg';
```

### Public Folder (`/public`)

Only for files that need direct URL access:
- `favicon.ico`
- `robots.txt`
- `sitemap.xml`
- `og-image.png` (social sharing)

---

## Configuration Organization

### Environment Variables

```
.env.local              # Local development (gitignored)
.env.example            # Template with placeholder values
.env.test               # Test environment
```

**Naming Convention**:
```bash
# Public (exposed to client)
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_STRIPE_KEY=

# Private (server only)
DATABASE_URL=
STRIPE_SECRET_KEY=
JWT_SECRET=
```

### Config Files Location

```
src/libs/infrastructure/config/
├── stripe/
│   ├── stripe.config.ts        # Stripe SDK setup
│   └── index.ts
├── supabase/
│   ├── supabase.config.ts      # Supabase client
│   └── index.ts
└── index.ts                    # Re-export all configs
```

**Pattern**:
```typescript
// stripe.config.ts
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env['STRIPE_SECRET_KEY'];

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia',
});
```

---

## Constants Organization

### Location: `src/libs/shared/constants/`

```
constants/
├── api.constants.ts            # API endpoints, timeouts
├── app.constants.ts            # App name, version, URLs
├── domain.constants.ts         # Business domain enums
├── error-messages.constants.ts # User-facing error messages
├── field-limits.constants.ts   # Form field limits (from DB schema)
├── http-status.constants.ts    # HTTP status codes
├── navigation.constants.ts     # Route paths
├── pagination.constants.ts     # Default page sizes
├── roles.constants.ts          # User roles
├── validation.constants.ts     # Validation rules
├── design-system/              # Design tokens
│   ├── tokens.ts               # Colors, spacing, typography
│   └── presets.ts              # Component presets
└── index.ts                    # Barrel export
```

**Rules**:
1. **One concern per file** - Don't mix HTTP with domain constants
2. **Use SCREAMING_SNAKE_CASE** for constant values
3. **Export as const** for type inference
4. **Group related constants** in objects

```typescript
// ✅ Good
export const USER_ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  PARTICIPANT: 'participant',
} as const;

// ❌ Bad - scattered constants
export const ADMIN = 'admin';
export const OWNER = 'owner';
```

---

## Helpers vs Utils Organization

### Helpers (`src/libs/shared/helpers/`)

**Purpose**: Functions with side effects or complex logic.

```
helpers/
├── http/                       # HTTP utilities
│   ├── handleRequest/          # Fetch wrapper
│   ├── AppError/               # Error class
│   └── index.ts
├── error-handling/             # Error utilities
│   ├── logger/
│   ├── api-error-handler/
│   └── index.ts
├── validation/                 # Validation helpers
│   ├── form-validator/
│   └── env-var-validator/
├── crypto/                     # Crypto utilities
├── jwt/                        # JWT utilities
└── index.ts
```

### Utils (`src/libs/shared/utils/`)

**Purpose**: Pure functions, no side effects.

```
utils/
├── array/                      # Array utilities
│   ├── array.ts
│   └── index.ts
├── date/                       # Date formatting
├── format/                     # Number, currency formatting
├── string/                     # String manipulation
├── object/                     # Object utilities
└── index.ts
```

**Rule**: If it has IO, state, or side effects → `helpers/`. If pure → `utils/`.

---

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Component | PascalCase folder | `Button/Button.tsx` |
| Hook | camelCase with `use` | `useAuth/useAuth.ts` |
| Constant | kebab-case | `error-messages.constants.ts` |
| Utility | kebab-case | `format-currency.ts` |
| Type file | kebab-case | `user.types.ts` |
| Interface | kebab-case | `user-repository.interfaces.ts` |
| Use Case | kebab-case | `create-user.use-case.ts` |
| Test | same + `.test` | `Button.test.tsx` |
| Styled | same + `.styled` | `Button.styled.ts` |

---

## TypeScript Aliases

```json
// tsconfig.json paths
{
  "@apps/*": ["src/apps/*"],
  "@libs/*": ["src/libs/*"],
  "@components": ["src/libs/presentation/components"],
  "@hooks": ["src/libs/presentation/hooks"],
  "@utils": ["src/libs/shared/utils"],
  "@helpers": ["src/libs/shared/helpers"],
  "@constants": ["src/libs/shared/constants"],
  "@entities": ["src/libs/domain/entities"],
  "@repositories": ["src/libs/infrastructure/repositories"],
  "@services": ["src/libs/infrastructure/services"],
  "@config": ["src/libs/infrastructure/config"],
  "@assets": ["src/libs/presentation/assets"],
  "@redux": ["src/libs/infrastructure/state"]
}
```

---

## Anti-Patterns

### ❌ Don't

```
src/
├── components/          # Too vague, where do they belong?
├── pages/               # Conflicts with app router
├── api/                 # Should be in src/app/api/
├── types/               # Should be in domain/types or with component
├── services/            # Should be in infrastructure/services
└── utils.ts             # Single file, should be folder
```

### ✅ Do

```
src/
├── app/                 # Next.js routing
├── apps/                # Business contexts
└── libs/                # Shared code
    ├── domain/          # Business logic
    ├── infrastructure/  # External integrations
    ├── presentation/    # UI components
    └── shared/          # Cross-cutting utilities
```

---

## Checklist for New Projects

- [ ] Set up `src/app/`, `src/apps/`, `src/libs/` structure
- [ ] Configure TypeScript aliases
- [ ] Create base constants files
- [ ] Set up design tokens
- [ ] Configure environment variables
- [ ] Create barrel exports (index.ts) for each module
- [ ] Set up ESLint rules for architecture boundaries
- [ ] Document project-specific patterns in `.claude/`

---

## Related Documentation

- `.claude/patterns/frontend/presentation/components.md` - Component structure
- `.claude/patterns/frontend/tooling/imports.md` - Import strategy
- `.claude/patterns/core/architecture/clean-architecture.md` - Layer boundaries

---

**Pattern Version**: 1.0.0 | **Created**: 2026-02-12
