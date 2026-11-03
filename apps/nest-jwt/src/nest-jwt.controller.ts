import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  Headers,
  UnauthorizedException,
} from "@nestjs/common";
import { NestJwtService } from "./nest-jwt.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Controller()
export class NestJwtController {
  constructor(private readonly nestJwtService: NestJwtService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  getHello(): string {
    return this.nestJwtService.getHello();
  }

  // session + cookie 下面请求会返回一个cookie是connect.sid
  @Get("sss")
  sss(@Session() session: any) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  // 因为注入 response 对象之后，默认不会把返回值作为 body 了，需要设置 passthrough 为 true 才可以。
  @Get("ttt")
  ttt(
    @Headers("authorization") authorization: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (authorization) {
      try {
        // 因为标准的`Authorization` 请求头格式是 “认证方案 + 空格 + 凭证”
        // Authorization: Bearer eyJhbGciOiJIU...
        const token = authorization.split(" ")[1];
        const payload = this.jwtService.verify(token);

        const newToken = this.jwtService.sign({
          count: payload.count + 1,
        });
        response.setHeader("token", newToken);
        return payload.count + 1;
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException("token is invalid");
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1,
      });
      response.setHeader("token", newToken);
      return 1;
    }
  }
}
