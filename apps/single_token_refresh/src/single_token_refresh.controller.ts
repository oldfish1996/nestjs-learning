import { Controller, Get, UseGuards } from "@nestjs/common";
import { SingleTokenRefreshService } from "./single_token_refresh.service";
import { LoginGuard } from "./login.guard";

@Controller()
export class SingleTokenRefreshController {
  constructor(
    private readonly singleTokenRefreshService: SingleTokenRefreshService,
  ) {}

  @Get()
  getHello(): string {
    return this.singleTokenRefreshService.getHello();
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
