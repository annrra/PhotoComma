/**
 * Post View Counter API
 *
 * This endpoint tracks page views for individual photo posts.
 *
 * How it works:
 * - Called from PostView client component on page load
 * - Increments a Redis counter per post slug
 * - Uses Upstash Redis (serverless) for persistent storage
 *
 * Key format:
 * post:{slug}:views
 *
 * Features:
 * - Ignores bot traffic (basic User-Agent filtering)
 * - Disabled in development mode (prevents local pollution)
 * - Lightweight and serverless-friendly
 *
 * Note:
 * This is NOT unique visitor tracking — every valid page load increments the counter.
 */

import { redis } from '@/src/lib/redis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json({ ok: true, skipped: "dev" });
  }

  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  // -----------------------------
  // BOT FILTER (Level 2)
  // -----------------------------
  const ua = (req.headers.get("user-agent") || "").toLowerCase();

  const blockedPatterns = [
    "bot",
    "crawler",
    "spider",
    "slurp",
    "facebookexternalhit",
    "ia_archiver",
    "headless",
    "puppeteer",
    "playwright",
    "lighthouse",
  ];

  const isBot = blockedPatterns.some((pattern) => ua.includes(pattern));

  if (isBot) {
    return NextResponse.json({ ok: true, skipped: "bot" });
  }

  // -----------------------------
  // INCREMENT VIEW
  // -----------------------------
  const key = `post:${slug}:views`;
  const views = await redis.incr(key);

  return NextResponse.json({ views });
}