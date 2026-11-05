import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Get("init")
  initData() {
    return this.userService.initData();
  }

  @Post("login")
  async login(@Body() loginDto: UserLoginDto) {
    const user = await this.userService.login(loginDto);
    const token = this.jwtService.sign({
      user: {
        username: user.username,
        roles: user.roles,
      },
    });
    // console.log(token);
    return { token };
  }
}
