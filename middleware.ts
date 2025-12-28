import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Simply pass through requests - all subdomains serve the same NexusHub app
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/api|favicon.ico).*)'],
};
