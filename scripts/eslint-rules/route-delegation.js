/**
 * ESLint Rule: route-delegation
 *
 * CODE SOVEREIGNTY PRINCIPLE: Territorial Integrity + Non-Intervention
 *
 * API routes (src/app/api/**\/route.ts) are transport adapters. They MUST delegate
 * business logic to Use Cases and MUST NOT reach the data layer directly.
 *
 * DETECTED PATTERNS (value imports only — type-only imports are allowed):
 * ❌ import { prisma } from '@database'
 * ❌ import { userRepository } from '@repositories'
 * ❌ import { PrismaClient } from '@prisma/client'
 * ❌ import { createClient } from '@supabase/supabase-js'
 * ❌ import Stripe from 'stripe'
 * ❌ import { x } from '.../infrastructure/repositories/...'
 *
 * ALLOWED:
 * ✅ import type { Companion } from '@prisma/client'   (type-only)
 * ✅ Use Case imports, @middleware, @api-error, @constants, next/*
 * ✅ Files in the `allow` option (documented legacy debt — shrink over time,
 *    tracked in .claude/plans/PLAN-ESLINT-ROUTE-DELEGATION.md)
 *
 * WHY:
 * - Routes with inline data access bypass validation, RBAC helpers and error
 *   normalization that live in the use-case layer
 * - Business logic in routes is untestable in isolation and duplicates rules
 */

const FORBIDDEN_SOURCES = [
  { category: 'Database', pattern: /^@database$/ },
  { category: 'Repositories', pattern: /^@repositories$/ },
  { category: 'ORM', pattern: /^@prisma\// },
  { category: 'ORM', pattern: /^prisma$/ },
  { category: 'Database', pattern: /^pg$/ },
  { category: 'Storage', pattern: /^@supabase\// },
  { category: 'Payments', pattern: /^stripe$/ },
  { category: 'Repositories', pattern: /\/infrastructure\/repositories\// },
];

export const routeDelegationRule = {
  create(context) {
    const filename = context.filename || context.getFilename();
    const normalized = filename.replace(/\\/g, '/');

    const isApiRoute =
      normalized.includes('/app/api/') && /\/route\.(ts|tsx)$/.test(normalized);
    if (!isApiRoute) return {};

    const options = context.options[0] ?? {};
    const allow = options.allow ?? [];
    if (allow.some((entry) => normalized.includes(entry))) {
      return {};
    }

    return {
      ImportDeclaration(node) {
        if (node.importKind === 'type') return;

        const source = node.source.value;
        const match = FORBIDDEN_SOURCES.find(({ pattern }) => pattern.test(source));
        if (!match) return;

        // Type-only named specifiers (import { type X } from ...) do not count
        const hasValueSpecifier = node.specifiers.some(
          (specifier) => specifier.importKind !== 'type'
        );
        if (node.specifiers.length > 0 && !hasValueSpecifier) return;

        context.report({
          data: { category: match.category, source },
          message:
            "API routes must delegate to Use Cases. Importing '{{ source }}' ({{ category }}) " +
            'is forbidden in src/app/api — extract the logic into a use case ' +
            '(Route → Use Case → Repository).',
          node,
        });
      },
    };
  },
  meta: {
    docs: {
      category: 'Clean Architecture',
      description:
        'API routes are transport adapters: forbid direct data-layer imports (prisma, repositories, supabase, stripe) in src/app/api routes.',
      recommended: true,
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          allow: {
            items: { type: 'string' },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'problem',
  },
};
