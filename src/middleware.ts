/**
 * Next.js Route Protection Middleware
 * DearAdry Platform
 *
 * Protects admin and authenticated routes with role-based authentication.
 * Redirects authenticated users from auth pages to their portal.
 * Runs on the Edge Runtime for optimal performance.
 *
 * Uses `jose` library for Edge-compatible JWT verification.
 */

import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

import { logError } from '@logger';

import { ADMIN_ROLES, AUTH_PAGES, PUBLIC_AUTH_ROUTES, PUBLIC_PAGES } from './middleware.constants';
import type { JWTPayload } from './middleware.interfaces';

function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return request.cookies.get('auth-token')?.value ?? null;
}

function clearExpiredCookie(): NextResponse {
  const response = NextResponse.next();
  response.cookies.set('auth-token', '', {
    expires: new Date(0),
    path: '/',
  });
  return response;
}

function redirectToLogin(request: NextRequest, target: string, clearCookie = false): NextResponse {
  const loginUrl = new URL(target, request.url);
  const response = NextResponse.redirect(loginUrl);

  if (clearCookie) {
    response.cookies.set('auth-token', '', {
      expires: new Date(0),
      path: '/',
    });
  }

  return response;
}

async function verifyToken(token: string, secret: string): Promise<JWTPayload | null> {
  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as JWTPayload;
  } catch (error) {
    logError(error, 'JWT verification failed');
    return null;
  }
}

/**
 * Redirect authenticated users from auth pages to their portal
 */
async function redirectAuthenticatedUser(request: NextRequest): Promise<NextResponse | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const jwtSecret = process.env['JWT_SECRET'];
  if (!jwtSecret) return clearExpiredCookie();

  const decoded = await verifyToken(token, jwtSecret);
  if (!decoded?.userId) return clearExpiredCookie();

  const redirectUrl = ADMIN_ROLES.includes(decoded.role) ? '/admin' : '/dashboard';
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}

/**
 * Protect authenticated routes — requires any valid token
 */
async function protectAuthenticatedRoute(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const token = getTokenFromRequest(request);

  if (!token) {
    return pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'No autorizado', success: false }, { status: 401 })
      : redirectToLogin(request, '/login');
  }

  const jwtSecret = process.env['JWT_SECRET'];
  if (!jwtSecret) {
    return pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'No autorizado', success: false }, { status: 401 })
      : redirectToLogin(request, '/login', true);
  }

  const decoded = await verifyToken(token, jwtSecret);

  if (!decoded?.userId) {
    return pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'Token expirado o inválido', success: false }, { status: 401 })
      : redirectToLogin(request, '/login', true);
  }

  return NextResponse.next();
}

/**
 * Protect admin routes — requires owner or admin role
 */
async function protectAdminRoute(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const token = getTokenFromRequest(request);

  if (!token) {
    return pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'No autorizado', success: false }, { status: 401 })
      : redirectToLogin(request, '/admin/login');
  }

  const jwtSecret = process.env['JWT_SECRET'];
  if (!jwtSecret) {
    return pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'No autorizado', success: false }, { status: 401 })
      : redirectToLogin(request, '/admin/login', true);
  }

  const decoded = await verifyToken(token, jwtSecret);

  if (!decoded?.userId) {
    return pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'Token expirado o inválido', success: false }, { status: 401 })
      : redirectToLogin(request, '/admin/login', true);
  }

  if (!ADMIN_ROLES.includes(decoded.role)) {
    return pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'Permisos insuficientes', success: false }, { status: 403 })
      : redirectToLogin(request, '/admin/login');
  }

  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_AUTH_ROUTES.includes(pathname as (typeof PUBLIC_AUTH_ROUTES)[number])) {
    if (AUTH_PAGES.includes(pathname as (typeof AUTH_PAGES)[number])) {
      const redirect = await redirectAuthenticatedUser(request);
      if (redirect) return redirect;
    }
    return NextResponse.next();
  }

  if (PUBLIC_PAGES.includes(pathname as (typeof PUBLIC_PAGES)[number])) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    return protectAdminRoute(request);
  }

  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/payment') ||
    pathname.startsWith('/api/public/evidence')
  ) {
    return protectAuthenticatedRoute(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/admin/login',
    '/nosotros',
    '/como-funciona',
    '/contact',
    '/preguntas-frecuentes',
    '/privacy',
    '/cookies',
    '/galeria',
    '/registro-exitoso',
    '/dashboard',
    '/dashboard/:path*',
    '/payment/:path*',
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/public/evidence/:path*',
  ],
};
