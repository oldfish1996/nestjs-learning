import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post("login")
  login(@Body() loginDto: LoginUserDto) {
    return this.userService.login(loginDto);
  }
}
