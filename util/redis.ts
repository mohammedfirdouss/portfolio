import { Redis } from "@upstash/redis";

// Skip Redis initialization during build time to avoid Bun fetch issues
// During static generation, we don't need Redis - views will be 0 initially
const isBuildTime = 
  process.env.NEXT_PHASE === "phase-production-build" ||
  (typeof process !== "undefined" && process.env.NODE_ENV === "production" && !process.env.VERCEL && !process.env.NEXT_RUNTIME);

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  // Only initialize Redis if we have the required env vars and we're not in build phase
  if (isBuildTime) {
    return null;
  }

  if (!redis) {
    try {
      const url = process.env.UPSTASH_REDIS_REST_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN;
      
      if (url && token) {
        redis = new Redis({
          url,
          token,
        });
      }
    } catch (e) {
      console.warn("Failed to initialize Redis:", e);
      return null;
    }
  }

  return redis;
}
