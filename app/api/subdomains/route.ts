import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const SUBDOMAINS_FILE = join(process.cwd(), 'data', 'subdomains.json');

function ensureDataDir() {
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    // In Vercel, we'll use in-memory storage
    return null;
  }
}

function getSubdomainData() {
  try {
    if (existsSync(SUBDOMAINS_FILE)) {
      const data = readFileSync(SUBDOMAINS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading subdomains:', error);
  }
  return {};
}

function saveSubdomainData(data: any) {
  try {
    ensureDataDir();
    writeFileSync(SUBDOMAINS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving subdomains:', error);
  }
}

// Simple in-memory storage for Vercel
let subdomainCache: Record<string, any> = {};

export async function GET(request: NextRequest) {
  try {
    const subdomain = request.headers.get('x-subdomain');

    if (!subdomain) {
      return NextResponse.json(
        { error: 'No subdomain detected' },
        { status: 400 }
      );
    }

    // Get subdomain info
    const data = subdomainCache;
    const subdomainInfo = data[subdomain];

    if (!subdomainInfo) {
      return NextResponse.json(
        { subdomain, created: false, available: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { subdomain, ...subdomainInfo, created: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subdomain info' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const subdomain = request.headers.get('x-subdomain');
    const body = await request.json();
    const { username, publicKey } = body;

    if (!subdomain) {
      return NextResponse.json(
        { error: 'No subdomain detected' },
        { status: 400 }
      );
    }

    if (!username || username.trim().length === 0) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Check if subdomain already taken
    if (subdomainCache[subdomain]) {
      return NextResponse.json(
        { error: 'Subdomain already taken' },
        { status: 409 }
      );
    }

    // Create subdomain entry
    const timestamp = new Date().toISOString();
    subdomainCache[subdomain] = {
      username,
      publicKey: publicKey || null,
      createdAt: timestamp,
      settings: {
        searchEngine: 'duckduckgo',
        theme: 'dark',
      },
    };

    return NextResponse.json(
      {
        subdomain,
        username,
        message: 'Subdomain created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create subdomain' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const subdomain = request.headers.get('x-subdomain');
    const body = await request.json();
    const { publicKey } = body;

    if (!subdomain) {
      return NextResponse.json(
        { error: 'No subdomain detected' },
        { status: 400 }
      );
    }

    const subdomainInfo = subdomainCache[subdomain];

    if (!subdomainInfo) {
      return NextResponse.json(
        { error: 'Subdomain not found' },
        { status: 404 }
      );
    }

    // Verify ownership (simple key-based verification)
    if (publicKey && subdomainInfo.publicKey !== publicKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    delete subdomainCache[subdomain];

    return NextResponse.json(
      { message: 'Subdomain deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete subdomain' },
      { status: 500 }
    );
  }
}
