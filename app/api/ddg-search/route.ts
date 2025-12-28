import { NextRequest, NextResponse } from 'next/server';
import { DataStream } from 'scramjet';

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

    // Use scramjet DataStream to process the response
    const processed = await DataStream.fromArray([html])
      .map((content: string) => {
        // Inject meta tag to allow iframe embedding
        return content.replace(
          '<head>',
          '<head><meta name="referrer" content="no-referrer">'
        );
      })
      .toArray()
      .then((arr: string[]) => arr.join(''));

    return new NextResponse(processed, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'ALLOWALL',
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
