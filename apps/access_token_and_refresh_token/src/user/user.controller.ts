import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Post("login")
  async login(@Body() loginDto: LoginUserDto) {
    console.log(loginDto);
    const user = await this.userService.login(loginDto);
    const access_token = this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
      },
      {
        expiresIn: "30m",
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: "7d",
      },
    );
    return { access_token, refresh_token };
  }

  @Get("refresh")
  async refresh(@Query("refresh_token") refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId);

      if (!user) {
        throw new UnauthorizedException("user not found");
      }

      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: "30m",
        },
      );
      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: "7d",
        },
      );
      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException("token 失效, 重新登录");
    }
  }
}
