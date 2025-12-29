import { NextRequest, NextResponse } from 'next/server';
import { rewriteHtml } from '../_lib/rewrite';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Use DuckDuckGo's HTML endpoint which is iframe-friendly
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://html.duckduckgo.com/'
      },
      signal: AbortSignal.timeout(12000)
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
