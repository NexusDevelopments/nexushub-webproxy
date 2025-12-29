import { NextRequest, NextResponse } from 'next/server';
import { rewriteHtml } from '../_lib/rewrite';

async function fetchSearchHtml(url: string, referer: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': referer
    },
    signal: AbortSignal.timeout(12000)
  });
  const html = await res.text();
  return { res, html };
}

function isDdgError(html: string) {
  return /If this persists, please email us\./i.test(html) || /Unexpected error/i.test(html);
}

async function searchRewritten(query: string) {
  const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const { res, html } = await fetchSearchHtml(ddgUrl, 'https://html.duckduckgo.com/');
  if (res.ok && !isDdgError(html)) {
    const rewritten = rewriteHtml(html, new URL(ddgUrl));
    return new NextResponse(rewritten, {
      status: res.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  }

  // Fallback: SearxNG public instance
  const searx = `https://searx.be/search?q=${encodeURIComponent(query)}`;
  try {
    const { res: sRes, html: sHtml } = await fetchSearchHtml(searx, 'https://searx.be/');
    const rewritten = rewriteHtml(sHtml, new URL(searx));
    return new NextResponse(rewritten, {
      status: sRes.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (_e) {
    return NextResponse.json({ error: 'All search providers failed' }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }
    return await searchRewritten(query);
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q') || '';
    if (!q.trim()) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }
    return await searchRewritten(q);
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
