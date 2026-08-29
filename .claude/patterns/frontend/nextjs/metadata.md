# Next.js Metadata & Clean Architecture Patterns

> **Framework**: Next.js 15 App Router
> **Principle**: generateMetadata MUST follow Clean Architecture - NEVER repositories, ALWAYS Use Cases

---

## CRITICAL RULE

**NEVER access repositories directly from page.tsx files**

This applies to:
- `generateMetadata` function
- Server components in page.tsx
- Any server-side data fetching in App Router

**ALWAYS use Use Cases to maintain Clean Architecture separation**

---

## ANTI-PATTERN: Direct Repository Access

```typescript
// ❌ VIOLATION: src/app/public/[event-slug]/participants/[pid]/page.tsx
import { publicParticipantRepository } from '@repositories/public/participant/participant.repository';

export const generateMetadata = async ({ params }) => {
  const { pid } = await params;

  // ❌ VIOLATES CLEAN ARCHITECTURE
  const participant = await publicParticipantRepository.findById(pid);

  return {
    title: `${participant.name} | MyProject`,
  };
};
```

### Why This is Wrong:
1. **Layer Violation**: Page (presentation) → Repository (infrastructure) skips Use Case layer
2. **No Business Logic**: Missing validation (isActive, permissions, authorization)
3. **Testing Nightmare**: Cannot mock business logic
4. **Tight Coupling**: Page depends on infrastructure implementation
5. **Breaks DDD**: Domain logic scattered instead of centralized

---

## CORRECT PATTERN: Clean Architecture Flow

### Architecture Layers
```
Page (src/app/page.tsx)
  ↓ calls
Use Case (apps/{context}/domain/use-cases)
  ↓ calls
Repository (libs/infrastructure/repositories)
  ↓ queries
Database (Mock / Prisma)
```

### Step 1: Create Use Case (if doesn't exist)

```typescript
// apps/public/domain/use-cases/get-participant-by-id/get-participant-by-id.interfaces.ts
export interface GetParticipantByIdRequest {
  participantId: string;
}

export interface ParticipantData {
  id: string;
  name: string;
  stageName: string;
  bio: string | null;
  avatar: string;
  category: string;
  isActive: boolean;
  location: {
    city: string | null;
    country: string | null;
  };
  socialMedia: {
    instagram: string;
    spotify: string;
    youtube: string;
  };
  stats: {
    currentRanking: number;
    previousRanking: number;
    totalVotes: number;
    trend: 'up' | 'down' | 'stable';
  };
  registeredAt: string;
}

export interface GetParticipantByIdSuccessResponse {
  success: true;
  data: {
    participant: ParticipantData;
  };
}

export interface GetParticipantByIdErrorResponse {
  success: false;
  error: string;
  status: number;
  details?: Record<string, unknown>;
}

export type GetParticipantByIdResponse =
  | GetParticipantByIdSuccessResponse
  | GetParticipantByIdErrorResponse;
```

