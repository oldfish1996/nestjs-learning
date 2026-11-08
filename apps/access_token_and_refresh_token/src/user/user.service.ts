import { Inject, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login.dto";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "./entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async login(loginDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginDto.username,
      },
    });
    if (!user) {
      throw new HttpException("user not found", HttpStatus.OK);
    }
    if (user.password !== loginDto.password) {
      throw new HttpException("password error", HttpStatus.OK);
    }
    return user;
  }

  async findUserById(userId: number) {
    return await this.entityManager.findOne(User, {
      where: {
        id: userId,
      },
    });
  }
}
