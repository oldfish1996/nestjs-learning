import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { DbService } from "../db/db.service";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();
    // 检查用户名是否存在
    const existingUser = users.find(
      (user) => user.username === registerUserDto.username,
    );
    if (existingUser) {
      throw new BadRequestException("用户名已存在");
    }

    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);
    await this.dbService.write(users);
    return user;
  }

  async login(loginDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const user = users.find(
      (user) => user.username === loginDto.username,
    );
    if (!user) {
      throw new BadRequestException("用户名不存在");
    }

    if (user.password !== loginDto.password) {
      throw new BadRequestException("密码错误");
    }

    return user;
  }
}
