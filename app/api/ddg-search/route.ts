import { NextRequest, NextResponse } from 'next/server';
import { rewriteHtml } from '../_lib/rewrite';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // DuckDuckGo search URL
    const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(8000)
    });
    const contentType = response.headers.get('content-type');
    const html = await response.text();

    // Ultraviolet-style rewrite for embedding and proxying links/resources
    const rewritten = rewriteHtml(html, new URL(searchUrl));

    return new NextResponse(rewritten, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
