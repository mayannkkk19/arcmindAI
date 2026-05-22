import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Plan-aware generation rate limiters
export const generationRateLimits = {
  free: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
  }),

  pro: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1 h"),
    analytics: true,
  }),

  enterprise: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(200, "1 h"),
    analytics: true,
  }),
};

export const otpRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "60 s"), // 1 request per 60 seconds
  analytics: true,
});

export const loginRateLimitIP = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per IP per minute
  analytics: true,
});

export const loginRateLimitAccount = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "3600 s"), // 5 requests per account per hour
  analytics: true,
});
