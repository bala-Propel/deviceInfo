import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimitService {
  private requests = new Map<string, { count: number; expiresAt: number }>();
  private readonly LIMIT = 100; // Max requests per minute
  private readonly TTL = 60 * 1000; // Time window in milliseconds (1 minute)

  checkLimit(ip: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(ip);

    if (!entry || entry.expiresAt < now) {
      // Reset count if IP is new or TTL expired
      this.requests.set(ip, { count: 1, expiresAt: now + this.TTL });
      return true;
    }

    if (entry.count >= this.LIMIT) return false;

    // Increment request count
    entry.count += 1;
    return true;
  }
}
