import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasAuth = request.cookies.has('auth-token');
  const isAppRoute = request.nextUrl.pathname.startsWith('/app');
  const isAuthRoute = request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/signup');

  // If trying to access a protected app route without auth, redirect to login
  if (isAppRoute && !hasAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If trying to access an auth route (login/signup) with auth, redirect to app dashboard
  if (isAuthRoute && hasAuth) {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup', '/app/:path*'],
}