```typescript
// apps/public/domain/use-cases/get-participant-by-id/get-participant-by-id.use-case.ts
import { createNotFoundError, handleUseCaseError } from '@helpers';
import { publicParticipantRepository } from '@repositories/public/participant/participant.repository';

import type {
  GetParticipantByIdRequest,
  GetParticipantByIdResponse,
  ParticipantData,
} from './get-participant-by-id.interfaces';

/**
 * Transform repository data to public format
 */
const transformParticipantData = (participant: any): ParticipantData => {
  const ranking = participant.rankings?.[0] ?? {
    currentRanking: 999,
    previousRanking: 999,
    totalVotes: 0,
    trend: 'stable' as const,
  };

  const validTrend = (['up', 'down', 'stable'] as const).includes(
    ranking.trend as 'up' | 'down' | 'stable'
  )
    ? (ranking.trend as 'up' | 'down' | 'stable')
    : ('stable' as const);

  return {
    avatar: participant.avatar ?? '/images/participants/default.jpg',
    bio: participant.bio,
    category: participant.category,
    id: participant.id,
    isActive: participant.isActive,
    location: {
      city: participant.city,
      country: participant.country,
    },
    name: participant.name,
    registeredAt: participant.createdAt.toISOString(),
    socialMedia: {
      instagram: participant.instagram ?? '',
      spotify: participant.spotify ?? '',
      youtube: participant.youtube ?? '',
    },
    stageName: participant.stageName,
    stats: {
      currentRanking: ranking.currentRanking,
      previousRanking: ranking.previousRanking ?? ranking.currentRanking,
      totalVotes: ranking.totalVotes,
      trend: validTrend,
    },
  };
};

/**
 * Execute get participant by ID with business validation
 */
export const executeGetParticipantById = async (
  params: GetParticipantByIdRequest
): Promise<GetParticipantByIdResponse> => {
  try {
    const { participantId } = params;

    const participant = await publicParticipantRepository.findById(participantId);

    if (!participant) {
      return createNotFoundError('Participante', participantId);
    }

    // ✅ BUSINESS VALIDATION
    if (!participant.isActive) {
      return createNotFoundError('Participante', participantId);
    }

    const transformedData = transformParticipantData(participant);

    return {
      success: true,
      data: { participant: transformedData },
    };
  } catch (error) {
    return handleUseCaseError(error, 'executeGetParticipantById');
  }
};
```

```typescript
// apps/public/domain/use-cases/get-participant-by-id/index.ts
export * from './get-participant-by-id.interfaces';
export * from './get-participant-by-id.use-case';
```

### Step 2: Implement generateMetadata with Use Case

```typescript
// src/app/public/[event-slug]/participants/[pid]/page.tsx
import type { Metadata } from 'next';
import { executeGetParticipantById } from '@app-public/domain/use-cases/get-participant-by-id';
import { ParticipantDetailPage } from '@pages';

import type { ParticipantPageProps } from './page.interfaces';

/**
 * Generate dynamic metadata for participant detail
 * ✅ CLEAN ARCHITECTURE: Uses Use Case layer
 */
export const generateMetadata = async ({ params }: ParticipantPageProps): Promise<Metadata> => {
  const { 'event-slug': eventSlug, pid } = await params;

  // ✅ CORRECT: Call Use Case, not Repository
  const result = await executeGetParticipantById({ participantId: pid });

  // ✅ MANDATORY: Handle error case with fallback
  if (!result.success) {
    return {
      title: `Participante - ${eventSlug} | MyProject`,
      description: `Conoce más sobre este participante en ${eventSlug} y vota`,
    };
  }

  const { participant } = result.data;
  const participantName = participant.stageName || participant.name;
  const description =
    participant.bio ?? `Conoce a ${participantName}, participante en ${eventSlug}. Vota por tu favorito.`;

  // ✅ SEO COMPLETE: Title + Description + OpenGraph + Twitter
  return {
    title: `${participantName} - ${eventSlug} | MyProject`,
    description,
    openGraph: {
      title: `${participantName} - ${eventSlug}`,
      description,
      images: participant.avatar ? [{ url: participant.avatar }] : [],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${participantName} - ${eventSlug}`,
      description,
      images: participant.avatar ? [participant.avatar] : [],
    },
  };
};

/**
 * Participant Detail Page
 * ✅ DELEGATION ONLY: No business logic
 */
