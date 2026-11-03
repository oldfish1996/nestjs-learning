import {
  Body,
  Inject,
  Injectable,
  Logger,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import crypto from "crypto";

function md5(password: string) {
  return crypto.createHash("md5").update(password).digest("hex");
}

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async register(user: RegisterDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (foundUser) {
      this.logger.error("用户名已存在");
      throw new HttpException("用户名已存在", 200);
    }
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return "注册成功";
    } catch (error) {
      this.logger.error(error, UserService);
      return "注册失败";
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (!foundUser) {
      this.logger.error("用户名不存在");
      throw new HttpException("用户名不存在", 400);
    }
    if (foundUser.password !== md5(user.password)) {
      this.logger.error("密码错误");
      throw new HttpException("密码错误", 400);
    }
    return foundUser;
  }
}
