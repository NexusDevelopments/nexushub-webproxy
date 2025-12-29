import { NextRequest, NextResponse } from 'next/server';

function extractSubdomain(hostname: string, baseDomain?: string): string | null {
  // If a base domain is provided, strip it; else infer first label as subdomain
  const host = hostname.toLowerCase();
  if (host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return null;
  // Remove port if present
  const clean = host.replace(/:\d+$/, '');
  const parts = clean.split('.');
  if (parts.length <= 2) return null; // e.g., example.com or www.example.com (treat www as not a subdomain)
  const first = parts[0];
  if (first === 'www') return null;
  return first;
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = extractSubdomain(hostname);

  // Forward subdomain to the app layer and API routes
  const requestHeaders = new Headers(request.headers);
  if (subdomain) {
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