export default async function ParticipantPage({ params }: ParticipantPageProps) {
  const { pid } = await params;
  return <ParticipantDetailPage participantId={pid} />;
}
```

---

## When to Create a New Use Case

Create a dedicated Use Case for metadata when:

1. **No existing Use Case covers the need**
   - New entity type (participant, event, category)
   - Different data requirements

2. **Business logic is required**
   - Validation (isActive, isPublished, dates)
   - Authorization (user permissions, role checks)
   - Data transformation (format, aggregation)

3. **Multiple pages need same data**
   - Reusability across metadata and UI
   - Consistent business rules

4. **Different data shape needed**
   - Metadata needs subset of fields
   - Different nesting structure

### Use Case Structure Template

```
get-{entity}-by-id/
├── get-{entity}-by-id.interfaces.ts  # Types & contracts
├── get-{entity}-by-id.use-case.ts    # Business logic
└── index.ts                          # Barrel exports
```

---

## Metadata Checklist

Before marking complete, verify:

- [ ] generateMetadata calls Use Case, NOT repository
- [ ] Use Case includes business validation (isActive, permissions, etc.)
- [ ] Fallback metadata for `!result.success` case
- [ ] Dynamic title with actual data
- [ ] Description from content or fallback
- [ ] OpenGraph tags included
- [ ] Twitter Card tags included
- [ ] Images array for social previews
- [ ] Type-safe `Promise<Metadata>` return type
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors

---

## Common Metadata Patterns

### Pattern 1: Simple Dynamic Title
```typescript
export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const result = await executeGetResource({ id: params.id });

  return {
    title: result.success
      ? `${result.data.name} | MyProject`
      : 'Recurso no encontrado | MyProject',
  };
};
```

### Pattern 2: Full SEO with Social Cards
```typescript
export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const result = await executeGetEvent({ slug: params.slug });

  if (!result.success) {
    return { title: 'Evento | MyProject' };
  }

  const { event } = result.data;

  return {
    title: `${event.name} | MyProject`,
    description: event.description,
    openGraph: {
      title: event.name,
      description: event.description,
      images: [{ url: event.bannerUrl }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: event.name,
      description: event.description,
      images: [event.bannerUrl],
    },
  };
};
```

### Pattern 3: Nested Dynamic Routes
```typescript
export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { 'event-slug': eventSlug, categoryId } = await params;

  const result = await executeGetEventCategory({
    eventSlug,
    categoryId,
  });

  // ... metadata generation
};
```

---

## Common Mistakes to Avoid

1. ❌ **Direct repository access** from generateMetadata
2. ❌ **No fallback metadata** for error cases
3. ❌ **Missing OpenGraph/Twitter** tags
4. ❌ **Static title** instead of dynamic
5. ❌ **No business validation** in Use Case
6. ❌ **Not handling `!result.success`** gracefully
7. ❌ **Business logic in page.tsx** instead of Use Case
8. ❌ **Forgetting `await params`** in Next.js 15
9. ❌ **Not using discriminated unions** for responses
10. ❌ **Mixing presentation and business logic**

---

## Why This Pattern Matters

### SEO Benefits
- Dynamic titles improve search rankings
- Rich descriptions increase click-through rates
- Structured data helps search engines

### Social Sharing
- OpenGraph creates rich previews on Facebook, LinkedIn
- Twitter Cards show images and descriptions
- Increases engagement and traffic

### Clean Architecture
- Maintains layer separation (Presentation → Domain → Infrastructure)
- Business logic centralized in Use Cases
- Easy to test each layer independently
- Changes isolated to appropriate layers

### Testability
- Use Cases can be unit tested
- Mock repositories for integration tests
- Page components remain simple

### Reusability
- Same Use Case serves:
  - generateMetadata (SEO)
  - API routes (data endpoints)
  - Server components (SSR)
  - Client components (via API)

### Type Safety
- Full TypeScript validation
- Discriminated unions for success/error
- Compile-time errors prevent runtime bugs

---

## Related Patterns

- **Clean Architecture**: `clean-architecture-ddd-nextjs-patterns.md`
- **Data Architecture**: `data-architecture-patterns.md`
- **Multi-Tenant**: `multi-tenant-architecture-patterns.md`

---

## Documentation References

- `/docs/development-standards/APP-ROUTER-STANDARDS.md` - Complete generateMetadata section
- `/CLAUDE.md` - Rules 136-140 (Next.js Pages & Metadata)
- `/docs/development-standards/USE-CASES-STANDARDS.md` - Use Case patterns

---

**Pattern Status**: ✅ Production Ready
**Last Validated**: 2025-12-20
**Framework Version**: Next.js 15.1.0
**Test Coverage**: 848+ tests passing
