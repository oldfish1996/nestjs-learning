import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleLoginService } from "./google-login.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller()
export class GoogleLoginController {
  constructor(private readonly googleLoginService: GoogleLoginService) {}

  @Get()
  getHello(): string {
    return this.googleLoginService.getHello();
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {}

  @Get("callback/google")
  @UseGuards(AuthGuard("google"))
  async callback(@Req() req: Request) {
    const user = await this.googleLoginService.findByGoogleEmail(
      (req.user as any).email,
    );
    if (!user) {
      const newUser = await this.googleLoginService.registerByGoogle(
        req.user as any,
      );
      return newUser;
    } else {
      return user;
    }
  }
}
