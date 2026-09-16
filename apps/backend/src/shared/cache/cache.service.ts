// shared/cache/cache.service.ts

import { redisClient } from "../../config/redis";

export class CacheService {
  async get<T>(key: string): Promise<T | null> {
    const value = await redisClient.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  async set<T>(
    key: string,
    value: T,
    ttl?: number
  ): Promise<void> {
    const serializedValue = JSON.stringify(value);

    if (ttl) {
      await redisClient.set(key, serializedValue, {
        EX: ttl,
      });

      return;
    }

    await redisClient.set(key, serializedValue);
  }

  async delete(key: string): Promise<void> {
    await redisClient.del(key);
  }
}

export const cacheService = new CacheService();