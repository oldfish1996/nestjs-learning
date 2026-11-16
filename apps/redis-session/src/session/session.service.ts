import { Injectable, Inject } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class SessionService {
  @Inject(RedisService)
  private readonly redisService: RedisService;

  async setSession(
    sessionId: string,
    value: Record<string, any>,
    expire: number = 30 * 60,
  ) {
    if (!sessionId) {
      sessionId = this.generateSessionId();
    }
    await this.redisService.hashSet(`session_${sessionId}`, value, expire);
    return sessionId;
  }

  async getSession<SessionType extends Record<string, any>>(
    sessionId: string,
  ): Promise<SessionType>;
  async getSession(sessionId: string) {
    return await this.redisService.hashGet(`session_${sessionId}`);
  }

  generateSessionId() {
    return Math.random().toString().slice(2, 12);
  }
}
