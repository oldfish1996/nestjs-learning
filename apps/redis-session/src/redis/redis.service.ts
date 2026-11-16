import { Injectable, Inject } from "@nestjs/common";
import { RedisClientType } from "redis";

@Injectable()
export class RedisService {
  @Inject("REDIS_CLIENT")
  private readonly redisClient: RedisClientType;

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  async hashSet(key: string, obj: Record<string, any>, expire?: number) {
    for (let name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }
    if (expire) {
      await this.redisClient.expire(key, expire);
    }
  }
}
