import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (!API_URL) {
    return NextResponse.json(
      { ok: false, error: 'API_URL not defined' },
      { status: 500 }
    );
  }

  try {
    await fetch(`${API_URL}/wp-json/wp/v2/posts?per_page=1`, {
      cache: 'no-store',
    });

    return NextResponse.json({
      ok: true,
      warmed: true,
      time: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[warmup] failed', err);

    return NextResponse.json(
      { ok: false, error: 'fetch failed' },
      { status: 500 }
    );
  }
}