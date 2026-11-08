import { Controller, Get } from "@nestjs/common";
import { AccessTokenAndRefreshTokenService } from "./access_token_and_refresh_token.service";
import { LoginGuard } from "./login.guard";
import { UseGuards } from "@nestjs/common";

@Controller()
export class AccessTokenAndRefreshTokenController {
  constructor(
    private readonly accessTokenAndRefreshTokenService: AccessTokenAndRefreshTokenService,
  ) {}

  @Get()
  getHello(): string {
    return this.accessTokenAndRefreshTokenService.getHello();
  }

  @Get("aaa")
  aaa() {
    return "aaa";
  }

  @Get("bbb")
  @UseGuards(LoginGuard)
  bbb() {
    return "bbb";
  }
}
