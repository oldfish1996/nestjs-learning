import { Controller, Get, Req, Res } from "@nestjs/common";
import { RedisSessionService } from "./redis-session.service";
import { SessionService } from "./session/session.service";
import { Request, Response } from "express";

@Controller()
export class RedisSessionController {
  constructor(
    private readonly redisSessionService: RedisSessionService,
    private readonly sessionService: SessionService,
  ) {}

  @Get()
  getHello(): string {
    return this.redisSessionService.getHello();
  }

  @Get("count")
  async getCount(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const sid = req.cookies?.sessionId;
    const session = await this.sessionService.getSession<{ count: string }>(
      sid,
    );

    const curCount = session.count ? parseInt(session.count) + 1 : 1;
    const curSid = await this.sessionService.setSession(sid, {
      count: curCount,
    });

    res.cookie("sessionId", curSid, { maxAge: 30 * 60 * 1000 });
    return curCount;
  }
}
