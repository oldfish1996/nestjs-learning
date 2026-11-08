import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Post("login")
  async login(@Body() loginDto: UserLoginDto) {
    if (loginDto.username !== "chenys" || loginDto.password !== "123456") {
      throw new UnauthorizedException("username or password is wrong");
    }

    const jwt = this.jwtService.sign(
      {
        username: loginDto.username,
      },
      {
        secret: "chenys",
        expiresIn: "7d",
      },
    );
    return jwt;
  }
}
