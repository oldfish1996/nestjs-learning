import {
  Controller,
  Inject,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Post("login")
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // console.log(user);
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username,
        },
      });
      response.setHeader("token", token);
      return "登录成功";
    } else {
      return "登录失败";
    }
  }

  @Post("register")
  async register(@Body(ValidationPipe) user: RegisterDto) {
    // console.log(user);
    return await this.userService.register(user);
  }
}
