import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException("用户名不存在");
    }
    if (user.password !== password) {
      throw new UnauthorizedException("密码错误");
    }
    const { password: pw, ...rest } = user;
    return rest;
  }
}
