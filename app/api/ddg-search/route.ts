import { NextRequest, NextResponse } from 'next/server';
import { rewriteHtml } from '../_lib/rewrite';

type Engine = {
  name: string;
  url: string;
  referer: string;
};

async function fetchSearchHtml(url: string, referer: string) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': referer,
      'Upgrade-Insecure-Requests': '1'
    },
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(12000)
  });
  const html = await res.text();
  return { res, html };
}

function isDdgError(html: string) {
  return /If this persists, please email us\./i.test(html) || /Unexpected error/i.test(html);
}

async function searchRewritten(query: string) {
  const engines: Engine[] = [
    {
      name: 'ddg-html',
      url: `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
      referer: 'https://html.duckduckgo.com/'
    },
    {
      name: 'brave-search',
      url: `https://search.brave.com/search?q=${encodeURIComponent(query)}`,
      referer: 'https://search.brave.com/'
    },
    {
      name: 'searx-be',
      url: `https://searx.be/search?q=${encodeURIComponent(query)}`,
      referer: 'https://searx.be/'
    },
    {
      name: 'searx-garuda',
      url: `https://search.garudalinux.org/search?q=${encodeURIComponent(query)}`,
      referer: 'https://search.garudalinux.org/'
    },
    {
      name: 'searx-raw',
      url: `https://search.snopyta.org/search?q=${encodeURIComponent(query)}`,
      referer: 'https://search.snopyta.org/'
    },
    {
      name: 'searx-raphielscape',
      url: `https://searx.raphielscape.com/search?q=${encodeURIComponent(query)}`,
      referer: 'https://searx.raphielscape.com/'
    },
    {
      name: 'searx-bus-hit',
      url: `https://search.bus-hit.me/search?q=${encodeURIComponent(query)}`,
      referer: 'https://search.bus-hit.me/'
    },
    {
      name: 'searx-tk',
      url: `https://searx.tiekoetter.com/search?q=${encodeURIComponent(query)}`,
      referer: 'https://searx.tiekoetter.com/'
    },
    {
      name: 'searx-space',
      url: `https://search.im-in.space/search?q=${encodeURIComponent(query)}`,
      referer: 'https://search.im-in.space/'
    },
    {
      name: 'ecosia',
      url: `https://www.ecosia.org/search?q=${encodeURIComponent(query)}`,
      referer: 'https://www.ecosia.org/'
    },
    {
      name: 'qwant',
      url: `https://www.qwant.com/?q=${encodeURIComponent(query)}`,
      referer: 'https://www.qwant.com/'
    },
    {
      name: 'searx-uk',
      url: `https://searx.work/search?q=${encodeURIComponent(query)}`,
      referer: 'https://searx.work/'
    },
    {
      name: 'yahooapi',
      url: `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`,
      referer: 'https://search.yahoo.com/'
    }
  ];

  let lastError: string | undefined;

  for (const engine of engines) {
    try {
      const { res, html } = await fetchSearchHtml(engine.url, engine.referer);
      const badDdg = engine.name === 'ddg-html' && isDdgError(html);
      if (res.status >= 400 || badDdg) {
        lastError = `${engine.name} returned status ${res.status}`;
        continue;
      }

      const rewritten = rewriteHtml(html, new URL(engine.url));
      return new NextResponse(rewritten, {
        status: res.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Search-Engine': engine.name
        }
      });
    } catch (err) {
      lastError = err instanceof Error ? err.message : 'unknown error';
      continue;
    }
  }

  return NextResponse.json({ error: 'All search providers failed', details: lastError }, { status: 502 });
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
