import { Controller, Post, Body, Get, Inject } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";
import { UserService } from "./user.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Post("login")
  async login(@Body() loginDto: LoginUserDto) {
    const { email, code } = loginDto;
    const codeInRedis = await this.redisService.get(`captcha_${email}`);
    if (!codeInRedis) {
      throw new Error("验证码失效");
    }
    if (codeInRedis !== code) {
      throw new Error("验证码错误");
    }
    const user = await this.userService.findUserByEmail(email);
    console.log(user);
    return "success";
  }
}
