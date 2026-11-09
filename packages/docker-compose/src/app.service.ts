import { Injectable, Inject } from "@nestjs/common";
import type { RedisClientType } from "redis";

@Injectable()
export class AppService {
  @Inject("REDIS_CLIENT")
  private redisClient: RedisClientType;

  async getHello(): Promise<string> {
    const keys = await this.redisClient.keys("*");
    console.log(keys);
    return "Hello World!";
  }
}
