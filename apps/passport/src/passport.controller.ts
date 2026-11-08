import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Inject,
} from "@nestjs/common";
import { PassportService } from "./passport.service";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { IsPublic } from "./is-public.decorator";

@Controller()
export class PassportController {
  constructor(private readonly passportService: PassportService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Get()
  getHello(): string {
    return this.passportService.getHello();
  }

  @Post("login")
  @UseGuards(AuthGuard("local")) // 这里的`Strategy` 来自`passport-local` ，默认注册名就是`"local"`
  login(@Req() req: Request) {
    // 这里认证完成以后挂到user是默认行为
    console.log(req.user);
    const token = this.jwtService.sign(
      {
        userId: (req.user as any).userId,
        username: (req.user as any).username,
      },
      {
        expiresIn: "30m",
      },
    );
    return { token, user: req.user };
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("list")
  list(@Req() req: Request) {
    console.log(req.user);
    return [1, 2, 3, 4, 5];
  }

  @Get("aaa")
  @IsPublic()
  aaa() {
    return "aaa";
  }

  @Get("bbb")
  bbb() {
    return "bbb";
  }
}
