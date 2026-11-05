import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginUserDto } from "./dto/login.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("init")
  initData() {
    return this.userService.initData();
  }

  @Post("login")
  async login(@Body() loginDto: LoginUserDto, @Session() session: any) {
    console.log(loginDto, session);
    const user = await this.userService.login(loginDto);

    session.user = user;

    return "login success";
  }
}
