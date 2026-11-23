import { Controller, Get, Inject, Query } from "@nestjs/common";
import { EmailService } from "./email.service";
import { RedisService } from "../redis/redis.service";

@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Get("code")
  async sendCodeEmail(@Query("address") address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${address}`, code, 60 * 5);

    await this.emailService.sendEmail({
      to: address,
      subject: "登录验证码",
      html: `<h1>您的登录验证码为：${code}</h1>`,
    });
    return "验证码已发送";
  }
}
