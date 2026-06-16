/**
 * Upstash Redis client instance
 *
 * Used for lightweight serverless data storage (analytics counters).
 * Shared across API routes.
 */
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});