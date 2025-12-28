import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Extract subdomain from host
  const parts = host.split('.');
  let subdomain = null;

  // Only extract subdomain on custom domains (not localhost or vercel.app)
  if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
    if (parts.length > 2 && !host.includes('vercel.app')) {
      // Custom domain like subdomain.nexushublol.com
      subdomain = parts[0];
    } else if (host.includes('vercel.app') && parts.length > 3) {
      // Vercel subdomain like subdomain.nexushublol.vercel.app
      subdomain = parts[0];
    }
  }

  // Store subdomain in request headers for API routes to access
  const requestHeaders = new Headers(request.headers);
  if (subdomain && subdomain !== 'www') {
    requestHeaders.set('x-subdomain', subdomain);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/api|favicon.ico).*)'],
};
