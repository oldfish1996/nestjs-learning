import { Controller, Get, UseGuards } from "@nestjs/common";
import { LoginGuard } from "./login/login.guard";
import { RegisterLoginService } from "./register-login.service";

@Controller()
export class RegisterLoginController {
  constructor(private readonly registerLoginService: RegisterLoginService) {}

  @Get()
  getHello(): string {
    return this.registerLoginService.getHello();
  }

  // 测试登录
  @Get("aaa")
  @UseGuards(LoginGuard)
  aaa() {
    return "aaa";
  }
}
