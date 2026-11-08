import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { GithubLoginService } from "./github-login.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller()
export class GithubLoginController {
  constructor(private readonly githubLoginService: GithubLoginService) {}

  @Get()
  getHello(): string {
    return this.githubLoginService.getHello();
  }

  @Get("/login")
  @UseGuards(AuthGuard("github"))
  login() {}

  @Get("callback")
  @UseGuards(AuthGuard("github"))
  callback(@Req() req: Request) {
    const user = this.githubLoginService.fundUserByGithubId(
      (req.user as any).id,
    );
    if (!user) {
      this.githubLoginService.createUser(req.user);
    }
    return req.user;
  }
}
